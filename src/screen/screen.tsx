import { ScreenText } from "../interfaces";

export default function Screen(props: ScreenText) {
    return (
        <div
            className={`sreda-screen sreda-screen--${props.id}`}
            id={props.id}
            style={{
                backgroundImage: `url("${require("../media/photo/" +
                    props.image)}")`,
            }}
        >
            <div className="sreda-screen__overlay">
                <div className="content">
                    <h1 className="sreda-screen__title sreda-screen__text">
                        {props.title}
                    </h1>
                    <div className="sreda-screen__desc sreda-screen__text">
                        {props.desc}
                    </div>
                </div>
            </div>
        </div>
    );
}
