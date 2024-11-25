import * as text from "../resources/text";
import * as map from "./resource_map";
import SimpleShader from "../simple_shader";

const kSimpleVS: string = "dist/glsl_shaders/simple_vs.glsl";
const kSimpleFS: string = "dist/glsl_shaders/simple_fs.glsl";
let mConstColorShader: SimpleShader;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
    const loadPromise = 
            Promise.all([
                console.log("Adding shader load promises"),
                text.load(kSimpleFS),
                text.load(kSimpleVS)
            ]).then(
            function resolve() { 
                console.log("Working on creating shaders.");
                createShaders(); 
            }
        );
    map.pushPromise(loadPromise);
    console.log("Sent fragment shader and vertex shader promises to resource map.");
}

function getConstColorShader() : SimpleShader {
    console.log("Getting the constant color shader.");
    return mConstColorShader;
}

export {init, getConstColorShader}