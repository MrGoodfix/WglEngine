import Camera from "../camera";
import * as glSys from "../core/gl"
import * as shaderResources from "../core/shader_resources"
import RgbaColor from "../rgba_color";
import SimpleShader from "../shaders/simple_shader";
import Transform from "../transform";

class Renderable {
    private _shader: SimpleShader;
    private _color: RgbaColor
    private _xform: Transform;

    constructor() {
        this._shader = shaderResources.getConstColorShader();
        this._color = new RgbaColor(1,1,1,1);
        this._xform = new Transform();
    }

    _setShader(s: SimpleShader) { this._shader = s; }

    draw(camera: Camera):void {
        const gl = glSys.get();
        this._shader.activate(this._color, this._xform.getTrsMatrix(), camera.getCameraMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    getXform(): Transform {
        return this._xform;
    }

    getColor():RgbaColor { return this._color; }
    setColor(color:RgbaColor):void { this._color = color;}

    displayText(): string {
        return `Square: color ${this._color}, transform [x: ${this._xform.getXPos()}, y: ${this._xform.getYPos()}, size: ${this._xform.getSize()}, rotation: ${this._xform.getRotationInDeg()}]`;
    }
}

export default Renderable;