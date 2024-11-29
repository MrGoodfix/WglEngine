/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import RgbaColor from "../engine/rgba_color";
import Renderable from "../engine/renderable";
import SceneFileParser from "./util/scene_file_parser.js";
import * as loop from "../engine/core/loop.js";
import Camera from "../engine/camera";
import { SceneInterface } from "../engine/scene.interface.js";

class MyGame implements SceneInterface {
    private _sceneFile: string;
    private _squareSet: Renderable[];
    private _camera: Camera|null;

    constructor() {
        this._sceneFile = "assets/scene.xml";
        this._squareSet = [];
        this._camera = null;
    }

    init(): void {
        const sceneParser = new SceneFileParser(<Document>engine.xml.get(this._sceneFile));
        this._camera = sceneParser.parseCamera();
        console.log(`Viewport ${this._camera.viewport}, center ${this._camera.wcCenter}, width ${this._camera.wcWidth}`);
        sceneParser.parseSquares(this._squareSet);
        console.log("Created " + this._squareSet.length + " squares");
        for (let i = 0; i < this._squareSet.length; i++) {
            const sq = this._squareSet[i];
            console.log(sq.displayText());
        }
    }

    draw(): void {
        const whitish: RgbaColor = new engine.RgbaColor(0.9, 0.9, 0.9, 1);
        engine.clearCanvas(whitish);
        
        if (this._camera)
        {
            this._camera.setViewAndCameraMatrix();
            for (let i = 0; i < this._squareSet.length; i++) {
                this._squareSet[i].draw(this._camera);
            }
        }
    }

    update(): void {
        // For this very simple game, let's move the white square and pulse the red
        const whiteXform = this._squareSet[0].getXform();
        if (whiteXform) {
            const deltaX:GLfloat = 0.05;
            // Step A: Rorate the white square
            if  (engine.input.isKeyPressed(engine.input.keys.Right)) {
                if (whiteXform.getXPos() > 30)  { // this is the right-bound of the window
                    whiteXform.setPosition(10, 60);
                }
                whiteXform.incXPosBy(deltaX);
            }

            if (engine.input.isKeyClicked(engine.input.keys.Up)) {
                whiteXform.incRotationInDeg(1);
            }
        }

        // Step B: pulse the red square
        const redXform = this._squareSet[1].getXform();
        if (redXform) {
            if (engine.input.isKeyPressed(engine.input.keys.Down)) {
                if (redXform.getWidth() > 5) {
                    redXform.setSize(2, 2);
                }
                redXform.incSizeBy(0.05);
            }
        }
    }

    load(): void {
        engine.xml.load(this._sceneFile);
    }

    unload(): void {
        engine.xml.unload(this._sceneFile);
    }
}

window.onload = function() {
    engine.init("GLCanvas");

    const myGame = new MyGame();

    loop.start(myGame);
}