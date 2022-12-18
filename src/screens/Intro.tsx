import VideoWithAlpha from "../video-with-alpha";
import { NavLink } from "react-router-dom";

import intro from "../assets/media/video/intro.mp4";

export default function Intro() {
    return (
        <div className="video-place__wrapper">
            <VideoWithAlpha src={intro} muted autoPlay loop />
            <NavLink className="button button--left" to={"/massage"}>массаж</NavLink>
            <NavLink className="button button--right" to={"/about"}>обо мне</NavLink>
        </div>
    );
}
