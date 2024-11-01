import * as glSys from "./core/gl"
import * as shaderResources from "./core/shader_resources"
import RgbaColor from "./RgbaColor";
import SimpleShader from "./simple_shader";

class Renderable {
    private mShader: SimpleShader;
    private mColor: RgbaColor

    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = new RgbaColor(1,1,1,1);
    }

    draw():void {
        let gl = glSys.get();
        this.mShader.activate(this.mColor.asIterable());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    getColor():RgbaColor { return this.mColor; }
    setColor(color:RgbaColor):void { this.mColor = color;}
}

export default Renderable;