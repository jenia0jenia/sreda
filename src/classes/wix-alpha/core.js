
export default {
    init,
    draw,
    destroy,
    resize,
    getWebGLContext,
    createTexture
};

const vertexTemplate = ({
    uniform = '',
    attribute = '',
    varying = '',
    constant = '',
    main = ''
}) => `
    precision mediump float;
    ${uniform}
    ${attribute}
    attribute vec2 a_texCoord;
    attribute vec2 a_position;
    ${varying}
    varying vec2 v_texCoord;

    const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
    ${constant}
    void main() {
    v_texCoord = a_texCoord;
    ${main}
    gl_Position = vec4(a_position.xy, 0.0, 1.0);
    }`;

const fragmentTemplate = ({
    uniform = '',
    varying = '',
    constant = '',
    main = ''
}) => `
    precision mediump float;
    ${varying}
    varying vec2 v_texCoord;
    ${uniform}
    uniform sampler2D u_source;

    const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
    ${constant}
    void main() {
    vec4 pixel = texture2D(u_source, v_texCoord);
    vec3 color = pixel.rgb;
    float alpha = pixel.a;
    ${main}
    gl_FragColor = vec4(color, 1.0) * alpha;
    }`;

/**
 * Initialize a compiled WebGLProgram for the given canvas and effects.
 *
 * @private
 * @param {WebGLRenderingContext} gl
 * @param effects
 * @param dimensions
 * @return {{gl: WebGLRenderingContext, data: kamposSceneData, [dimensions]: {width: number, height: number}}}
 */
function init(gl, effects, dimensions) {

    const programData = _initProgram(gl, effects);

    return { gl, data: programData, dimensions: dimensions || {} };
}

/**
 * Get a webgl context for the given canvas element.
 *
 * @private
 * @param {HTMLCanvasElement} canvas
 * @return {WebGLRenderingContext}
 */
function getWebGLContext(canvas) {
    let context;

    const config = {
        preserveDrawingBuffer: false, // should improve performance - https://stackoverflow.com/questions/27746091/preservedrawingbuffer-false-is-it-worth-the-effort
        antialias: false, // should improve performance
        depth: false, // turn off for explicitness - and in some cases perf boost
        stencil: false // turn off for explicitness - and in some cases perf boost
    };

    context = canvas.getContext('webgl', config);

    if (!context) {
        context = canvas.getContext('experimental-webgl', config);
    }

    return context;
}

/**
 * Resize the target canvas.
 *
 * @private
 * @param {WebGLRenderingContext} gl
 * @param {{width: number, height: number}} [dimensions]
 * @return {boolean}
 */
function resize(gl, dimensions) {
    const canvas = gl.canvas;
    const realToCSSPixels = 1; //window.devicePixelRatio;
    const { width, height } = dimensions || {};
    let displayWidth, displayHeight;

    if (width && height) {
        displayWidth = width;
        displayHeight = height;
    }
    else {
        // Lookup the size the browser is displaying the canvas.
        displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
        displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
    }

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

/**
 * Draw a given scene
 *
 * @private
 * @param {WebGLRenderingContext} gl
 * @param {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} media
 * @param {kamposSceneData} data
 * @param {{width: number, height: number}} dimensions
 */
function draw(gl, media, data, dimensions) {
    const { program, source, attributes, uniforms, textures } = data;

    // bind the source texture
    gl.bindTexture(gl.TEXTURE_2D, source.texture);

    // read source data into texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // set attribute buffers with data
    _enableVertexAttributes(gl, attributes);

    // set uniforms with data
    _setUniforms(gl, uniforms);

    if (textures) {
        for (let i = -1; i < textures.length; i++) {
            gl.activeTexture(gl.TEXTURE0 + (i + 1));
            gl.bindTexture(gl.TEXTURE_2D, i === -1 ? source.texture : textures[i].texture);
        }
    }

    // Draw the rectangles
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * Free all resources attached to a specific webgl context.
 *
 * @private
 * @param {WebGLRenderingContext} gl
 * @param {kamposSceneData} data
 */
function destroy(gl, data) {
    const { program, vertexShader, fragmentShader, source, attributes } = data;

    // delete buffers
    (attributes || []).forEach(attr => gl.deleteBuffer(attr.buffer));

    // delete texture
    gl.deleteTexture(source.texture);

    // delete program
    gl.deleteProgram(program);

    // delete shaders
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
}

function _initProgram(gl, effects) {
    const source = {
        texture: createTexture(gl).texture,
        buffer: null
    };

    // flip Y axis for source texture
    gl.bindTexture(gl.TEXTURE_2D, source.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const data = _mergeEffectsData(effects);
    const vertexSrc = _stringifyShaderSrc(data.vertexSrc, vertexTemplate);
    const fragmentSrc = _stringifyShaderSrc(data.fragmentSrc, fragmentTemplate);

    // compile the GLSL program
    const { program, vertexShader, fragmentShader, error, type } = _getWebGLProgram(gl, vertexSrc, fragmentSrc);

    if (error) {
        throw new Error(`${type} error:: ${error}`);
    }

    // setup the vertex data
    const attributes = _initVertexAttributes(gl, program, data.attributes);

    // setup uniforms
    const uniforms = _initUniforms(gl, program, data.uniforms);

    return {
        program,
        vertexShader,
        fragmentShader,
        source,
        attributes,
        uniforms,
        textures: data.textures
    };
}

function _mergeEffectsData(effects) {
    return effects.reduce((result, config) => {
        const { attributes = [], uniforms = [], textures = [], varying = {} } = config;
        const merge = shader => Object.keys(config[shader]).forEach(key => {
            if (key === 'constant' || key === 'main') {
                result[shader][key] += config[shader][key] + '\n';
            }
            else {
                result[shader][key] = { ...result[shader][key], ...config[shader][key] };
            }
        });

        merge('vertexSrc');
        merge('fragmentSrc');

        attributes.forEach(attribute => {
            const found = result.attributes.some((attr, n) => {
                if (attr.name === attribute.name) {
                    Object.assign(attr, attribute);
                    return true;
                }
            });

            if (!found) {
                result.attributes.push(attribute);
            }
        });

        result.uniforms.push(...uniforms);
        result.textures.push(...textures);

        Object.assign(result.vertexSrc.varying, varying);
        Object.assign(result.fragmentSrc.varying, varying);

        return result;
    }, {
        vertexSrc: {
            uniform: {},
            attribute: {},
            varying: {},
            constant: '',
            main: ''
        },
        fragmentSrc: {
            uniform: {},
            varying: {},
            constant: '',
            main: ''
        },
        /*
         * Default attributes
         */
        attributes: [
            {
                name: 'a_position',
                data: new Float32Array([
                    -1.0, -1.0,
                    -1.0, 1.0,
                    1.0, -1.0,
                    1.0, 1.0]),
                size: 2,
                type: 'FLOAT'
            },
            {
                name: 'a_texCoord',
                data: new Float32Array([
                    0.0, 0.0,
                    0.0, 1.0,
                    1.0, 0.0,
                    1.0, 1.0]),
                size: 2,
                type: 'FLOAT'
            }
        ],
        /*
         * Default uniforms
         */
        uniforms: [
            {
                name: 'u_source',
                size: 1,
                type: 'i',
                data: [0]
            }
        ],
        /*
         * Default textures
         */
        textures: []
    });
}

function _stringifyShaderSrc(data, template) {
    const templateData = Object.entries(data)
        .reduce((result, [key, value]) => {
            if (['uniform', 'attribute', 'varying'].includes(key)) {
                result[key] = Object.entries(value)
                    .reduce((str, [name, type]) =>
                        str + `${key} ${type} ${name};\n`,
                        ''
                    );
            }
            else {
                result[key] = value;
            }

            return result;
        }, {});

    return template(templateData);
}

function _getWebGLProgram(gl, vertexSrc, fragmentSrc) {
    const vertexShader = _createShader(gl, gl.VERTEX_SHADER, vertexSrc);
    const fragmentShader = _createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

    if (vertexShader.error) {
        return vertexShader;
    }

    if (fragmentShader.error) {
        return fragmentShader;
    }

    return _createProgram(gl, vertexShader, fragmentShader);
}

function _createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
        return { program, vertexShader, fragmentShader };
    }

    const exception = {
        error: gl.getProgramInfoLog(program),
        type: 'program'
    };

    gl.deleteProgram(program);

    return exception;
}

function _createShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        return shader;
    }

    const exception = {
        error: gl.getShaderInfoLog(shader),
        type: type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT'
    };

    gl.deleteShader(shader);

    return exception;
}

/**
 * Create a WebGLTexture object.
 *
 * @private
 * @param {WebGLRenderingContext} gl
 * @param {number} width
 * @param {number} height
 * @param {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} data
 * @param {string} format
 * @return {{texture: WebGLTexture, width: number, height: number}}
 */
function createTexture(gl, { width = 1, height = 1, data = null, format = 'RGBA' } = {}) {
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    if (data) {
        // Upload the image into the texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl[format], gl[format], gl.UNSIGNED_BYTE, data);
    }
    else {
        // Create empty texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl[format], width, height, 0, gl[format], gl.UNSIGNED_BYTE, null);
    }

    return { texture, width, height };
}

function _createBuffer(gl, program, name, data) {
    const location = gl.getAttribLocation(program, name);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return { location, buffer };
}

function _initVertexAttributes(gl, program, data) {
    return (data || []).map(attr => {
        const { location, buffer } = _createBuffer(gl, program, attr.name, attr.data);

        return {
            name: attr.name,
            location,
            buffer,
            type: attr.type,
            size: attr.size
        };
    });
}

function _initUniforms(gl, program, uniforms) {
    return (uniforms || []).map(uniform => {
        const location = gl.getUniformLocation(program, uniform.name);

        return {
            location,
            size: uniform.size,
            type: uniform.type,
            data: uniform.data
        };
    });
}

function _setUniforms(gl, uniformData) {
    (uniformData || []).forEach(uniform => {
        const { size, type, location, data } = uniform;

        gl[`uniform${size}${type}v`](location, data);
    });
}

function _enableVertexAttributes(gl, attributes) {
    (attributes || []).forEach(attrib => {
        const { location, buffer, size, type } = attrib;

        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl[type], false, 0, 0);
    });
}


/**
 * @private
 * @typedef {Object} kamposSceneData
 * @property {WebGLProgram} program
 * @property {WebGLShader} vertexShader
 * @property {WebGLShader} fragmentShader
 * @property {kamposTarget} source
 * @property {kamposAttribute[]} attributes
 *
 * @typedef {Object} kamposTarget
 * @property {WebGLTexture} texture
 * @property {WebGLFramebuffer|null} buffer
 * @property {number} [width]
 * @property {number} [height]
 *
 * @typedef {Object} kamposAttribute
 * @property {string} name
 * @property {GLint} location
 * @property {WebGLBuffer} buffer
 * @property {string} type
   @property {number} size
 */