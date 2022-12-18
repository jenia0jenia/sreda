import { IBubble } from "../interfaces"
import gsap from "gsap";

const words = [
    "массаж",
    "среда",
    "вдох",
    "выдох",
    "люби",
    "живи",
    "чувствуй",
    "тело",
    "мышцы",
    "осанка",
    '<a target="_blank" href="https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D1%81%D1%86%D0%B8%D1%8F">фасции</a>',
    "точки",
    "зажим",
    "расслабление",
    "выходи за границы",
];

const colors = [
    "#fff5cc", "#e6c8fe", "#b7fdda", "#ffd0bf", "#ffb8d2", "#cea4e4"
]

let pad = 6;
let minWidth = 90;
let maxWidth = 90;
let bubbleHeight = 90;

// let elastic = Elastic.easeOut.config(0.3, 0.3);

export default class BubbleWordsClass {
    bubbles: IBubble[] = [];
    wrapper: HTMLElement
    vw: number
    vh: number
    options: {
        color: string
    }

    constructor(wrapper: HTMLElement) {
        window.addEventListener("resize", this.resize);
        this.vw = wrapper.clientWidth
        this.vh = wrapper.clientHeight
        this.wrapper = wrapper

        this.options = {
            color: "#401e01"
        }
    }

    placeBubble = (bubble: IBubble) => {
        // console.log(this);

        bubble.placed = true;
        bubble.width = this.randomInt(minWidth, maxWidth);
        bubble.left = this.randomInt(pad, this.vw - (bubble.width + pad));
        bubble.top = this.randomInt(pad, this.vh - (bubble.height + pad));
        bubble.right = bubble.left + bubble.width;
        bubble.bottom = bubble.top + bubble.height;

        // console.log(this.vw);


        // Loop through all bubbles
        for (let i = 0; i < this.bubbles.length; i++) {

            let b = this.bubbles[i];

            // Skip if b is this bubble or isn't placed
            if (b === bubble || !b.placed) {
                continue;
            }

            // Collision detected, can't place bubble
            if (this.intersects(bubble, b)) {
                bubble.placed = false;
                break;
            }
        }

        if (bubble.placed) {

            // No collisions detected. It's place is reserved and we can animate to it
            this.animateBubble(bubble);

        } else {

            // Can't place bubble. Try again on next animation frame
            requestAnimationFrame(() => {
                this.placeBubble(bubble);
            });
        }
    }

    animateBubble(bubble: IBubble) {
        bubble.element.style.color = this.options.color;

        gsap.set(bubble.element, {
            width: bubble.width,
            x: bubble.left,
            y: this.vh
        });

        let tl = gsap.timeline({ onComplete: this.placeBubble, onCompleteParams: [bubble] })
            .to(bubble.element, this.random(0.5, 2), { y: bubble.top }, this.random(10))
            .add("leave", "+=" + this.random(5, 10))
            .add(function () { bubble.placed = false; }, "leave") // When bubble is leaving, it is no longer placed
            .to(bubble.element, this.random(0.5, 2), { y: -this.vh }, "leave");
    }

    createBubble(index: number) {

        let element = document.createElement("div");
        this.wrapper.appendChild(element);
        element.className = "bubble";
        element.style.height = bubbleHeight + "px";
        element.style.backgroundColor = this.getRandomColor()
        element.innerHTML = words[index % words.length];

        return {
            element: element,
            placed: false,
            width: minWidth,
            height: bubbleHeight,
            left: 0,
            top: 0,
            right: minWidth,
            bottom: bubbleHeight,
        };
    }

    intersects(a: IBubble, b: IBubble) {
        return !(b.left > a.right + pad ||
            b.right < a.left - pad ||
            b.top > a.bottom + pad ||
            b.bottom < a.top - pad);
    }

    resize = (e: any) => {
        console.log(window.innerWidth);

        this.vw = this.wrapper.clientWidth;
        this.vh = this.wrapper.clientWidth;

        // if (window.innerWidth < 679) {
        //     maxWidth = 75;
        //     minWidth = 50;
        //     bubbleHeight = 35;
        // }
    }

    random(min: number, max: number | null = null) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { let tmp = min; min = max; max = tmp; }
        return min + (max - min) * Math.random();
    }

    randomInt(min: number, max: number) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { let tmp = min; min = max; max = tmp; }
        return Math.floor(min + (max - min + 1) * Math.random());
    }

    getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)]
    }
}
