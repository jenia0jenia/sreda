import Intro from "../screens/Intro";
import BackGround from "../webgl/BackGround";

import MouseMoveClass from "../classes/mouse-move-class"
import { useEffect } from "react";

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
            <Intro></Intro>
            {/* <TransparentVideo></TransparentVideo> */}
            <BackGround></BackGround>
        </>
    );
}
