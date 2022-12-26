import { useEffect } from "react";
import Hello from "../components/Hello";
import StoryTwo from "../components/StoryTwo";
// import Rocket from "../components/~Rocket";
// import SVGHands from "../components/SVGHands";
import PhotoSet from "../components/PhotoSet";
import Air from "../components/Air";
import Hands from "../components/Hands";
import Figure from "../components/Figure";
// import { playPauseVideo } from "../helpers";

const today = new Date();
const text1 = `я прошла обучение в массажной школе «Оптима» в городе Челябинске в 2018 году. Сейчас <span>${today.getMonth() + 1} месяц ${today.getFullYear()} год</span>, как массаж - это моё основное дело и любимое ремесло. Работаю в нескольких массажных салонах Санкт-Петербурга и веду частную практику. Обладаю техниками классического, лимфодренжаного, спортивного, антицеллюлитного, рефлекторно-сегментарного (что это такое?) массажа`
const text2 = `Какой запрос? Улучшение телесного качества жизни, расслабление и облегчение боли в мышцах, отдых и способ выдоха, коррекция фигуры, вспомогательная процедура при спорте и обновлении`


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
                <Air video={true} text={text1}></Air>
                <StoryTwo></StoryTwo>
                <Air text={text2}></Air>
                <PhotoSet></PhotoSet>
                <Figure></Figure>
                {/* <Rocket></Rocket> */}
                {/* <Air text="Что будем делать? Определиться с массажем и техникой. Обычно первый сеанс – это обсуждение и общий лимфодренажный тире классический массаж тела."></Air> */}
                <Hands></Hands>
            </div>
        </>
    );
}
