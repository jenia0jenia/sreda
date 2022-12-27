import { useEffect } from "react";
import { Photoset } from "../classes/animation";
import Figure from "../components/Figure";
const PhotoSetID = 'PhotoSet'

const photoSetData = [
    require("../assets/media/photo/photoset/1.jpg"),
    require("../assets/media/photo/photoset/2.jpg"),
    require("../assets/media/photo/photoset/3.jpg"),
    require("../assets/media/photo/photoset/4.jpg"),
    require("../assets/media/photo/photoset/5.jpg"),
]

export default function PhotoSet() {
    useEffect(() => {
        const photoset = new Photoset(PhotoSetID);
        return () => {
            photoset.destroy()
        }
    }, [])

    return (
        <>
            <div id={PhotoSetID} className="photoset__wrapper">
                <div className="photoset">
                    {photoSetData && photoSetData.map((photo, i) => {
                        return (
                            <div className="photoset__item" key={i}>
                                <img className="photoset__img" src={photo} alt={`массаж номер ${i}`} loading="lazy" />
                            </div>
                        )
                    })}
                    <div className="photoset__item">
                        <video className="photoset__img" loop muted autoPlay preload="none">
                            <source
                                src={require("../assets/media/video/back.mp4")}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </div>
            <Figure></Figure>
        </>
    );
}
