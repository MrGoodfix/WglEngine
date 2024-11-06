/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import RgbaColor from "../engine/rgba_color";
import { vec2 } from "gl-matrix";

class MyGame {
    constructor(htmlCanvasID: string) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        const viewport = new engine.Viewport(
            20,
            40,
            600,
            300
        );

        const camera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            viewport
        );

        // Step B: Create renderable objects
        const blueSquare = new engine.Renderable();
        blueSquare.setColor(RgbaColor.DodgerBlue());

        const redSquare = new engine.Renderable();
        redSquare.setColor(RgbaColor.FireBrick());

        const topLeftSquare = new engine.Renderable();
        topLeftSquare.setColor(RgbaColor.Red());

        const topRightSquare = new engine.Renderable();
        topRightSquare.setColor(RgbaColor.PaleGreen());

        const bottomRightSquare = new engine.Renderable();
        bottomRightSquare.setColor(RgbaColor.Aquamarine());

        const bottomLeftSquare = new engine.Renderable();
        bottomLeftSquare.setColor(new RgbaColor(0.1, 0.1, 0.1, 1));

        // Step C: Clear the canvas
        const whitish: RgbaColor = new engine.RgbaColor(0.9, 0.9, 0.9, 1);
        engine.clearCanvas(whitish);

        camera.setViewAndCameraMatrix();

        /*
         * World coordinates should now be set to ...
         * Center (20, 60)
         * Top-left corner (10, 65)
         * Top-right corner (30, 65)
         * Bottom-right corner (30, 55)
         * Bottom-left corner (10, 55)
         */

        // Step F: draw blue
        blueSquare.getXform().setPosition(20, 60);
        blueSquare.getXform().setRotationInRad(0.2);
        blueSquare.getXform().setSize(5, 5);
        blueSquare.draw(camera);
        
        // Step G: draw center red
        redSquare.getXform().setPosition(20, 60);
        redSquare.getXform().setSize(2, 2);
        redSquare.draw(camera);

        // Step H: draw corners
        topLeftSquare.getXform().setPosition(10, 65);
        topLeftSquare.draw(camera);

        topRightSquare.getXform().setPosition(30, 65);
        topRightSquare.draw(camera);

        bottomRightSquare.getXform().setPosition(30, 55);
        bottomRightSquare.draw(camera);

        bottomLeftSquare.getXform().setPosition(10, 55);
        bottomLeftSquare.draw(camera);
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}