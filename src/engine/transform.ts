import { mat4, vec2, vec3 } from "gl-matrix";

class Transform {
    private mPosition: vec2;
    private mScale: vec2;
    private mRotationInRad: GLfloat;

    constructor() {
        this.mPosition = vec2.fromValues(0, 0);
        this.mScale = vec2.fromValues(1,1);
        this.mRotationInRad = 0.0;
    }

    getXPos = (): GLfloat => this.mPosition[0];
    setXPos = (xPos: GLfloat): void => { this.mPosition[0] = xPos; }
    incXPosBy(delta: GLfloat): void { this.mPosition[0] += delta } 
    getYPos = () => this.mPosition[1];
    setYPos = (yPos: GLfloat): void => { this.mPosition[1] = yPos; }
    incYPosBy(delta: GLfloat): void { this.mPosition[1] += delta; }
    getPosition = (): vec2 => this.mPosition;
    setPosition(xPos: GLfloat, yPos: GLfloat) {
        this.setXPos(xPos);
        this.setYPos(yPos);
    }

    getSize(): vec2 {
        return this.mScale;
    }
    setSize(width: GLfloat, height: GLfloat): void {
        this.setWidth(width);
        this.setHeight(height);
    }
    getWidth = () => this.mScale[0];
    setWidth(width: GLfloat) {
        this.mScale[0] = width;
    }
    incWidthBy(delta: GLfloat) {
        this.mScale[0] += delta;
    }
    getHeight = () => this.mScale[1];
    setHeight(height: GLfloat) {
        this.mScale[1] = height;
    }
    incHeightBy(delta: GLfloat) {
        this.mScale[1] += delta;
    }

    getRotationInRad()  { return this.mRotationInRad; }
    setRotationInRad(rotationInRadians: GLfloat) {
        this.mRotationInRad = rotationInRadians;
        while (this.mRotationInRad > (2 * Math.PI)) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }
    incRotationInRad(deltaRad: GLfloat) {
        this.setRotationInRad(this.mRotationInRad + deltaRad);
    }
    getRotationInDeg() { return this.mRotationInRad * 180.0 / Math.PI; }
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