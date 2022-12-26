import { useEffect } from "react"
import "./style.scss"

export default function StoryTwo() {
    useEffect(() => {
        const monstera = document.querySelector('.StoryTwo')

        if (!monstera) {
            return
        }

        monstera.classList.add('is-open')

        return () => {
            monstera.classList.remove('is-open')
        }
    }, [])

    return (
        <div className="StoryTwo">
            <img className="StoryTwo__oil" src={require("../../assets/img/png/oil.png")} alt="масло Yves Rocher" />
            <div className="StoryTwo__zaura">
                <img className="StoryTwo__zaura__img" src={require("../../assets/img/png/z_my_power_to_empower.png")} />
            </div>
        </div>
    );
}
