import { useEffect } from "react";
import "./Hello.scss"

export default function Hello() {
    useEffect(() => {
        const hello = document.querySelector('.hello')

        if (!hello) {
            return
        }

        hello.classList.add('is-open')

        return () => {
            hello.classList.remove('is-open')
        }
    }, [])

    return (
        <div className="hello">
            <img className="hello__lump" src={require("../../assets/img/png/turn-off.png")} alt="" />
            <img className="hello__lump" src={require("../../assets/img/png/turn-on.png")} alt="" />
            <img className="hello__declaration" src={require("../../assets/img/png/declaration.png")} alt="" />
            {/* <img className="hello__lump" src={require("../../assets/img/png/turn-on-two.png")} alt="" /> */}
            <img src={require("../../assets/img/png/prayer_hands.png")} alt="" className="hello__prayerhands" />
            {/* <img src={require("../../assets/img/png/declaration.png")} alt="" className="hello__declaration" /> */}

            <div className="hello__zaura">
                <img className="hello__zaura__img" src={require("../../assets/img/png/z_in_the_sky.png")} />
            </div>
        </div>
    );
}
