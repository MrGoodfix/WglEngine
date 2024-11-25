import * as glSys from "./core/gl";
import * as vertexBuffer from "./core/vertex_buffer";
import * as text from "./resources/text"

class SimpleShader {
    private mCompiledShader: WebGLShader;
    private mVertexShader: WebGLShader;
    private mFragmentShader: WebGLShader;
    private mVertexPositionRef: GLint;
    private mPixelColorRef: WebGLUniformLocation;
    private mModelMatrixRef: WebGLUniformLocation;
    private mCameraMatrixRef: WebGLUniformLocation;

    constructor(vertexShaderID: string, fragmentShaderID: string) {
        const gl = glSys.get();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
        }
        
        this.mVertexShader = compileShader(vertexShaderID, gl.VERTEX_SHADER);
        this.mFragmentShader = compileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
        
        const program = gl.createProgram();
        if (program == null) {
            throw new Error("Failed to create program in SimpleShader.");
        }

        this.mCompiledShader = program;
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);

        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
        }

        this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");

        const pixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
        
        if (pixelColorRef == null) {
            throw new Error("SimpleShader could not access uniform location for uPixelColor.");
        }
        this.mPixelColorRef = pixelColorRef;

        const modelMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uModelXformMatrix");

        if (modelMatrixRef == null) {
            throw new Error("SimpleShader could not access uniform location for uModelXformMatrix.");
        }

        this.mCameraMatrixRef = <WebGLUniformLocation>gl.getUniformLocation(this.mCompiledShader, "uCameraXformMatrix");

        this.mModelMatrixRef = modelMatrixRef;
    }

    activate(pixelColor: Iterable<GLfloat>, 
             trsMatrix: Iterable<GLfloat>,
             cameraMatrix: Iterable<GLfloat>): void  {
        const gl = glSys.get();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
        }
        gl.useProgram(this.mCompiledShader);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef,
            3,              // each element is a 3-float (x,y.z)
            gl.FLOAT,       // data type is FLOAT
            false,          // if the content is normalized vectors
            0,              // number of bytes to skip in between elements
            0);             // offsets to the first element
        gl.enableVertexAttribArray(this.mVertexPositionRef);

        gl.uniform4fv(this.mPixelColorRef, pixelColor);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
    }
}

function compileShader(filePath: string, shaderType: GLenum): WebGLShader {
    let shaderSource: string|null = null;
    let compiledShader = null; 
    const gl = glSys.get();
    if (gl == null) {
        throw new Error("No WebGL2RenderingContext in SimpleShader.loadAndCompileShader.");
    }
    // Step A: get the shader source
    shaderSource = text.get(filePath);

    if (shaderSource == null || shaderSource === undefined) {
        throw new Error("WARNING: " + filePath + " not loaded!");
    }
    // Step B: Create the shader based on type
    compiledShader = gl.createShader(shaderType);
    if (compiledShader == null) { 
        throw new Error("compiledShader cannot be null");
    }
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: Check for errors and return
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}

//
// export the class, the default keyword says importer of this class cannot change the name "SimpleShader"
// for this reason, to import this class, one must issue
//      import SimpleShader from "./simple_shader.js";
// attempt to change name, e.g., 
//      import SimpleShader as MyShaderName from "./simple_shader.js";
// will result in failure
// 
export default SimpleShader;