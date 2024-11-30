let mCanvas: HTMLCanvasElement|null
let mGL: WebGL2RenderingContext|null;
function get(): WebGL2RenderingContext 
{ 
    if (mGL == null) {
        throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
    }
    return mGL; 
}

// initialize the WebGL
function init(htmlCanvasID: string) {
    mCanvas = document.getElementById(htmlCanvasID) as HTMLCanvasElement;

    if (mCanvas == null) {
        throw new Error("There is no canvas.");
    }

    mGL = mCanvas.getContext("webgl2") as WebGL2RenderingContext;

    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}

function cleanUp() {
    if ((mGL == null) || (mCanvas == null)) {
        throw new Error("Engine cleanup: system is not initialized.");
    }
    mGL = null;
    mCanvas.style.position = "fixed";
    mCanvas.style.backgroundColor = "rgba(200, 200, 200, 0.5";
    mCanvas = null;
    document.body.innerHTML += 
        "<br /><br /><h1>End of Game</h1><h1>GL System Shut Down</h1>";
}

export {init, get, cleanUp}