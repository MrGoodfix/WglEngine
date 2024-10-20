export interface RgbaColor {
    Red: GLclampf,
    Green: GLclampf,
    Blue: GLclampf,
    Alpha: GLclampf
}

import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

let mGL: WebGL2RenderingContext|null;
function getGL(): WebGL2RenderingContext 
{ 
    if (mGL == null) {
        throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
    }
    return mGL; 
}

let mShader: SimpleShader;
function createShader() {
    mShader = new SimpleShader("VertexShader","FragmentShader");
}

// initialize the WebGL
function initWebGL(htmlCanvasID: string) {
    let canvas: HTMLCanvasElement|null = document.getElementById(htmlCanvasID) as HTMLCanvasElement;

    if (canvas == null) {
        throw new Error("There is no canvas.");
    }

    mGL = canvas.getContext("webgl2") as WebGL2RenderingContext;

    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}

function init(htmlCanvasID: string) {
    initWebGL(htmlCanvasID);
    vertexBuffer.init();
    createShader();
}

function clearCanvas(color: RgbaColor): void {
    mGL?.clearColor(color.Red, color.Green, color.Blue, color.Alpha);
    mGL?.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
    mShader.activate();
    mGL?.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

export { getGL, init, clearCanvas, drawSquare}