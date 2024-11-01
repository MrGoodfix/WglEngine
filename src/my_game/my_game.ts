/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import Renderable from "../engine/Renderable";
import RgbaColor from "../engine/RgbaColor";

class MyGame {
    private mWhiteSq: Renderable;
    private mRedSq: Renderable;

    constructor(htmlCanvasID: string) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        // Create renderable objects
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor(new RgbaColor(1,1,1,1));

        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor(new RgbaColor(1,0,0,1));

        // Step C: Clear the canvas
        const greenish: RgbaColor = new engine.RgbaColor(0, 0.8, 0, 1);
        engine.clearCanvas(greenish);

        // Step C: Draw the square
        this.mWhiteSq.draw();

        this.mRedSq.draw();
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}