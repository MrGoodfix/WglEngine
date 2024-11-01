/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index";
import Renderable from "../engine/renderable";
import RgbaColor from "../engine/rgba_color";
import * as matrix from 'gl-matrix'

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

        const trsMatrix: matrix.mat4 = matrix.mat4.create();

        // Step C1: Draw the white square
        matrix.mat4.translate(trsMatrix, trsMatrix, matrix.vec3.fromValues(-0.25, 0.25, 0.0));
        matrix.mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
        matrix.mat4.scale(trsMatrix, trsMatrix, matrix.vec3.fromValues(1.2, 1.2, 1.0));
        this.mWhiteSq.draw(trsMatrix);
        
        // Step C2: Draw the red square
        matrix.mat4.identity(trsMatrix);
        matrix.mat4.translate(trsMatrix, trsMatrix, matrix.vec3.fromValues(0.25, -0.25, 0.0));
        matrix.mat4.rotateZ(trsMatrix, trsMatrix, -0.785);
        matrix.mat4.scale(trsMatrix, trsMatrix, matrix.vec3.fromValues(0.4, 0.4, 1.0));
        this.mRedSq.draw(trsMatrix);
    }
}

window.onload = function() {
    // The id tag passed to the constructor tightly couples this to index.html
    new MyGame('GLCanvas');
}