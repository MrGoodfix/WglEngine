import * as loop from "./core/loop";
import engine from "./index";
import { SceneInterface } from "./scene.interface";

const abstractClassError = new Error("Abstract Class");

abstract class Scene implements SceneInterface {
    constructor() {
        if (this.constructor === Scene) {
            throw abstractClassError;
        }
    }

    async start(): Promise<void> {
        await loop.start(this);
    }

    next(): void {
        loop.stop();
        this.unload();
    }

    stop(): void {
        loop.stop();
        this.unload();
        engine.cleanUp();
    }

    abstract init(): void;

    abstract load(): void;

    abstract unload(): void;

    abstract draw(): void;

    abstract update(): void;
}

export default Scene;