import { useEffect } from "react"
import "./style.scss"

export default function StoryThree() {
    useEffect(() => {
    }, [])

    return (
        <>
            <div className="StoryThree" id="StoryThree">
                {/* <img className="StoryThree__oil" src={require("../../assets/img/png/oil.png")} alt="масло Yves Rocher" /> */}
                <div className="StoryThree__zaura">
                    <div className="StoryThree__zaura__nimb StoryThree__zaura__nimb--gold" id="nimb1"></div>
                    {/* <div className="StoryThree__zaura__nimb StoryThree__zaura__nimb--white" id="nimb2"></div>
                    <div className="StoryThree__zaura__nimb StoryThree__zaura__nimb--black" id="nimb3"></div> */}
                    <img className="StoryThree__zaura__img" loading="lazy"  src={require("../../assets/img/png/z_my_power_to_empower.png")} alt="Заура супервуман" />
                </div>
            </div>
        </>
    );
}
