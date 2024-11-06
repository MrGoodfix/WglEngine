class Viewport extends Float32Array {
    constructor(x: GLint, y: GLint, width: GLsizei, height: GLsizei) {
        super(4);
        this[0] = x;
        this[1] = y;
        this[2] = width;
        this[3] = height;
    }

    get x(): GLint {
        return <GLint>this[0];
    }

    get y(): GLint {
        return <GLint>this[1];
    }

    get width(): GLsizei {
        return <GLsizei>this[2];
    }

    get height(): GLsizei {
        return <GLsizei>this[3];
    }
}

export default Viewport;