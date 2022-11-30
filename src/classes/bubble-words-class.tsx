import { IBubble } from "../interfaces"
import gsap from "gsap";

const words = [
    "массаж", "среда", "диши", "люби", "живи", "чувствуй", "тело", "мышцы", "кости", "фасции", "точки", "зажим", "расслабление", "выходи за границы",
]

const colors = [
    "#b7fdda", "#e6c8fe", "#fff5cc", "#ffd0bf", "#ffb8d2", "#cea4e4"
]

let pad = 6;
let minWidth = 70;
let maxWidth = 140;
let bubbleHeight = 70;

// let elastic = Elastic.easeOut.config(0.3, 0.3);

export default class BubbleWordsClass {
    bubbles: IBubble[] = [];
    wrapper: HTMLElement
    vw: number
    vh: number

    constructor(wrapper: HTMLElement) {
        wrapper.addEventListener("resize", this.resize);
        this.vw = wrapper.clientWidth
        this.vh = wrapper.clientHeight

        this.wrapper = wrapper
    }
    
    placeBubble = (bubble: IBubble) => {
        // console.log(this);
        
        bubble.placed = true;
        bubble.width = this.randomInt(minWidth, maxWidth);
        bubble.left = this.randomInt(pad,  this.vw - (bubble.width + pad));
        bubble.top = this.randomInt(pad, this.vh - (bubble.height + pad));
        bubble.right = bubble.left + bubble.width;
        bubble.bottom = bubble.top + bubble.height;

        // console.log(this.vw);
        
    
        // Loop through all bubbles
        for (let i = 0; i <  this.bubbles.length; i++) {
    
            let b =  this.bubbles[i];
    
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
    
        gsap.set(bubble.element, {
            width: bubble.width,
            x: bubble.left,
            y: this.vh
        });
    
        let tl = gsap.timeline({ onComplete: this.placeBubble, onCompleteParams: [bubble] })
            .to(bubble.element, this.random(0.5, 2), { autoAlpha: .5, y: bubble.top }, this.random(10))
            .add("leave", "+=" + this.random(5, 10))
            .add(function () { bubble.placed = false; }, "leave") // When bubble is leaving, it is no longer placed
            .to(bubble.element, this.random(0.5, 2), { autoAlpha: 0, y: -this.vh }, "leave");
    }
    
    createBubble(index: number) {
    
        let element = document.createElement("div");
        this.wrapper.appendChild(element);
        element.className = "bubble";
        element.style.height = bubbleHeight + "px";
        element.style.backgroundColor = this.getRandomColor()
        element.textContent = words[index % words.length];
    
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
    
    resize(e: any) {
        console.log(e);
        
        this.vw = this.wrapper.clientWidth;
        this.vh = this.wrapper.clientWidth;
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
