import { mat4, vec2, vec3 } from "gl-matrix";

class Transform {
    private _position: vec2;
    private _scale: vec2;
    private _rotationInRadians: GLfloat;

    constructor() {
        this._position = vec2.fromValues(0, 0);
        this._scale = vec2.fromValues(1,1);
        this._rotationInRadians = 0.0;
    }

    getXPos = (): GLfloat => this._position[0];
    setXPos = (xPos: GLfloat): void => { this._position[0] = xPos; }
    incXPosBy(delta: GLfloat): void { this._position[0] += delta } 
    getYPos = () => this._position[1];
    setYPos = (yPos: GLfloat): void => { this._position[1] = yPos; }
    incYPosBy(delta: GLfloat): void { this._position[1] += delta; }
    getPosition = (): vec2 => this._position;
    setPosition(xPos: GLfloat, yPos: GLfloat) {
        this.setXPos(xPos);
        this.setYPos(yPos);
    }

    getSize(): vec2 {
        return this._scale;
    }
    setSize(width: GLfloat, height: GLfloat): void {
        this.setWidth(width);
        this.setHeight(height);
    }
    incSizeBy(delta:GLfloat): void {
        this.incWidthBy(delta);
        this.incHeightBy(delta);
    }
    getWidth = () => this._scale[0];
    setWidth(width: GLfloat) {
        this._scale[0] = width;
    }
    incWidthBy(delta: GLfloat) {
        this._scale[0] += delta;
    }
    getHeight = () => this._scale[1];
    setHeight(height: GLfloat) {
        this._scale[1] = height;
    }
    incHeightBy(delta: GLfloat) {
        this._scale[1] += delta;
    }

    getRotationInRad()  { return this._rotationInRadians; }
    setRotationInRad(rotationInRadians: GLfloat) {
        this._rotationInRadians = rotationInRadians;
        while (this._rotationInRadians > (2 * Math.PI)) {
            this._rotationInRadians -= (2 * Math.PI);
        }
    }
    incRotationInRad(deltaRad: GLfloat) {
        this.setRotationInRad(this._rotationInRadians + deltaRad);
    }
    getRotationInDeg() { return this._rotationInRadians * 180.0 / Math.PI; }
    setRotationInDeg(rotationInDegrees: GLfloat) {
        this.setRotationInRad(rotationInDegrees * Math.PI / 180.0);
    }
    incRotationInDeg(deltaDeg: GLfloat) {
        this.incRotationInRad(deltaDeg * Math.PI / 180.0);
    }

    getTrsMatrix(): mat4 {
        const matrix = mat4.create();

        mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
        mat4.rotateZ(matrix, matrix, this.getRotationInRad());
        mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

        return matrix;
    }
}

export default Transform;