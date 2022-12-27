import hands from "../../assets/media/video/hands.mp4"
import AlphaVideo from "../AlphaVideo";
import "./style.scss"

export default function About({ text = '', video = false }) {
    return (
        <>
            <div className={`air air__overlay${video ? " video" : ""}`}>
                <div className="container">
                    <span className="large-text air__text" dangerouslySetInnerHTML={{ __html: text }}></span>
                </div>
                {video && 
                    <div className="videohands videohands_2">
                        <AlphaVideo src={hands} id="handsTwo" muted autoPlay loop playback="1.0" preload="none" />
                    </div>
                }
            </div>
        </>
    );
}
