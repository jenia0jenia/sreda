// Template pen without animations: https://codepen.io/sfi0zy/pen/zYoxdbw

const UNIFORMS = Object.freeze({
    canvas_height: "u_canvas_height",
    canvas_width: "u_canvas_width",
    time: "u_time",
    mouse_x: "u_mouse_x",
    mouse_y: "u_mouse_y",
});

const DEFAULT_UNIFORM_VALUES = Object.freeze({
    u_canvas_height: 1,
    u_canvas_width: 1,
    u_time: 0,
    u_mouse_x: window.innerWidth / 2,
    u_mouse_y: window.innerHeight / 2,
});

export default class BackGroundClass {
    constructor(options) {
        this.options = options;
        this.canvas = document.getElementById(options.canvas);
        this.gl = this.canvas.getContext("webgl");
        this.program = null;
        this.uniforms = {};

        this.clearCanvas();
        this.createPlane();
        this.createProgram();

        for (const uniform in UNIFORMS) {
            this.setUniform(
                UNIFORMS[uniform],
                DEFAULT_UNIFORM_VALUES[UNIFORMS[uniform]]
            );
        }

        this.onResize();
        this.initEventListeners();
        this.draw();
    }

    clearCanvas() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    createPlane() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]),
            this.gl.STATIC_DRAW
        );
    }

    createProgram() {
        const shaders = this.getShaders();

        this.program = this.gl.createProgram();

        this.gl.attachShader(this.program, shaders.vertex);
        this.gl.attachShader(this.program, shaders.fragment);
        this.gl.linkProgram(this.program);

        const vertexPositionAttribute = this.gl.getAttribLocation(
            this.program,
            "a_position"
        );

        this.gl.enableVertexAttribArray(vertexPositionAttribute);
        this.gl.vertexAttribPointer(
            vertexPositionAttribute,
            2,
            this.gl.FLOAT,
            false,
            0,
            0
        );

        this.gl.useProgram(this.program);
    }

    getShaders() {
        return {
            vertex: this.compileShader(
                this.gl.VERTEX_SHADER,
                this.options.shaders.vertex
            ),
            fragment: this.compileShader(
                this.gl.FRAGMENT_SHADER,
                this.options.shaders.fragment
            ),
        };
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        // console.log(this.gl.getShaderInfoLog(shader));

        return shader;
    }

    setUniform(name, value) {
        this.gl.uniform1f(
            this.gl.getUniformLocation(this.program, name),
            value
        );

        this.uniforms[name] = value;
    }

    onResize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.setUniform(UNIFORMS.canvas_height, this.canvas.height);
        this.setUniform(UNIFORMS.canvas_width, this.canvas.width);
    }

    onMouseMove(e) {
        this.setUniform(UNIFORMS.mouse_x, e.clientX);
        this.setUniform(UNIFORMS.mouse_y, e.clientY);
    }

    onTouchMove(e) {
        this.setUniform(UNIFORMS.mouse_x, e.touches[0].clientX);
        this.setUniform(UNIFORMS.mouse_y, e.touches[0].clientY);
    }

    initEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));

        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("touchmove", this.onTouchMove.bind(this));
    }

    draw(timeStamp) {
        this.setUniform(UNIFORMS.time, timeStamp / 1000.0);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(this.draw.bind(this));
    }
}

export const vertex = `
    precision highp float;

    attribute vec2 a_position;

    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

export const fragment = `
    precision highp float;
    
    #define GREEN vec4(0.4, 0.8, 0.5, 1.0);
    #define WHITE vec4(1.0, 1.0, 1.0, 1.0);
    #define BLACK vec4(0.0, 0.0, 0.0, 1.0);

    uniform float u_canvas_height;
    uniform float u_canvas_width;
    uniform float u_time;
    uniform float u_mouse_x;
    uniform float u_mouse_y;
    
    
    void draw_texture();

    
    void main() {
        draw_texture();
    }

    
    void draw_texture() {
        gl_FragColor = GREEN;
        
        vec2 uv = vec2(
            gl_FragCoord.x / u_canvas_width,
            gl_FragCoord.y / u_canvas_height
        );
        
        float dx = abs(u_mouse_x - gl_FragCoord.x);
        float dy = abs(u_canvas_height - gl_FragCoord.y - u_mouse_y);
        float r2 = dx * dx + dy * dy;
        
        bool is_in_cursor = (r2 < 200.0);
        
        if (is_in_cursor) {
            gl_FragColor = BLACK;
            return;
        }
        
        float sin_1 = sin(uv.y + u_time);
        float sin_2 = sin(uv.y + u_time);
        float modifier = 0.5 * r2 / min(u_canvas_height, u_canvas_width);
        float translate_x = 0.1;
        
        float line_path_x = (sin_1 + sin_2) / modifier + translate_x;
                
        for (int line_number = 0; line_number < 9; line_number++) {
            bool is_in_line =
                   (uv.x > line_path_x - 0.02)
                && (uv.x < line_path_x + 0.02);
            
            if (is_in_line) {
                gl_FragColor = WHITE;
            }
            
            line_path_x += translate_x;
        }
    }
`;

// const example = new BackGroundClass({
//     canvas: 'canvas',
//     shaders: {
//         vertex,
//         fragment
//     }
// });
