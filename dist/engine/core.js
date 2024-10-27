import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";
let mGL;
function getGL() {
    if (mGL == null) {
        throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
    }
    return mGL;
}
let mShader;
function createShader() {
    mShader = new SimpleShader("dist/glsl_shaders/simple_vs.glsl", "dist/glsl_shaders/white_fs.glsl");
}
// initialize the WebGL
function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    if (canvas == null) {
        throw new Error("There is no canvas.");
    }
    mGL = canvas.getContext("webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}
function init(htmlCanvasID) {
    initWebGL(htmlCanvasID);
    vertexBuffer.init();
    createShader();
}
function clearCanvas(color) {
    mGL?.clearColor(color.Red, color.Green, color.Blue, color.Alpha);
    mGL?.clear(mGL.COLOR_BUFFER_BIT);
}
function drawSquare() {
    mShader.activate();
    // tribal knowledge... this is tightly coupled to vertex_buffer...
    // knowing that our square's vertices are in positions 0 - 3 in the array.
    mGL?.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}
export { getGL, init, clearCanvas, drawSquare };
