export class Photoset {
    constructor(readonly photesetID: string) {
        this.init();
    }

    init() {
        window.addEventListener("mousemove", this.translate);
    }

    translate = (event: any) => {
        const photosetWrapper = document.getElementById(this.photesetID);
        const photoset = photosetWrapper?.querySelector<HTMLElement>('.photoset');
        
        if (!photosetWrapper || !photoset) {
            return
        }
        
        if (event.target === photosetWrapper || event.target.closest('#' + this.photesetID)) {
            let fullWidth = 0;

            Array.from(photosetWrapper.children).forEach((element) => {
                fullWidth += element.clientWidth;
            });

            let factor = fullWidth / document.body.clientWidth / 2;

            if (window.innerWidth > 900) {
                let to =
                    (event.clientX / document.body.clientWidth) * 100 * factor;

                if (to > 100) {
                    to = 100;
                }

                if (to < 0) {
                    to = 0;
                }

                photoset.style.transform = `translate3d(${-to}vw, 0, 0)`;
            } else {
                photoset.style.transform = `translate3d(0, 0, 0)`;
            }
        } else {
            // photoset.style.transform = `translate3d(0, 0, 0)`;
        }
    }

    destroy() {
        window.removeEventListener("mousemove", this.translate);
    }
}
