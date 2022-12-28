import "./style.scss";
import body from "../../assets/img/svg/body.svg";

export default function Figure() {
    return (
        <>
            {/* <div className="figure"> */}
                {/* <div className="figure__textplace">
                    <span className="figure__text large-text">Что будем делать? Определиться с массажем и техникой. Обычно первый сеанс – это обсуждение и общий лимфодренажный тире классический массаж тела.</span>
                </div> */}
                <img className="figure__img" loading="lazy" src={body} alt="Фигура" />
            {/* </div> */}
        </>
    );
}
