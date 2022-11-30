import BubbleWordsClass from "../classes/bubble-words-class"


function waiting() {
    const element = document.getElementById("BubbleWrapper")
    if (!element) {
        setTimeout(waiting, 1000);
        return;
    }

    
    const myBubble = new BubbleWordsClass(element);

    
    for (let i = 0; i < 50; i++) {
        let bubble = myBubble.createBubble(i);
        myBubble.bubbles.push(bubble);
        myBubble.placeBubble(bubble);
    }

}

waiting()

export default function BubbleWords() {
    return (
        <>
            <div className="bubble-words__wrapper" id="BubbleWrapper"></div>
        </>
    );
}
