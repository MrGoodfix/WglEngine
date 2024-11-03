import * as glSys from "./core/gl"
import * as shaderResources from "./core/shader_resources"
import RgbaColor from "./rgba_color";
import SimpleShader from "./simple_shader";
import Transform from "./transform";

class Renderable {
    private mShader: SimpleShader;
    private mColor: RgbaColor
    private mXform: Transform;

    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = new RgbaColor(1,1,1,1);
        this.mXform = new Transform();
    }

    draw(cameraMatrix: Iterable<GLfloat>):void {
        const gl = glSys.get();
        this.mShader.activate(this.mColor, this.mXform.getTrsMatrix(), cameraMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    getXform(): Transform {
        return this.mXform;
    }

    getColor():RgbaColor { return this.mColor; }
    setColor(color:RgbaColor):void { this.mColor = color;}
}

export default Renderable;