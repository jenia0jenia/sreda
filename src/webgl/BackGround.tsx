import BackGroundClass, { vertex, fragment } from "./background-class";

function waitingCanvas() {
    const canvas = document.getElementById("background");
    if (!canvas) {
        setTimeout(waitingCanvas, 1000);
        return;
    }

    const bg = new BackGroundClass({
        canvas: "background",
        shaders: {
            vertex,
            fragment,
        },
    });
}

waitingCanvas();

export default function BackGround() {
    return (
        <>
            <canvas id="background" className="background-canvas"></canvas>
        </>
    );
}
