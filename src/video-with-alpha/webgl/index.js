import { createShaderProgram } from "./create-shader-program";
import { vsSource, fsSource } from "./shader-sources";
import { createProgramInfo } from "./create-program-info";
import { createTexture } from "./create-texture";
import { updateTexture } from "./update-texture";
import { draw } from "./draw";

function webgl(canvas, video, alpha) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight / 2;
  const options = {
    premultipliedAlpha: alpha === "premultiplied" ? true : false
  };
  const gl =
    canvas.getContext("webgl", options) ||
    canvas.getContext("experimental-webgl");
  const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
  const programInfo = createProgramInfo(gl, shaderProgram);
  const texture = createTexture(gl);
  let previousTime = 0;

  // Clear the canvas.
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell webgl which shader to use.
  gl.useProgram(programInfo.program);

  function render() {
    if (video.currentTime !== previousTime) {
      updateTexture(gl, texture, video);
      draw(gl, programInfo, texture);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

export { webgl };
