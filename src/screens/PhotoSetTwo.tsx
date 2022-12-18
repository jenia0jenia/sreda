import { useEffect } from "react";
import { Photoset } from "../classes/animation";
const PhotoSetID = 'PhotoSetTwo'

const photoSetData = [
    require("../assets/media/photo/photoset_two/1.jpg"),
    require("../assets/media/photo/photoset_two/2.jpg"),
    require("../assets/media/photo/photoset_two/3.jpg"),
    require("../assets/media/photo/photoset_two/4.jpg"),
    require("../assets/media/photo/photoset_two/5.jpg"),
]

export default function PhotoSetTwo() {
    useEffect(() => {
        const photoset = new Photoset(PhotoSetID);
        return () => {
            photoset.destroy()
        }
    }, [])

    return (
        <>
            <div id="PhotoSetTwo" className="photoset__wrapper">
                <div className="photoset">
                    {photoSetData && photoSetData.map((photo, i) => {
                        return (
                            <div className="photoset__item" key={i}>
                                <img className="photoset__img" src={photo} alt={`массаж номер ${i}`} loading="lazy" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
