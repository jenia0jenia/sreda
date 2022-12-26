// import BubbleWords from "../components/BubbleWords";
import icons from "../ContactsIcons";

import Monstera from "../assets/img/svg/monstera.svg"
import Oil from "../assets/img/svg/oil.svg"
import Oil2 from "../assets/img/svg/oil_2.svg"
import { useEffect } from "react";


export default function Massage() {
    useEffect(() => {
        document.body.classList.add('massage-page')

        return () => {
            document.body.classList.remove('massage-page')
        }
    }, [])
    return (
        <>
            <img className="Monstera_svg" src={Monstera} alt="Монстера Эскилето" />
            <img className="Oil_svg" src={Oil} alt="Массажное масло Yves Rocher" />
            <img className="Oil2_svg" src={Oil2} alt="Массажное масло Yves Rocher" />

            <div className="main-body">
                <div className="page">
                    <div className="massage">
                        <div className="massage__block massage__block--z_and_a">
                            <img className="massage__img" src={require("../assets/img/png/z_and_a.png")} alt="Заура делает массаж Анне" />
                        </div>

                        <div className="massage__block massage__block--text-right">
                            <div className="contacts__container">
                                <div className="contacts">
                                    <a className="contacts__icon" href="tel:+79995884011">
                                        <img alt="phone" />
                                        <span>+7 (999) 588 - 40 - 11</span>
                                    </a>
                                    <div className="contacts__social">
                                        <a href="//www.instagram.com/massage_sreda/" className="contacts__icon" target="_blank" rel="noreferrer">
                                            <img src={icons.Instagram} alt="@massage_sreda" />
                                            {/* <span>@massage_sreda</span> */}
                                        </a>
                                        <a href="//t.me/SredaSteppe" className="contacts__icon" target="_blank" rel="noreferrer">
                                            <img src={icons.Telegram} alt="@SredaSteppe" />
                                            {/* <span>@SredaSteppe</span> */}
                                        </a>
                                        <a href="//vk.com/sreda_v_lodke_ne_schitaya_z" className="contacts__icon" target="_blank" rel="noreferrer">
                                            <img src={icons.VK} alt="@sreda_v_lodke_ne_schitaya_z" />
                                            {/* <span>@sreda_v_lodke_ne_schitaya_z</span> */}
                                        </a>
                                        <a href="/about/" className="contacts__icon">
                                            {/* <img alt="Zaura" src="" /> */}
                                            <span>обо мне</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="massage__block massage__block--text-left">
                            <div className="card__wrapper">
                                <div className="card__container">
                                    <div className="card">
                                        <div className="certificat">Сертификат</div>
                                        <div className="to">выдается <span className="u">тебе, моя хорошая</span></div>
                                        <div className="change-place__wrapper">
                                            на
                                            <span className="change-place">
                                                <span> курс массажа</span>
                                                <span> сеанс массажа</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="massage__block massage__block--z_from_top">
                            <img className="massage__img" src={require("../assets/img/png/z_from_top.png")} alt="Заура делает массаж Анне" />
                        </div>
                    </div>
                </div>

                {/* <Contacts /> */}
                {/* <BubbleWords></BubbleWords> */}

            </div>
        </>
    );
}
