class RgbaColor extends Float32Array {
    constructor(red: GLfloat, green: GLfloat, blue: GLfloat, alpha: GLfloat) {
        super(4);
        this[0] = red;
        this[1] = green;
        this[2] = blue;
        this[3] = alpha;
    }

    getRed():GLfloat{
        return <GLfloat>this[0];
    }

    getGreen():GLfloat{
        return <GLfloat>this[1];
    }

    getBlue():GLfloat{
        return <GLfloat>this[2];
    }

    getAlpha():GLfloat{
        return <GLfloat>this[3];
    }
}

export default RgbaColor;