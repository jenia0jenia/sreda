import { createShader } from "./create-shader";

function createShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  const success = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);

  if (success) {
    return shaderProgram;
  }

  console.warn(gl.getProgramInfoLog(shaderProgram)); // eslint-disable-line no-console
  gl.deleteProgram(shaderProgram);
}

export { createShaderProgram };
