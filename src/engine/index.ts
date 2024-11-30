import * as glSys from "./core/gl";
import * as input from "./input";
import * as loop from "./core/loop";
import * as shaderResources from "./core/shader_resources";
import * as vertexBuffer from "./core/vertex_buffer";
import * as text from "./resources/text";
import * as xml from "./resources/xml";
import Camera from "./camera";
import RgbaColor from "./rgba_color";
import Renderable from "./renderable";
import Scene from "./scene";
import Transform from "./transform";
import Viewport from "./viewport";

function init(htmlCanvasID:string) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
    input.init();
}

function clearCanvas(color: RgbaColor) {
    const gl = glSys.get();
    gl.clearColor(
        color.red,
        color.green,
        color.blue,
        color.alpha
    );
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function cleanUp() {
    loop.cleanUp();
    input.cleanUp();
    shaderResources.cleanUp();
    vertexBuffer.cleanUp();
    glSys.cleanUp();
}

export default {
    input,
    text,
    xml,

    Camera,
    Renderable,
    RgbaColor,
    Scene,
    Transform,
    Viewport,

    init,
    cleanUp,
    clearCanvas
}