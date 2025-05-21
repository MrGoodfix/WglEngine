import Camera from "../engine/camera";
import engine from "../engine/index";
import Renderable from "../engine/renderables/renderable";
import RgbaColor from "../engine/rgba_color";
import MyGame from "./my_game";
import SceneFileParser from "./util/scene_file_parser";

class BlueLevel extends engine.Scene {
    private mSceneFile: string;
    private mSQSet: Renderable[];
    private mCamera: Camera|null;
    //private _backgroundAudio: string;
    //private _cue: string;
    private _portalPath: string;
    private _collectorPath: string;

    constructor() {
        super();

        // scene file name
        this.mSceneFile = "assets/blue_level.xml";

        this._portalPath = "assets/minion_portal.jpg";
        this._collectorPath = "assets/minion_collector.jpg";

        // all squares
        this.mSQSet = [];        // these are the Renderable objects

        // The camera to view the scene
        this.mCamera = null;
    }

    override init(): void {
        const sceneParser = new SceneFileParser(this.mSceneFile);

        // Step A: Read in the camera
        this.mCamera = sceneParser.parseCamera();

        // Step B: Read all the squares
        sceneParser.parseSquares(this.mSQSet);
        sceneParser.parseTextureSquares(this.mSQSet);
    }

    override load(): void {
        engine.xml.load(this.mSceneFile);
        
        engine.texture.load(this._portalPath);
        engine.texture.load(this._collectorPath);
    }

    override unload(): void {
        engine.audio.stopBackground();

        engine.xml.unload(this.mSceneFile);
        engine.texture.unload(this._portalPath);
        engine.texture.unload(this._collectorPath);
    }

    override draw(): void {
        const whitish: RgbaColor = new engine.RgbaColor(0.9, 0.9, 0.9, 1);
        engine.clearCanvas(whitish);

        if (this.mCamera) {
            // Step A: set up the camera
            this.mCamera.setViewAndCameraMatrix();
            // Step B: draw everything with the camera
            let i;
            for (i = 0; i < this.mSQSet.length; i++) {
                this.mSQSet[i].draw(this.mCamera);
            }
        }
    }

    override update(): void {

        const xform = this.mSQSet[0].getXform();
        const deltaX = 0.05;

        // Move right and swap over
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) { // this is the right-bound of the window
                xform.setPosition(12, 60);
            }
        }

        // test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // this is the left-boundary
                this.next(); // go back to my game
            }
        }

        const c = this.mSQSet[1].getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }

    override next() {
        super.next();
        const nextLevel = new MyGame();  // load the next level
        nextLevel.start();
    }
}

export default BlueLevel;