import * as glSys from "../core/gl"
import * as map from "../core/resource_map"

const has = map.has;
const get = map.get;

class TextureInfo {
    constructor(public Width: GLfloat, public Height: GLfloat, public Texture: WebGLTexture) { }
}

function processLoadedImage(path: string, image: HTMLImageElement) {
    const gl = glSys.get();

    const texture: WebGLTexture = gl.createTexture();
    

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
        gl.TEXTURE_2D,      // binding point
        0,                  // level of detail
        gl.RGBA,            // internal format
        gl.RGBA,            // format of texel
        gl.UNSIGNED_BYTE,   // datatype of texel
        image               // texture data
    );

    gl.generateMipmap(gl.TEXTURE_2D);

    const texInfo = new TextureInfo(image.naturalWidth, image.naturalHeight, texture);
    map.set(path, texInfo);
}

function load(textureName: string): Promise<void>|null {
    if (map.has(textureName)) {
        map.incRef(textureName);
    } else {
        map.loadRequested(textureName);
        const image = new Image();
        const texturePromise = new Promise<Event>(
            function(resolve) {
                image.onload = resolve;
                image.src = textureName;
            }).then(
                function resolve() {
                    processLoadedImage(textureName, image);
                }
            );
        map.pushPromise(texturePromise);
    }
    return null;
}

function unload(textureName:string) {
    const texInfo: TextureInfo = <TextureInfo>get(textureName);
    if (map.unload(textureName)) {
        const gl = glSys.get();
        gl.deleteTexture(texInfo.Texture);
    }
}

function activate(textureName: string) {
    const gl = glSys.get();
    const texInfo: TextureInfo = <TextureInfo>get(textureName);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texInfo.Texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // For pixel-graphics where you want the texture to look "sharp" do the following:
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

function deactivate() {
    const gl = glSys.get();
    gl.bindTexture(gl.TEXTURE_2D, null);
}

export { 
    has, get, load, unload,

    TextureInfo,

    activate, deactivate
}