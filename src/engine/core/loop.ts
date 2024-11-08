import { SceneInterface } from "../scene.interface";

const ups: number = 60;
const mpf: number = 1000 / ups;

let prevTime: DOMHighResTimeStamp;
let lagTime: number;
let loopRunning: boolean = false;
let currentScene: SceneInterface;
let frameId: number = -1;

function loopOnce() {
    frameId = requestAnimationFrame(loopOnce);

    currentScene.draw();

    const currentTime: number = performance.now(); // timestamp in milliseconds
    const elapsedTime: number = currentTime - prevTime;
    prevTime = currentTime;
    lagTime += elapsedTime;

    while ((lagTime >= mpf) && loopRunning) {
        currentScene.update();
        lagTime -= mpf;
    } 
}

function start(scene: SceneInterface) {
    if (loopRunning) {
        throw new Error("loop already running")
    }

    currentScene = scene;
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

export {start, stop}