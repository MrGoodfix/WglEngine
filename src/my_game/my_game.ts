/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import * as glSys from "../engine/core/gl"
import RgbaColor from "../engine/rgba_color";
import { mat4, vec2, vec3 } from "gl-matrix";

class MyGame {
    constructor(htmlCanvasID: string) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

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

        const gl = glSys.get();
        // Step D: viewport
        // viewport sets area to be drawn on
        gl.viewport(
            20,
            40,
            600,
            300
        );
        // scissor limits the clear area
        gl.scissor(
            20,
            40,
            600,
            300
        );

        gl.enable(gl.SCISSOR_TEST);
        engine.clearCanvas(new RgbaColor(0.8, 0.8, 0.8, 1.0));
        gl.disable(gl.SCISSOR_TEST);
        // i guess scissoring is computationally expensive and that is why it is disabled after using it once.

        // Step E: setup the camera matrix
        const cameraCenter: vec2 = vec2.fromValues(20, 60);
        // wc "world coordinates"
        const wcSize: vec2 = vec2.fromValues(20, 10);

        const cameraMatrix: mat4 = mat4.create();

        mat4.scale(
            cameraMatrix, 
            mat4.create(), 
            vec3.fromValues(
                2.0 / wcSize[0],
                2.0 / wcSize[1],
                1.0
            ));

        mat4.translate(
            cameraMatrix,
            cameraMatrix,
            vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0)
        );

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
        blueSquare.draw(cameraMatrix);
        
        // Step G: draw center red
        redSquare.getXform().setPosition(20, 60);
        redSquare.getXform().setSize(2, 2);
        redSquare.draw(cameraMatrix);

        // Step H: draw corners
        topLeftSquare.getXform().setPosition(10, 65);
        topLeftSquare.draw(cameraMatrix);

        topRightSquare.getXform().setPosition(30, 65);
        topRightSquare.draw(cameraMatrix);

        bottomRightSquare.getXform().setPosition(30, 55);
        bottomRightSquare.draw(cameraMatrix);

        bottomLeftSquare.getXform().setPosition(10, 55);
        bottomLeftSquare.draw(cameraMatrix);
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}