import { NavLink } from "react-router-dom";
import intro from "../assets/media/video/intro.mp4";
import AlphaVideo from "../components/AlphaVideo";

export default function Intro() {

    return (
        <div className="intro">
            <AlphaVideo src={intro} loop
                id="intro"
                preload="auto"
                crossOrigin="anonymous"
                muted
                playsInline />
            <NavLink className="button button--left" to={"/massage"}>массаж</NavLink>
            <NavLink className="button button--right" to={"/about"}>обо мне</NavLink>
        </div>
    );
}
