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

export {init, get}