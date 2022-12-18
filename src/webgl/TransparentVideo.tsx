import TransparentVideoClass from "../classes/transparent-video-class";

const player = new TransparentVideoClass({
    width: 320,
    height: 640,
    url: require("../media/video/z.mp4"),
    frameRate: 30
});


function playVideo() {
    // @ts-ignore
    player.media.play();
}

function toggleSound() {
    console.log(player.media);
    // @ts-ignore
    player.media.muted = !player.media.muted
}

export default function TransparentVideo() {
    return (
        <>
            <div ref={node => node?.appendChild(player.view)}></div>
            <button onClick={playVideo}>Старт</button>
            <button onClick={toggleSound}>Звук</button>
        </>
    );
}

