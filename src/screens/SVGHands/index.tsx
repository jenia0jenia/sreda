import { useEffect } from "react"
import "./SVGHands.scss"
import Hands from "../../assets/img/png/hands.svg"

export default function SVGHands() {
    useEffect(() => {
        const mainbody = document.querySelector<HTMLElement>('.main')
        const img = document.querySelector<HTMLElement>(".SVGHands__img")
        if (!img || !mainbody) {
            return
        }
        let factor = 1.0;

        mainbody.addEventListener("wheel", (event) => {
            console.log('document');
            console.log(mainbody.offsetHeight);
            console.log(mainbody.scrollTop);
            console.log(mainbody.scrollHeight);
            if (mainbody.offsetHeight + mainbody.scrollTop >= mainbody.scrollHeight) {
                
                img.style.transform = `translateX(-50%) scale(${factor})`;
                factor += 0.1
            }
        })
    }, [])
    return (
        <div className="SVGHands">
            <img className="SVGHands__img" src={Hands} />
        </div>
    );
}
