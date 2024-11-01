import * as glSys from "./gl";

let mGLVertexBuffer: WebGLBuffer|null;

function get(): WebGLBuffer|null { return mGLVertexBuffer; }

let mVerticesOfSquare: number[] = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

function init(): void {
    let gl = glSys.get();

    if (gl != null) {
        mGLVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
    }
}

export {init, get}