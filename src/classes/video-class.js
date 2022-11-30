export default class VideoClass {
    constructor(options) {
        this.options = options;
        this.init();
        this.fps = 60;
        this.then = Date.now();
        this.interval = 1000 / this.fps;
    }

    init() {
        // let _t = this;
        // console.log("init");
        // console.log(this);
        
        this.alphaVideo = document.getElementById(this.options.video);
        // console.log(this.options);
        const videoPlace = document.querySelector("#video-place");
        const voiceButton = document.querySelector(".video-voice");
        const voiceDisabledClass = "voice-disabled";

        this.bufferCanvas = document.createElement("canvas");
        this.buffer = this.bufferCanvas.getContext("2d", {
            alpha: false,
            willReadFrequently: true,
        });

        this.outputCanvas = document.createElement("canvas");
        this.output = this.outputCanvas.getContext("2d");
        this.ratio = 0.5;
        this.playing = false;

        videoPlace.appendChild(this.outputCanvas);
        // videoPlace.appendChild(this.bufferCanvas);
        this.alphaVideo.style.display = "none";

        // Set width & height when the video metadata has loaded.
        this.alphaVideo.addEventListener("loadedmetadata", this.resize);

        /* ////////////////////////////////////////////////////////////////////////// */
        /* ////////////////////////////////////////////////////////////////////////// */

        // Whenever video starts playing, start the requestAnimationFrame loop.
        this.alphaVideo.addEventListener(
            "play",
            (event) => {
                this.playing = true;
                try {
                    this.maskVideo();
                } catch (e) {
                    console.error(e);
                    this.playing = false;
                }
            },
            false
        );

        // Update canvas whenever video is seeked. Not super applicable here, but could be helpful.
        // alphaVideo.addEventListener("seeked", processFrame);

        // When video ends or pauses, stop the requestAnimationFrame loop.
        var stopProcess = () => {
            this.processFrame(); // Make sure the mask is up to date.
            this.playing = false;
        };

        this.alphaVideo.addEventListener("ended", stopProcess);
        this.alphaVideo.addEventListener("pause", stopProcess);

        // Whenever the video has fully loaded, play it. Change this if needed.
        this.alphaVideo.addEventListener("canplaythrough", (event) => {
            this.alphaVideo.play();
            // console.log("playing");
        });

        // this.alphaVideo.addEventListener("canplay", (event) => {
        //     this.alphaVideo.play();
        //     console.log("playing");
        // });

        if (this.alphaVideo.readyState > 3) {
            this.alphaVideo.play();
        }

        videoPlace.addEventListener("click", (event) => {
            this.alphaVideo.muted = !this.alphaVideo.muted;
            voiceButton.classList.toggle(voiceDisabledClass);
        });
    }

    processFrame = () => {
        // let _t = this;
        // console.log("process frame");
        // console.log(this.width);
        if (!this.width) {
            this.resize();
            this.alphaVideo.play();
            return;
        }

        // Draw current video frame to the buffer canvas
        this.buffer.drawImage(
            this.alphaVideo,
            0,
            0,
            this.width,
            this.fullHeight,
            0,
            0,
            this.width * this.ratio,
            this.fullHeight * this.ratio
        );

        const image = this.buffer.getImageData(
            0,
            0,
            this.width * this.ratio,
            this.height * this.ratio
        ); // get ImageData of the top half

        const imageData = image.data; // get the array of pixels from that ImageData
        const alphaData = this.buffer.getImageData(
            0,
            this.height * this.ratio,
            this.width * this.ratio,
            this.height * this.ratio
        ).data; // get ImageData pixels of the bottom half

        // Every fourth value in ImageData arrays are the alpha values, so we apply the value from the bottom half mask.
        for (let i = 3, len = imageData.length; i < len; i = i + 4) {
            imageData[i] = alphaData[i - 1];
        }

        // Draw the image on the output canvas
        this.output.putImageData(image, 0, 0, 0, 0, this.width, this.height);
    };

    // While video is playing, update the canvas every frame
    maskVideo = () => {
        // let _t = this;
        if (this.playing) {
            requestAnimationFrame(this.maskVideo);

            let now = Date.now();
            let delta = now - this.then;

            if (delta > this.interval) {
                this.then = now - (delta % this.interval);
                this.processFrame();
            }
        }
    };

    resize = (event) => {
        // console.log("resize");
        this.width = this.alphaVideo.videoWidth;
        this.bufferCanvas.width = this.width * this.ratio;
        this.buffer.width = this.width * this.ratio;
        
        this.fullHeight = this.alphaVideo.videoHeight;
        this.bufferCanvas.height = this.fullHeight * this.ratio;
        this.buffer.height = this.fullHeight * this.ratio;
        
        this.height = this.fullHeight * this.ratio;
        this.outputCanvas.height = this.height * this.ratio;
        this.outputCanvas.width = this.width * this.ratio;
    };
}
