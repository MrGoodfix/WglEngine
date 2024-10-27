import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";
class SimpleShader {
    mCompiledShader;
    mVertexShader;
    mFragmentShader;
    mVertexPositionRef;
    constructor(vertexShaderID, fragmentShaderID) {
        let gl = core.getGL();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
        }
        this.mVertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
        let program = gl.createProgram();
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
    }
    activate() {
        let gl = core.getGL();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in SimpleShader constructor.");
        }
        gl.useProgram(this.mCompiledShader);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef, 3, // each element is a 3-float (x,y.z)
        gl.FLOAT, // data type is FLOAT
        false, // if the content is normalized vectors
        0, // number of bytes to skip in between elements
        0); // offsets to the first element
        gl.enableVertexAttribArray(this.mVertexPositionRef);
    }
}
function loadAndCompileShader(filePath, shaderType) {
    let shaderSource = null;
    let compiledShader = null;
    let gl = core.getGL();
    if (gl == null) {
        throw new Error("No WebGL2RenderingContext in SimpleShader.loadAndCompileShader.");
    }
    // Step A: get the shader source
    let xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    }
    catch (error) {
        throw new Error("Failed to load shader: "
            + filePath
            + " [Hint: you cannot double click to run this project. "
            + " The index.html file must be loaded by a web server.]");
    }
    shaderSource = xmlReq.responseText;
    if (shaderSource == null || shaderSource === undefined) {
        throw new Error("shaderSource cannot be null or undefined");
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
