import HandsTwo from "../HandsTwo";
import "./Air.scss"

export default function About({ text = '', video = false }) {
    return (
        <>
            <div className="air air__overlay">
                <div className="container">
                    <span className="large-text air__text">{text || 'Немного воздуха в лёгкие'}</span>
                </div>
                {video && <HandsTwo></HandsTwo>}
            </div>
        </>
    );
}
