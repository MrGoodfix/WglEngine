import * as glSys from "./core/gl"
import { mat4, vec2, vec3 } from "gl-matrix";
import RgbaColor from "./rgba_color";
import Viewport from "./viewport";

const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
})

class Camera {
    private _cameraMatrix: mat4 ;
    private _bgColor: RgbaColor;

    constructor(public wcCenter: vec2, 
                public wcWidth: GLfloat, 
                public viewport: Viewport) {
        this._cameraMatrix = mat4.create();
        this._bgColor = RgbaColor.LightGray();
    }

    get wcHeight() {
        const ratio = <GLfloat>this.viewport[eViewport.eHeight] /
                      <GLfloat>this.viewport[eViewport.eWidth];
        return this.wcWidth * ratio;
    }

    get backgroundColor() { return this._bgColor; }
    set backgroundColor(color: RgbaColor) {
        this._bgColor = color;
    }

    getCameraMatrix = () => this._cameraMatrix;

    setViewAndCameraMatrix(): void {
        const gl = glSys.get();
        // step A: configure the viewport
        gl.viewport(
            this.viewport.x,
            this.viewport.y,
            this.viewport.width,
            this.viewport.height
        );

        gl.scissor(
            this.viewport.x,
            this.viewport.y,
            this.viewport.width,
            this.viewport.height
        );

        gl.clearColor(
            this._bgColor.red,
            this._bgColor.green,
            this._bgColor.blue,
            this._bgColor.alpha
        );

        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        // step B: configure the camera matrix
        mat4.scale(
            this._cameraMatrix,
            mat4.create(),
            vec3.fromValues(2.0 /  this.wcWidth, 2.0 / this.wcHeight, 1.0)
        );

        mat4.translate(
            this._cameraMatrix,
            this._cameraMatrix,
            vec3.fromValues(-this.wcCenter[0], -this.wcCenter[1], 0)
        );
    }
}

export default Camera;
