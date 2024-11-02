/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import Renderable from "../engine/renderable";
import RgbaColor from "../engine/rgba_color";

class MyGame {
    private mWhiteSq: Renderable;
    private mRedSq: Renderable;

    constructor(htmlCanvasID: string) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        // Step B: Create renderable objects
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor(new RgbaColor(1,1,1,1));

        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor(new RgbaColor(1,0,0,1));

        // Step C: Clear the canvas
        const greenish: RgbaColor = new engine.RgbaColor(0, 0.8, 0, 1);
        engine.clearCanvas(greenish);

        // Step C1: Draw the white square
        this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setSize(1.2, 1.2);
        this.mWhiteSq.draw();
        
        // Step C2: Draw the red square
        this.mRedSq.getXform().setPosition(0.25, -0.25);
        this.mRedSq.getXform().setRotationInRad(-0.785);
        this.mRedSq.getXform().setSize(0.4, 0.4);
        this.mRedSq.draw();
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}