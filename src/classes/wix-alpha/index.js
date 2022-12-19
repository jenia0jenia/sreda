import transparentVideo from './transparentVideo';

import Kampos from './kampos.js';
import Ticker from './ticker.js';

const MAX_WIDTH = 854;

export default class WixAlphaClass {
  constructor(targetSelector, mediaSelector) {
    const KAMPOS = {
      effects: {
        alphaMask: this.alphaMask
      },
      Kampos,
      Ticker
    };

    const { Kampos: Kampos$1 } = KAMPOS;

    this.target = document.querySelector(targetSelector);
    this.media = document.querySelector(mediaSelector);
    this.fx = [transparentVideo()];
    this.kampos = new Kampos$1({ target: this.target, effects: this.fx });
    this.fxEnabled = true;
    this.media.addEventListener('canplay', this.canPlay, { once: true });
  }


  alphaMask() {
    return {
      vertexSrc: {
        attribute: {
          a_alphaMaskTexCoord: 'vec2'
        },
        main: `
        v_alphaMaskTexCoord = a_alphaMaskTexCoord;`
      },
      fragmentSrc: {
        uniform: {
          u_alphaMaskEnabled: 'bool',
          u_mask: 'sampler2D'
        },
        main: `
          if (u_alphaMaskEnabled) {
              alpha *= texture2D(u_mask, v_alphaMaskTexCoord).a;
          }`
      },
      get disabled() {
        return !this.uniforms[0].data;
      },
      set disabled(b) {
        return this.uniforms[0].data[0] = +!b;
      },
      varying: {
        v_alphaMaskTexCoord: 'vec2'
      },
      uniforms: [
        {
          name: 'u_alphaMaskEnabled',
          size: 1,
          type: 'i',
          data: [1]
        },
        {
          name: 'u_mask',
          size: 1,
          type: 'i',
          data: [1]
        }
      ],
      attributes: [
        {
          name: 'a_alphaMaskTexCoord',
          data: new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0]),
          size: 2,
          type: 'FLOAT'
        }
      ],
      textures: [
        {
          format: 'ALPHA'
        }
      ]
    };
  }

  scaleCanvas() {
    const width = Math.min(MAX_WIDTH, this.media.videoWidth);
    const height = this.media.videoHeight / 2 / this.media.videoWidth * width;

    this.target.style.width = width;
    this.target.style.height = height;
  }

  draw() {
    const width = this.media.videoWidth;
    const height = this.media.videoHeight / 2;

    this.scaleCanvas();

    this.kampos.setSource({ media: this.media, width, height });

    this.kampos.draw();
  }

  play() {
    this.media.play();

    const width = this.media.videoWidth;
    const height = this.media.videoHeight / 2;

    this.scaleCanvas();

    this.kampos.setSource({ media: this.media, width, height });

    this.kampos.play();

    (this.fxEnabled ? this.target : this.media).classList.remove('hide');
  }

  canPlay = () => {
    this.play();
    this.draw();
  }
}
