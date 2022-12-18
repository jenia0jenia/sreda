import { useEffect } from "react";
import BackGroundClass, { vertex, fragment } from "../classes/background-class";

export default function BackGround() {
    useEffect(() => {
        const bg = new BackGroundClass({
            canvas: "background",
            shaders: {
                vertex,
                fragment,
            },
        });
    }, []);
    return (
        <>
            <canvas id="background" className="background-canvas"></canvas>
        </>
    );
}
