import "./Figure.scss";

export default function Figure() {
    return (
        <>
            <div className="content">
                <div className="figure">
                    <div className="figure__textplace">
                        <span className="figure__text large-text">Что будем делать? Определиться с массажем и техникой. Обычно первый сеанс – это обсуждение и общий лимфодренажный тире классический массаж тела.</span>
                    </div>
                    <img className="figure__img" src={require("../../assets/img/body.png")} alt="Фигура" />
                </div>
            </div>
        </>
    );
}
