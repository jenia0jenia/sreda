import { useEffect } from "react"
import "./Monstera.scss"

export default function Monstera() {
    useEffect(() => {
        const monstera = document.querySelector('.monstera')

        if (!monstera) {
            return
        }

        monstera.classList.add('is-open')

        return () => {
            monstera.classList.remove('is-open')
        }
    }, [])

    return (
        <div className="monstera">
            <img className="monstera__plant" src={require("../../assets/img/png/monstera.png")} alt="" />
            <div className="monstera__zaura">
                <img className="monstera__zaura__img" src={require("../../assets/img/png/z_my_power_to_empower.png")} />
            </div>
        </div>
    );
}
