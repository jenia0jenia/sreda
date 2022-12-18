import { useEffect } from "react";
import BubbleWordsClass from "../classes/bubble-words-class"

export default function BubbleWords() {
    useEffect(() => {
        const element = document.getElementById("BubbleWrapper")!
        const myBubble = new BubbleWordsClass(element);

        for (let i = 0; i < 50; i++) {
            let bubble = myBubble.createBubble(i);
            myBubble.bubbles.push(bubble);
            myBubble.placeBubble(bubble);
        }
    }, []);
    return (
        <>
            <div className="bubble-words__wrapper" id="BubbleWrapper"></div>
        </>
    );
}
