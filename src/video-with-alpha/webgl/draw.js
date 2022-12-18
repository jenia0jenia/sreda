function draw(gl, programInfo, texture) {
  // Clear the canvas.
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell webgl which shader to use.
  gl.useProgram(programInfo.program);

  // Set vertex positions.
  const positions = [1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1];
  const positionsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(programInfo.locations.aVertexPosition);
  gl.vertexAttribPointer(
    programInfo.locations.aVertexPosition,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  // Set texture coordinates.
  const textureCoords = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1];
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoords),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(programInfo.locations.aTextureCoord);
  gl.vertexAttribPointer(
    programInfo.locations.aTextureCoord,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindTexture(gl.TEXTURE_2D, texture);

  // (primitiveType, offset, count).
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export { draw };
