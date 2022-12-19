import hands from "../assets/media/video/hands.mp4"
import AlphaVideo from "./AlphaVideo";

export default function Hands() {
    return (
        <div className="videohands videohands_one">
            <AlphaVideo src={hands} id="hands" muted autoPlay loop />
        </div>
    );
}
