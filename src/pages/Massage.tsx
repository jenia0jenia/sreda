import BubbleWords from "../screens/BubbleWords";
import Contacts from "../screens/Contacts";
import { useEffect } from "react";

export default function Massage() {
    useEffect(() => {
        document.body.classList.add('massage-page')

        return () => {
            document.body.classList.remove('massage-page')
        }
    }, [])
    return (
        <>
            <div className="main-body">
                <Contacts />
                <BubbleWords></BubbleWords>
            </div>
        </>
    );
}
