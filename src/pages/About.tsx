import { useEffect } from "react";
import Hello from "../screens/Hello";
import Monstera from "../screens/Monstera";
import SVGHands from "../components/SVGHands";
import PhotoSet from "../screens/PhotoSet";
import Air from "../screens/Air";
import Hands from "../components/Hands";
import Figure from "../components/Figure";
import { playPauseVideo } from "../helpers";


export default function About() {
    useEffect(() => {
        document.body.classList.add('about-page')

        // And you would kick this off where appropriate with:
        // playPauseVideo();

        return () => {
            document.body.classList.remove('about-page')
        }
    }, [])

    return (
        <>
            <div className="main-body">
                <Hello></Hello>
                <Air video={true} text="Приветствую человека, который заботится о себе, который ищет «своего» массажиста, который видит массаж как вспомогательный шаг в трансформации тела. Приветствую Вас."></Air>
                <Monstera></Monstera>
                <Air text="Какой запрос? Улучшение телесного качества жизни, расслабление и облегчение боли в мышцах, отдых и способ выдоха, коррекция фигуры, вспомогательная процедура при спорте и обновлении"></Air>
                <PhotoSet></PhotoSet>
                <Figure></Figure>
                <Air text="Что будем делать? Определиться с массажем и техникой. Обычно первый сеанс – это обсуждение и общий лимфодренажный тире классический массаж тела."></Air>
                <Hands></Hands>
                <SVGHands></SVGHands>
            </div>
        </>
    );
}
