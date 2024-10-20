/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
"use strict"; // Operate in Strict mode such that variables must be declared before used!
import * as engine from "../engine/core.js";
class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);
        // Step B: Clear the canvas
        let color = {
            Red: 0,
            Green: 0.8,
            Blue: 0,
            Alpha: 1
        };
        engine.clearCanvas(color);
        // Step C: Draw the square
        engine.drawSquare();
    }
}
window.onload = function () {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
};
