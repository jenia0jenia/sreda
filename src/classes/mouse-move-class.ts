import gsap from "gsap";

const pos = { x: 0, y: 0 };
const vel = { x: 0, y: 0 };
const offset = 20;

export default class MouseMoveClass {
    // Save pos and velocity Objects
    // Loop not Started Yet
    loopStarted = false;

    constructor(readonly options: { id: string }) {
        // window.addEventListener("mousemove", this.setFromEvent);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("touchmove", this.onTouchMove);
    }

    getScale(diffX: number, diffY: number) {
        const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        return Math.min(distance / 100, 0.25);
    }

    // Function For Mouse Movement Angle in Degrees
    getAngle(diffX: number, diffY: number) {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
    }

    onMouseMove = (e: any) => {
        const x = e.clientX;
        const y = e.clientY;
        
        this.setFromEvent(x, y);
    }
    
    onTouchMove = (e: any) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        this.setFromEvent(x, y);
    }

    // Caluclate Everything Function
    setFromEvent = (x: number, y: number) => {
        // console.log('mousemove ->');

        // Mouse X and Y
        // const x = e.clientX;
        // const y = e.clientY;
        // console.log(x, y);

        // Animate Pos Object and calculate Vel Object Velocity
        gsap.to(pos, {
            x,
            y,
            ease: "expo.out",
            duration: 0.3,
            onUpdate: () => {
                vel.x = x - pos.x;
                vel.y = y - pos.y;
            },
        });

        // Start loop
        if (!this.loopStarted) {
            this.loop();
            // this.loopStarted = true;
        }
    };

    // Start Animation loop
    loop = () => {
        // console.log("loop");
        const shape = document.getElementById(this.options.id);
        // console.log(shape);

        // const text = document.querySelector(".inside-text");

        // Calculate angle and scale based on velocity
        var rotation = this.getAngle(vel.x, vel.y);
        var scale = this.getScale(vel.x, vel.y);

        // Set transform data to Jelly Blob
        gsap.to(shape, {
            x: pos.x - offset,
            y: pos.y - offset,
            rotation: rotation + "_short",
            scaleX: 1 + scale,
            scaleY: 1 - scale,
        });

        // gsap.to(text, {
        //     rotation: -rotation + "_short",
        // });

        // Animation Frame for Loop Function
        if (this.loopStarted) {
            console.log(this.loopStarted);
            requestAnimationFrame(this.loop);
        }
    };

    destroy = () => {
        // console.log("destroy");
        // window.removeEventListener("mousemove", this.setFromEvent);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("touchmove", this.onTouchMove);
        this.loopStarted = false;
    };
}
