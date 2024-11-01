import SimpleShader from "../simple_shader";

const kSimpleVS: string = "dist/glsl_shaders/simple_vs.glsl";
const kSimpleFS: string = "dist/glsl_shaders/simple_fs.glsl";
let mConstColorShader: SimpleShader;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
    createShaders();
}

function getConstColorShader() : SimpleShader {
    return mConstColorShader;
}

export {init, getConstColorShader}