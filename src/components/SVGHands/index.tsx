import { useEffect } from "react"
import "./style.scss"
import image from "../../assets/img/svg/hands.svg"
import hands from "../../assets/media/video/hands.mp4"
import AlphaVideo from "../AlphaVideo";


export default function SVGHands() {
    useEffect(() => {
        const mainbody = document.querySelector<HTMLElement>('.main')
        const img = document.querySelector<HTMLElement>(".SVGHands__img")
        if (!img || !mainbody) {
            return
        }
        let factor = 1.0;
        let width = 333

        img.addEventListener("click", (event) => {
            console.log(img.style.width);
            img.style.width = width * factor + "px";
            factor += 0.1
        })
    }, [])
    return (
        <>
            <div className="SVGHands">
                <img className="SVGHands__img" src={image} alt="Руки Зауры" />
                <div className="videohands">
                    {/* <AlphaVideo src={hands} id="hands" muted autoPlay loop /> */}
                </div>
            </div>

        </>
    );
}
