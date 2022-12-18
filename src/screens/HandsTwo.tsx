import VideoWithAlpha from "../video-with-alpha";
import hands from "../assets/media/video/hands.mp4"

export default function HandsTwo() {
    return (
        <div className="videohands videohands_2">
            <VideoWithAlpha src={hands} muted autoPlay loop playback="1.4" />
        </div>
    );
}
