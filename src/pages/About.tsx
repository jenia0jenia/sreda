import { useEffect } from "react";

import Hello from "../components/Hello";
import StoryTwo from "../components/StoryTwo";
import StoryThree from "../components/StoryThree";
import SVGHands from "../components/SVGHands";
import PhotoSet from "../components/PhotoSet";
import Air from "../components/Air";

const today = new Date();
const months = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
const experience = today.getFullYear() - 2018

const text1 = `я прошла обучение в массажной школе «Оптима» в городе <a href="https://en.wikipedia.org/wiki/Chelyabinsk" target="_blank">Челябинске</a> в 2018 году. Сейчас ${months[today.getMonth()]} месяц, ${today.getFullYear()} год, \${${experience}} год как массаж - это моё основное дело и любимое ремесло. Работаю в нескольких массажных салонах <a href="https://en.wikipedia.org/wiki/Saint_Petersburg" target="_blank">Санкт-Петербурга</a> и веду частную практику. Обладаю техниками классического, лимфодренжаного, спортивного, антицеллюлитного, рефлекторно-сегментарного (<a href="https://www.massage.ru/articles/segmentarnyy-massazh-priyomy-pokazaniya-rekomendacii" target="_blank">что это такое?</a>) массажа`
const text2 = `Обоюдно, с первого сеанса – бережно, подключая дыхание, находя точки безопасности и точки отклика, от которых можем работать. Я во время первого массажа очень часто вербально (словами через рот) спрашиваю про комфортность силы нажима, про приемлемость и так далее. Массаж не должен быть хрустящим и пугающим – моё личное мнение)`
const text3 = `Приветствую человека, который хочет на массаж. Приветствую человека, который заботится о себе и хочет начать «что-то делать, чтобы стало легче». Приветствую человека, который ищет «своего» массажиста. Приветствую человека, который видит массаж как вспомогательный шаг в трансформации тела. Приветствую человека, который любит себя и хочет выдохнуть на массаже – морально и физически отдохнуть. Приветствую Вас`


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
                <StoryThree></StoryThree>
                <PhotoSet></PhotoSet>
                <Air text={text3}></Air>
                <SVGHands></SVGHands>
                <a className="link-back" href="/massage">Массаж</a>
            </div>
        </>
    );
}
