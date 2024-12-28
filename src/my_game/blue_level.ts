import Camera from "../engine/camera";
import engine from "../engine/index";
import Renderable from "../engine/renderable";

import MyGame from "./my_game";
import SceneFileParser from "./util/scene_file_parser";

class BlueLevel extends engine.Scene {
    private mSceneFile: string;
    private mSQSet: Renderable[];
    private mCamera: Camera|null;
    private _backgroundAudio: string;
    private _cue: string;

    constructor() {
        super();

        this._backgroundAudio = "assets/sounds/bg_clip.mp3";
        this._cue = "assets/sounds/blue_level_cue.wav";

        // scene file name
        this.mSceneFile = "assets/blue_level.xml";
        // all squares
        this.mSQSet = [];        // these are the Renderable objects

        // The camera to view the scene
        this.mCamera = null;
    }

    override init(): void {
        const sceneParser = new SceneFileParser(<Document>engine.xml.get(this.mSceneFile));

        // Step A: Read in the camera
        this.mCamera = sceneParser.parseCamera();

        // Step B: Read all the squares
        sceneParser.parseSquares(this.mSQSet);

        engine.audio.playBackground(this._backgroundAudio, 0.5);
    }

    override load(): void {
        engine.xml.load(this.mSceneFile);
        engine.audio.load(this._backgroundAudio);
        engine.audio.load(this._cue);
    }

    override unload(): void {
        engine.audio.stopBackground();

        engine.xml.unload(this.mSceneFile);
        engine.audio.unload(this._backgroundAudio);
        engine.audio.unload(this._cue);
    }

    override draw(): void {
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
        // For this very simple game, let's move the first square
        const xform = this.mSQSet[1].getXform();
        const deltaX = 0.05;

        // Move right and swap over
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            engine.audio.playCue(this._cue, 0.5);
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) { // this is the right-bound of the window
                xform.setPosition(12, 60);
            }
        }

        // test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            engine.audio.playCue(this._cue, 1.0);
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // this is the left-boundary
                this.next(); // go back to my game
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Q)) {
            this.stop();  // Quit the game
        }
    }

    override next() {
        super.next();
        const nextLevel = new MyGame();  // load the next level
        nextLevel.start();
    }
}

export default BlueLevel;