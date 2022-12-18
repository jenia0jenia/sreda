function createBuffers(gl) {
  const positions = [1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1];
  const coords = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];

  function createArrayBuffer(array) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    return buffer;
  }

  return {
    position: createArrayBuffer(positions),
    textureCoord: createArrayBuffer(coords)
  };
}

export { createBuffers };
