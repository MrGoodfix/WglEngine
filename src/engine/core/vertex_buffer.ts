import * as glSys from "./gl";

let mGLVertexBuffer: WebGLBuffer|null;

function get(): WebGLBuffer|null { return mGLVertexBuffer; }

const mVerticesOfSquare: number[] = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

let mGLTextureCoordBuffer: WebGLBuffer|null;

function getTexCoord(): WebGLBuffer|null { return mGLTextureCoordBuffer; }

const mTextureCoordinates: number[] = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
];

function init(): void {
    const gl = glSys.get();

    if (gl != null) {
        mGLVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);

        mGLTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mTextureCoordinates), gl.STATIC_DRAW);
    }
}

function cleanUp() {
    if (mGLVertexBuffer !== null) {
        glSys.get().deleteBuffer(mGLVertexBuffer);
        mGLVertexBuffer = null;
    }

    if (mGLTextureCoordBuffer !== null) {
        glSys.get().deleteBuffer(mGLTextureCoordBuffer);
        mGLTextureCoordBuffer = null;
    }
}

export {init, get, cleanUp, getTexCoord}