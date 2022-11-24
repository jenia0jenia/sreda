function init() {
    let alphaVideo = document.getElementById("video");

    if (!alphaVideo) {
        setTimeout(init, 1000);
        return;
    }

    var videoPlace = document.querySelector("#video-place");
    var voiceButton = document.querySelector(".video-voice");
    var voiceDisabledClass = "voice-disabled";

    var bufferCanvas = document.createElement("canvas"),
        buffer = bufferCanvas.getContext("2d", {
            alpha: false,
            willReadFrequently: true,
        }),
        outputCanvas = document.createElement("canvas"),
        output = outputCanvas.getContext("2d"),
        width,
        height,
        fullHeight,
        playing = false,
        ratio = 0.5;

    videoPlace.appendChild(outputCanvas);

    alphaVideo.style.display = "none";

    /* ////////////////////////////////////////////////////////////////////////// */

    function resize() {
        console.log("resize");
        width = alphaVideo.videoWidth;
        bufferCanvas.width = width * ratio;
        buffer.width = width * ratio;

        fullHeight = alphaVideo.videoHeight;
        bufferCanvas.height = fullHeight * ratio;
        buffer.height = fullHeight * ratio;

        height = fullHeight * ratio;
        outputCanvas.height = height * ratio;
        outputCanvas.width = width * ratio;
        // output.height = height * ratio;
        // output.width = width * ratio;
    }

    // Set width & height when the video metadata has loaded.
    alphaVideo.addEventListener("loadedmetadata", resize);

    /* ////////////////////////////////////////////////////////////////////////// */

    function processFrame() {
        if (!width) {
            resize();
            alphaVideo.play();
        }

        // Draw current video frame to the buffer canvas
        buffer.drawImage(
            alphaVideo,
            0,
            0,
            width,
            fullHeight,
            0,
            0,
            width * ratio,
            fullHeight * ratio
        );

        var image = buffer.getImageData(0, 0, width * ratio, height * ratio), // get ImageData of the top half
            imageData = image.data, // get the array of pixels from that ImageData
            alphaData = buffer.getImageData(
                0,
                height * ratio,
                width * ratio,
                height * ratio
            ).data; // get ImageData pixels of the bottom half

        // Every fourth value in ImageData arrays are the alpha values, so we apply the value from the bottom half mask.
        for (var i = 3, len = imageData.length; i < len; i = i + 4) {
            imageData[i] = alphaData[i - 1];
        }

        // Draw the image on the output canvas
        output.putImageData(image, 0, 0, 0, 0, width, height);
    }

    /* ////////////////////////////////////////////////////////////////////////// */

    var fps = 60;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;

    // While video is playing, update the canvas every frame
    function maskVideo() {
        if (playing) {
            requestAnimationFrame(maskVideo);

            now = Date.now();
            delta = now - then;

            if (delta > interval) {
                then = now - (delta % interval);
                processFrame();
            }
        }
    }

    // Whenever video starts playing, start the requestAnimationFrame loop.
    alphaVideo.addEventListener(
        "play",
        function () {
            playing = true;
            try {
                maskVideo();
            } catch (e) {
                console.error(e);
                playing = false;
            }
        },
        false
    );

    // Update canvas whenever video is seeked. Not super applicable here, but could be helpful.
    // alphaVideo.addEventListener("seeked", processFrame);

    // When video ends or pauses, stop the requestAnimationFrame loop.
    var stopProcess = function () {
        processFrame(); // Make sure the mask is up to date.
        playing = false;
    };

    alphaVideo.addEventListener("ended", stopProcess);
    alphaVideo.addEventListener("pause", stopProcess);

    // Whenever the video has fully loaded, play it. Change this if needed.
    alphaVideo.addEventListener("canplaythrough", () => {
        alphaVideo.play();
        console.log("playing");
    });

    videoPlace.addEventListener("click", function (event) {
        alphaVideo.muted = !alphaVideo.muted;
        voiceButton.classList.toggle(voiceDisabledClass);
    });

    // if (alphaVideo.readyState > 3) {
    //     startProcess();
    // }
}