const vsSource = `
  attribute vec4 a_VertexPosition;
  attribute vec2 a_TextureCoord;

  varying vec2 v_TextureCoord;

  void main() {
    gl_Position = a_VertexPosition;
    v_TextureCoord = a_TextureCoord;
  }
`;

const fsSource = `
  precision lowp float;
  
  uniform sampler2D u_Image; 
  
  varying vec2 v_TextureCoord;
  
  void main() {
    gl_FragColor = vec4(
      texture2D(u_Image, vec2(v_TextureCoord.x, v_TextureCoord.y/2.)).rgb,
      texture2D(u_Image, vec2(v_TextureCoord.x, 0.5 + v_TextureCoord.y/2.)).r
    );
  }
`;

export { vsSource, fsSource };
