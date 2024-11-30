import { SceneInterface } from "../scene.interface";
import * as input from "../input";
import * as map from "./resource_map"

const ups: number = 60;
const mpf: number = 1000 / ups;

let prevTime: DOMHighResTimeStamp;
let lagTime: number;
let loopRunning: boolean = false;
let currentScene: SceneInterface|null;
let frameId: number = -1;

function loopOnce() {
    frameId = requestAnimationFrame(loopOnce);

    currentScene?.draw();

    const currentTime: number = performance.now(); // timestamp in milliseconds
    const elapsedTime: number = currentTime - prevTime;
    prevTime = currentTime;
    lagTime += elapsedTime;

    while ((lagTime >= mpf) && loopRunning) {
        // TODO - it seems like a mistake to include the input.update() here
        // considering the current implementation of the input module.
        // It seems unlikely and not beneficial to check for a change in keyup and
        // keydown inside a loop in a function that is running synchronously in between buffer draws.
        // I wonder if it will be just as effective just prior to this loop 
        // or if this loop is moved into some parallel would it be better to keep it here?
        input.update();
        currentScene?.update();
        lagTime -= mpf;
    } 
}

async function start(scene: SceneInterface) {
    if (loopRunning) {
        throw new Error("loop already running")
    }
    currentScene = scene;
    currentScene.load();

    console.log("Awaiting promises in resource map");
    await map.waitOnPromises();
    console.log("Resource map promises finished");

    currentScene.init(); 

    prevTime = performance.now();
    lagTime = 0.0;
    loopRunning = true;
    frameId = requestAnimationFrame(loopOnce);
}

function stop(): void {
    loopRunning = false;
    // make sure no more animation frames
    cancelAnimationFrame(frameId);
}

function cleanUp(): void {
    if (loopRunning) {
        stop();
        currentScene?.unload();
        currentScene = null;
    }
}

export {start, stop, cleanUp}