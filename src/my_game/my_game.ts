import engine from "../engine/index";
import RgbaColor from "../engine/rgba_color";
import Renderable from "../engine/renderables/renderable.js";
import Camera from "../engine/camera";
import BlueLevel from "./blue_level.js";
import { vec2 } from "gl-matrix";
import Viewport from "../engine/viewport.js";

class MyGame extends engine.Scene {
    private _portalPath: string;
    private _collectorPath: string;
    private _camera: Camera|null;
    private _hero: Renderable|null;
    private _portal: Renderable|null;
    private _collector: Renderable|null;

    constructor() {
        super();

        // textures
        this._portalPath = "assets/minion_portal.png";
        this._collectorPath = "assets/minion_collector.png";

        this._camera = null;
        this._hero = null;
        this._portal = null;
        this._collector = null;
    }

    init(): void {
        // Step A: set up the cameras
        this._camera = new engine.Camera(
            vec2.fromValues(20, 60),   // position of the camera
            20,                        // width of camera
            new Viewport(20, 40, 600, 300)         // viewport (orgX, orgY, width, height)
        );
        this._camera.backgroundColor = new RgbaColor(0.8, 0.8, 0.8, 1);

        // Step B: Create the game objects
        this._portal = new engine.TextureRenderable(this._portalPath);
        this._portal.setColor(new RgbaColor(1, 0, 0, 0.2));
        this._portal.getXform().setPosition(25, 60);
        this._portal.getXform().setSize(3, 3);

        this._collector = new engine.TextureRenderable(this._collectorPath);
        this._collector.setColor(new RgbaColor(0, 0, 0, 0));
        this._collector.getXform().setPosition(15, 60);
        this._collector.getXform().setSize(3, 3);

        this._hero = new engine.Renderable();
        this._hero.setColor(new RgbaColor(0, 0, 1, 1));
        this._hero.getXform().setPosition(20, 60);
        this._hero.getXform().setSize(2, 3);
    }

    draw(): void {
        const whitish: RgbaColor = new engine.RgbaColor(0.9, 0.9, 0.9, 1);
        engine.clearCanvas(whitish);
        
        if (this._camera)
        {
            // Step  B: Activate the drawing Camera
            this._camera.setViewAndCameraMatrix();

            // Step  C: draw everything
            this._portal?.draw(this._camera);
            this._hero?.draw(this._camera);
            this._collector?.draw(this._camera);
        }
    }

    update(): void {
                // let's only allow the movement of hero, 
        // and if hero moves too far off, this level ends, we will
        // load the next level
        const deltaX = 0.05;
        if (this._hero) {
            const xform = this._hero.getXform(); 

            // Support hero movements
            if (engine.input.isKeyPressed(engine.input.keys.Right)) {
                xform.incXPosBy(deltaX);
                if (xform.getXPos() > 30) { // this is the right-bound of the window
                    xform.setPosition(12, 60);
                }
            }

            if (engine.input.isKeyPressed(engine.input.keys.Left)) {
                xform.incXPosBy(-deltaX);
                if (xform.getXPos() < 11) {  // this is the left-bound of the window
                    this.next(); 
                }
            }
        }

        const c = <RgbaColor>this._portal?.getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }

    override next() {      
        super.next();  // this must be called!

        // next scene to run
        const nextLevel = new BlueLevel();  // next level to be loaded
        nextLevel.start();
    }

    load(): void {
        engine.texture.load(this._portalPath);
        engine.texture.load(this._collectorPath);
    }

    unload(): void {
        engine.texture.unload(this._portalPath);
        engine.texture.unload(this._collectorPath);
    }
}

export default MyGame;

window.onload = function() {
    engine.init("GLCanvas");

    const myGame = new MyGame();
    myGame.start();
}