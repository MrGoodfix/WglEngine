import engine from "../engine/index";
import RgbaColor from "../engine/rgba_color";
import Renderable from "../engine/renderable";
import Camera from "../engine/camera";
import BlueLevel from "./blue_level.js";
import { vec2 } from "gl-matrix";
import Viewport from "../engine/viewport.js";

class MyGame extends engine.Scene {
    private _camera: Camera|null;
    private _hero: Renderable|null;
    private _support: Renderable|null;

    constructor() {
        super();
        this._camera = null;
        this._hero = null;
        this._support = null;
    }

    init(): void {
        // Step A: set up the cameras
        this._camera = new engine.Camera(
            vec2.fromValues(20, 60),   // position of the camera
            20,                        // width of camera
            new Viewport(20, 40, 600, 300)         // viewport (orgX, orgY, width, height)
        );
        this._camera.backgroundColor = new RgbaColor(0.8, 0.8, 0.8, 1);

        // Step B: Create the support object in red
        this._support = new engine.Renderable();
        this._support.setColor(new RgbaColor(0.8, 0.2, 0.2, 1));
        this._support.getXform().setPosition(20, 60);
        this._support.getXform().setSize(5, 5);

        // Setp C: Create the hero object in blue
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
            this._support?.draw(this._camera);
            this._hero?.draw(this._camera);
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
        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop();  // Quit the game
    }

    override next() {      
        super.next();  // this must be called!

        // next scene to run
        const nextLevel = new BlueLevel();  // next level to be loaded
        nextLevel.start();
    }

    load(): void {
        
    }

    unload(): void {
        
    }
}

export default MyGame;

window.onload = function() {
    engine.init("GLCanvas");

    const myGame = new MyGame();
    myGame.start();
}