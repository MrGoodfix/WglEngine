import * as text from "../resources/text";
import * as map from "./resource_map";
import SimpleShader from "../shaders/simple_shader";
import TextureShader from "../shaders/texture_shader";

const kSimpleVS: string = "dist/glsl_shaders/simple_vs.glsl";
const kSimpleFS: string = "dist/glsl_shaders/simple_fs.glsl";
let mConstColorShader: SimpleShader;

const kTextureVS: string = "dist/glsl_shaders/texture_vs.glsl";
const kTextureFS: string = "dist/glsl_shaders/texture_fs.glsl";
let mTextureShader: TextureShader;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
}

function init() {
    const loadPromise = 
            Promise.all([
                console.log("Adding shader load promises"),
                text.load(kSimpleFS),
                text.load(kSimpleVS),
                text.load(kTextureFS),
                text.load(kTextureVS)
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
    return mConstColorShader;
}

function getTextureShader() : TextureShader {
    return mTextureShader;
}

function cleanUp() {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    text.unload(kSimpleVS);
    text.unload(kSimpleFS);
    text.unload(kTextureVS);
    text.unload(kTextureFS);
}

export {init, cleanUp, getConstColorShader, getTextureShader}