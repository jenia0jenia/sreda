import VideoWithAlpha from "../video-with-alpha";
import hands from "../assets/media/video/hands.mp4"

export default function Hands() {
    return (
        <div className="videohands videohands_one">
            <VideoWithAlpha src={hands} muted autoPlay loop />
        </div>
    );
}
