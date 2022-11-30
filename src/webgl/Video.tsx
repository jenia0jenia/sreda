
import VideoClass from "../classes/video-class";
function waitingCanvas() {
    const canvas = document.getElementById("video");
    if (!canvas) {
        setTimeout(waitingCanvas, 1000);
        return;
    }

    const video = new VideoClass({
        video: "video",
    });
}

waitingCanvas();

export default function Video() {
    return (
        <>
        <div className="page">
            <div className="content">
                <div id="video-place" className="video-place">
                    <div className="video-voice"></div>
                    <video
                        style={{ visibility: "hidden" }}
                        id="video"
                        loop
                        muted
                    >
                        <source src={require("../media/video/z.mp4")} type="video/mp4" />
                        <source src={require("../media/video/z.webm")} type="video/webm" />
                        <source src={require("../media/video/z.ogv")} type="video/ogg" />
                    </video>
                </div>
            </div>
        </div>
        </>
    );
}
