import RgbaColor from "../rgba_color";
import Renderable from "./renderable";
import * as texture from "../resources/texture";
import * as shaderResources from "../core/shader_resources"
import Camera from "../camera";

class TextureRenderable extends Renderable {
    private _texture: string;

    constructor(myTexture: string) {
        super();
        super.setColor(new RgbaColor(1, 1, 1, 0));
        super._setShader(shaderResources.getTextureShader());
        this._texture = myTexture;
    }

    override draw(camera: Camera): void {
        texture.activate(this._texture);
        super.draw(camera);
    }

    getTexture() { return this._texture; }
    setTexture(newTexture: string) {
        this._texture = newTexture;
    }
}

export default TextureRenderable;