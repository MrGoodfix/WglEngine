import * as glSys from "./core/gl"
import * as vertexBuffer from "./core/vertex_buffer"
import * as shaderResources from "./core/shader_resources"
import RgbaColor from "./RgbaColor";
import Renderable from "./Renderable";

function init(htmlCanvasID:string) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
}

function clearCanvas(color: RgbaColor) {
    const gl = glSys.get();
    gl.clearColor(
        color.getRed(),
        color.getGreen(),
        color.getBlue(),
        color.getAlpha()
    );
    gl.clear(gl.COLOR_BUFFER_BIT);
}

export default {
    Renderable,
    RgbaColor,
    init, clearCanvas
}