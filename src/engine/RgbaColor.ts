class RgbaColor {
    private mRed: GLfloat;
    private mGreen: GLfloat;
    private mBlue: GLfloat;
    private mAlpha: GLfloat;

    constructor(red: GLfloat, green: GLfloat, blue: GLfloat, alpha: GLfloat) {
        this.mRed = red;
        this.mGreen = green;
        this.mBlue = blue;
        this.mAlpha = alpha;
    }

    getRed():GLfloat{
        return this.mRed;
    }

    getGreen():GLfloat{
        return this.mGreen;
    }

    getBlue():GLfloat{
        return this.mBlue;
    }

    getAlpha():GLfloat{
        return this.mAlpha;
    }

    asIterable():Iterable<GLfloat> {
        return [this.mRed, this.mGreen, this.mBlue, this.mAlpha];
    }
}

export default RgbaColor;