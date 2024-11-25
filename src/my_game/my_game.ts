/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import RgbaColor from "../engine/rgba_color";
import { vec2 } from "gl-matrix";
import { SceneInterface } from "../engine/scene.interface";
import Renderable from "../engine/renderable";
import * as loop from "../engine/core/loop.js";
import Camera from "../engine/camera";

class MyGame implements SceneInterface {
    private _whiteSquare: Renderable|null;
    private _redSquare: Renderable|null;
    private _camera: Camera|null;

    constructor() {
        this._whiteSquare = null;
        this._redSquare = null;
        this._camera = null;
    }

    init() {
        const viewport = new engine.Viewport(
            20,
            40,
            600,
            300
        );

        this._camera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            viewport
        );
        this._camera.backgroundColor = RgbaColor.LightGray();

        this._whiteSquare = new engine.Renderable();
        this._whiteSquare.setColor(RgbaColor.White());
        this._whiteSquare.getXform().setPosition(20, 60);
        this._whiteSquare.getXform().setRotationInRad(0.2);
        this._whiteSquare.getXform().setSize(5, 5);

        this._redSquare = new engine.Renderable();
        this._redSquare.setColor(RgbaColor.Red());
        this._redSquare.getXform().setPosition(20, 60);
        this._redSquare.getXform().setSize(2, 2);
    }

    draw(): void {
        const whitish: RgbaColor = new engine.RgbaColor(0.9, 0.9, 0.9, 1);
        engine.clearCanvas(whitish);
        
        if (this._camera)
        {
            this._camera.setViewAndCameraMatrix();
            this._whiteSquare?.draw(this._camera);
            this._redSquare?.draw(this._camera);
        }
    }

    update(): void {
        // For this very simple game, let's move the white square and pulse the red
        const whiteXform = this._whiteSquare?.getXform();
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
        const redXform = this._redSquare?.getXform();
        if (redXform) {
            if (engine.input.isKeyPressed(engine.input.keys.Down)) {
                if (redXform.getWidth() > 5) {
                    redXform.setSize(2, 2);
                }
                redXform.incSizeBy(0.05);
            }
        }
    }
}

window.onload = function() {
    engine.init("GLCanvas");

    const myGame = new MyGame();

    loop.start(myGame);
}