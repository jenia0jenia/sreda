import hands from "../assets/media/video/hands.mp4"
import AlphaVideo from "./AlphaVideo";

export default function HandsTwo() {

    return (
        <div className="videohands videohands_2">
            <AlphaVideo src={hands} id="handsTwo" muted autoPlay loop playback="1.0" />
        </div>
    );
}
