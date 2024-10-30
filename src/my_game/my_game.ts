/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import * as engine from "../engine/core.js";

class MyGame {
    constructor(htmlCanvasID: string) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        // Step B: Clear the canvas
        let color: engine.RgbaColor = {
            Red : 0,
            Green : 0.8,
            Blue : 0,
            Alpha : 1
        }
        engine.clearCanvas(color);

        // Step C: Draw the square
        engine.drawSquare([1, 0, 0, 1]);
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}