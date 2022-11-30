const photoSetData = [
    require("../media/photo/photoset/1.jpg"),
    require("../media/photo/photoset/2.jpg"),
    require("../media/photo/photoset/3.jpg"),
    require("../media/photo/photoset/4.jpg"),
    require("../media/photo/photoset/5.jpg"),
]

export default function PhotoSet() {
    return (
        <>
            <div className="photo-set__wrapper" onMouseMove={(event: any) => {
                const photoSet = document.getElementById('PhotoSet')!
                const photos = photoSet.querySelectorAll<HTMLElement>('img.photo-set__img')
                photoSet.style.transform = `translate3d(${-event.clientX / document.body.clientWidth * 100}vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
                photos.forEach((elem, i) => {
                    // elem.style.filter = `contrast(${100 + event.clientX / document.body.clientWidth * 100}%)`
                    elem.style.filter = `sepia(${100 - event.clientX / document.body.clientWidth * 100}%)`
                })
            }}>
                <div id="PhotoSet" className="photo-set">
                    {photoSetData && photoSetData.map((photo, i) => {
                        return (
                            <div className="photo-set__item" key={i} /*style={{filter: `invert(${100 - 20 * i}%)`}}*/>
                                <img className="photo-set__img" src={photo} alt={`массаж номер ${i}`} onMouseMove={(event) => {
                                    // console.log(event);

                                    // const photos = Array(5).fill(document.querySelectorAll('img.photo-set__img'))
                                    // console.log(photos);

                                    // photos.forEach((elem, i) => {
                                    //     elem.style.filter = `invert(${event.clientX / document.body.clientWidth * 100}%)`
                                    // })
                                }} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
