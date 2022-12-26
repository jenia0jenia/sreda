import "./Rocket.scss"

export default function Rocket() {
    return (
        <div className="Rocket">
            <div className="Rocket__zaura">
                <img className="Rocket__zaura__img" src={require("../../assets/img/png/z_rocket.png")} alt="Заура ракета" />
            </div>
        </div>
    );
}
