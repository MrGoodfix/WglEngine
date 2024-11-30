import * as glSys from "./gl";

let mGLVertexBuffer: WebGLBuffer|null;

function get(): WebGLBuffer|null { return mGLVertexBuffer; }

const mVerticesOfSquare: number[] = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

function init(): void {
    const gl = glSys.get();

    if (gl != null) {
        mGLVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
    }
}

function cleanUp() {
    if (mGLVertexBuffer !== null) {
        glSys.get().deleteBuffer(mGLVertexBuffer);
        mGLVertexBuffer = null;
    }
}

export {init, get, cleanUp}