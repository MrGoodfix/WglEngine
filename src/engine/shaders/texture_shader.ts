import * as glSys from "../core/gl";
import * as vertexBuffer from "../core/vertex_buffer";
import SimpleShader from "./simple_shader";

class TextureShader extends SimpleShader {
    protected mTextureCoordinateRef: GLint;
    protected mSamplerRef: WebGLUniformLocation;

    constructor(vertexShaderPath: string, fragmentShaderPath: string) {
        super(vertexShaderPath, fragmentShaderPath);

        const gl = glSys.get();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in TextureShader constructor.");
        }

        this.mTextureCoordinateRef = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
        
        const samplerRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
        if (samplerRef == null) {
            throw new Error("TextureShader could not access uniform location for uSampler.");
        }
        this.mSamplerRef = samplerRef;
    }

    _getTexCoordBuffer() {
        return vertexBuffer.getTexCoord();
    }

    override activate(pixelColor: Iterable<GLfloat>, trsMatrix: Iterable<GLfloat>, cameraMatrix: Iterable<GLfloat>): void {
        super.activate(pixelColor, trsMatrix, cameraMatrix);

        const gl = glSys.get();
        if (gl == null) {
            throw new Error("No WebGL2RenderingContext in TextureShader activate.");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
        gl.vertexAttribPointer(
            this.mTextureCoordinateRef,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(this.mTextureCoordinateRef);

        gl.uniform1i(this.mSamplerRef, 0);
    }
}

export default TextureShader;