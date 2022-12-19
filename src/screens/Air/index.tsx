import HandsTwo from "../../components/HandsTwo";
import "./Air.scss"

export default function About({ text = '', video = false }) {
    return (
        <>
            <div className="air air__overlay">
                <div className="container">
                    <span className="air__text">{text || 'Немного воздуха в лёгкие'}</span>
                </div>
                {video && <HandsTwo></HandsTwo>}
            </div>
        </>
    );
}
