import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import BackGround from "../components/BackGround";
import intro from "../assets/media/video/intro.mp4";
import AlphaVideo from "../components/AlphaVideo";

import MouseMoveClass from "../classes/mouse-move-class"

const mouseId = "jelly-blob"

export default function Home() {
    useEffect(() => {
        // console.log("Home useEffect start");

        const mouse = document.getElementById(mouseId)

        if (mouse) {
            const randX = Math.floor(Math.random() * window.innerWidth)
            const randY = Math.floor(Math.random() * window.innerHeight)
            mouse.style.transform = `translate3D(${randX}px, ${randY}px, 0)`
        }

        const options = {
            id: mouseId
        }

        const cursor = new MouseMoveClass(options)

        return () => {
            // console.log("Home useEffect return");
            cursor.destroy()
        }
    }, []);


    return (
        <>
            <div className="jelly-blob" id={mouseId}></div>
            <div className="intro">
                <AlphaVideo src={intro} loop
                    id="intro"
                    preload="auto"
                    crossOrigin="anonymous"
                    muted
                    sound="true"
                    playsInline />
                <NavLink className="button button--left" to={"/massage"}>массаж</NavLink>
                <NavLink className="button button--right" to={"/about"}>обо мне</NavLink>
            </div>
            <BackGround></BackGround>
        </>
    );
}
