import { useEffect } from "react";
import "./style.scss"
import hands from  "../../assets/img/svg/hands.svg"

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
            <h1 className="hello__speach">Привет! Я Заура́. Человек и массажист</h1>
            <img className="hello__lump" src={require("../../assets/img/png/turn-off.png")} alt="Лампа выкл" />
            <img className="hello__lump" src={require("../../assets/img/png/turn-on.png")} alt="Лампа вкл" />
            {/* <img src={require("../../assets/img/png/prayer_hands.png")} alt="Дюрер. Молящиеся руки" className="hello__prayerhands" /> */}

            <div className="hello__zaura">
                <div className="hello__phone">
                    <img className="hello__phone__img" src={require("../../assets/img/png/phone_border.png")} alt="Телефон Зауры" />
                    <img className="hello__phone__gif hello__phone__gif--cover" src={hands} alt="Логотип Зауры" />
                    <img className="hello__phone__gif hello__phone__gif--anim" loading="lazy" src={require("../../assets/media/a.gif")} alt="Инстаграм Зауры" />
                    {/* <div className="hello__phone__gif">sreda massage</div> */}
                </div>
                <img className="hello__plant" loading="lazy" src={require("../../assets/img/png/monstera.png")} alt="Монстера Эскилето" />
                <img className="hello__zaura__img" src={require("../../assets/img/png/z_in_the_sky.png")} alt="Заура смотрит в небо" />
            </div>
        </div>
    );
}
