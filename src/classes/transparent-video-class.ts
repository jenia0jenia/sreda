import {ITransparentVideoOption} from "../interfaces"

export default class TransparentVideoClass {
    /**
     * @typedef TransparentVideoOption
     * @property {number} width
     * @property {number} height
     * 
     * @param {{width, height}} option 
     */
    view
    gl
    vertSharderCode
    fragSharderCode
    vertSharder
    fragSharder
    programSharder
    _vertexs
    _texture
    media
    textureUpdate
    VERTEX_ATTR
    TEXCOORD_ATTR
    lastUpdateTime

    constructor(readonly option: ITransparentVideoOption) {
        option = option || {};
        option.frameRate = option.frameRate || 15;
        option.width = option.width || 255;
        option.height = option.height || 255;
        this.option = option;
        this.view = document.createElement('canvas');
        this.view.setAttribute('width', option.width.toString());
        this.view.setAttribute('height', option.height.toString());
        this.gl = this.view.getContext("webgl")!;
        this.gl.viewport(0, 0, option.width, option.height);

        // this.vertSharderCode = require('./shader/tprv.vert');
        // this.fragSharderCode = require('./shader/tprv.frag');

        this.vertSharderCode =
        `
        varying highp vec2 vTextureCoord;
        
        attribute vec4 aVertexPosition;
        attribute vec2 aTextureCoord;

        void main(void) {
            gl_Position = aVertexPosition;
            vTextureCoord = aTextureCoord;
        }
        `;

        this.fragSharderCode =
        `
        precision highp float;
        varying highp vec2 vTextureCoord;
        uniform sampler2D uSampler;
        void main() {
            vec2 texCoord = vec2(vTextureCoord[0], vTextureCoord[1]/2.0);
            vec4 c = texture2D(uSampler, texCoord);
            vec2 texCoord2 = vec2(texCoord[0], texCoord[1]+0.5);
            c[3] = texture2D(uSampler, texCoord2)[0];
            gl_FragColor = c;
        }
        `;


        this.vertSharder = this._loadShader_(this.vertSharderCode, this.gl.VERTEX_SHADER);
        this.fragSharder = this._loadShader_(this.fragSharderCode, this.gl.FRAGMENT_SHADER);
        this.programSharder = this._createProgram_();

        this._vertexs = this._createArrayBuffer_(
            [
                -1, -1, 0, 1,
                1, -1, 1, 1,
                1, 1, 1, 0,

                1, 1, 1, 0,
                -1, 1, 0, 0,
                -1, -1, 0, 1
            ]
        );

        console.log(option);
        [this._texture, this.media] = this._loadTexture_(option.url);
        this.textureUpdate = false;

        this.VERTEX_ATTR = this._getAttributeLocation_('aVertexPosition');
        this.TEXCOORD_ATTR = this._getAttributeLocation_('aTextureCoord');
        this.lastUpdateTime = Date.now();
        this.draw();
    }

    draw() {
        let ctime = Date.now();
        if (ctime - this.lastUpdateTime > 1000 / this.option.frameRate) {

            this.lastUpdateTime = ctime;
            let gl = this.gl;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexs);

            gl.vertexAttribPointer(this.VERTEX_ATTR, 2, gl.FLOAT, false, 4 * 4, 0);
            gl.enableVertexAttribArray(this.VERTEX_ATTR);

            gl.vertexAttribPointer(this.TEXCOORD_ATTR, 2, gl.FLOAT, false, 4 * 4, 4 * 2);
            gl.enableVertexAttribArray(this.TEXCOORD_ATTR);
            gl.useProgram(this.programSharder);
            gl.activeTexture(gl.TEXTURE0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            if (this.textureUpdate) {
                const level = 0;
                const internalFormat = gl.RGBA;
                const srcFormat = gl.RGBA;
                const srcType = gl.UNSIGNED_BYTE;
                gl.bindTexture(gl.TEXTURE_2D, this._texture);
                // @ts-ignore
                gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, this.media);
            }
        }
        requestAnimationFrame(_ => this.draw())
    }

    /*private*/

    _loadTexture_(url: string, type = '') {

        let gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([233, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            width, height, border, srcFormat, srcType,
            pixel);

        let self = this;

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        let media = document.createElement('video');
        media.setAttribute('preload', 'auto');
        media.setAttribute('loop', "true");
        media.setAttribute('crossorigin', 'anonymous');
        //     this.media.setAttribute('poster', 'data:image/bmp;base64,Qk06AAAAAAAAADYAAAAoAAAAAQAAAAEAAAABABgAAAAAAAAAAADEDgAAxA4AAAAAAAAAAAAAAAAA/w==');
        media.onloadedmetadata = function () {
        };

        media.ontimeupdate = function () {
            self.textureUpdate = true;
        }

        media.onended = function () {
            self.textureUpdate = true;
        }

        media.onplay = function () {
            self.textureUpdate = true;
        }

        media.src = url;
        return [texture, media];
    }



    /**
     * 
     * @param {number[]} arr 
     */
    _createArrayBuffer_(arr: number[]) {
        let gl = this.gl;
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(arr),
            gl.STATIC_DRAW);
        return buffer;
    }

    _getAttributeLocation_(name: string) {
        console.log(this.programSharder);
        return this.gl.getAttribLocation(this.programSharder, name);
    }

    _getUniformLocation_(name: string) {
        return this.gl.getUniformLocation(this.programSharder, name);
    }


    /**
     * 
     
     * @param {string} source 
     * @param {number} type
     */
    _loadShader_(source: string, type: number) {
        let gl = this.gl;
        let shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            throw expect;
        }

        return shader;
    }

    _createProgram_() {
        let gl = this.gl;
        let program = gl.createProgram()!;
        console.log(this.vertSharder, this.fragSharder)
        gl.attachShader(program, this.vertSharder);
        gl.attachShader(program, this.fragSharder);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
            throw expect;
        }
        return program;
    }

}
