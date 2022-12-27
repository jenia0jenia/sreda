import { useEffect } from "react"
import "./style.scss"

export default function StoryTwo() {
    useEffect(() => {

        const StoryTwo = document.getElementById('StoryTwo')
        const nimb1 = document.getElementById('nimb1')!
        
        if (!StoryTwo || !nimb1)
            return;

        const width = StoryTwo.offsetWidth
        const height = StoryTwo.offsetHeight
        
        StoryTwo.addEventListener("mousemove", nimb)
        
        function nimb(e: any) {
            const x = (width - e.clientX) / width * 255;
            const y = (height - e.clientY) / height * 255;
            nimb1.style.background = `rgba(255, ${x}, ${y})`
        }

        return () => {
            StoryTwo.removeEventListener("mousemove", nimb)
        }

    }, [])

    return (
        <>
            <div className="StoryTwo" id="StoryTwo">
                {/* <img className="StoryTwo__oil" src={require("../../assets/img/png/oil.png")} alt="масло Yves Rocher" /> */}
                <div className="StoryTwo__zaura">
                    <div className="StoryTwo__zaura__nimb StoryTwo__zaura__nimb--gold" id="nimb1"></div>
                    {/* <div className="StoryTwo__zaura__nimb StoryTwo__zaura__nimb--white" id="nimb2"></div>
                    <div className="StoryTwo__zaura__nimb StoryTwo__zaura__nimb--black" id="nimb3"></div> */}
                    <img className="StoryTwo__zaura__img" src={require("../../assets/img/png/z_my_power_to_empower.png")} alt="Заура сила наделять силой" />
                </div>
            </div>
        </>
    );
}
