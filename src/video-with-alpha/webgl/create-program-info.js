function createProgramInfo(gl, shaderProgram) {
  return {
    program: shaderProgram,
    locations: {
      aVertexPosition: gl.getAttribLocation(shaderProgram, "a_VertexPosition"),
      aTextureCoord: gl.getAttribLocation(shaderProgram, "a_TextureCoord")
    }
  };
}

export { createProgramInfo };
