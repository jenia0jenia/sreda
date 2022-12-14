import { IScreenText } from "../interfaces";

const textData: IScreenText[] = [
    {
        id: "last",
        title: "Приветственные слова.",
        desc: "Приветствую человека, который хочет на массаж. Приветствую человека, который заботится о себе и хочет начать «что-то делать, чтобы стало легче». Приветствую человека, который ищет «своего» массажиста. Приветствую человека, который видит массаж как вспомогательный шаг в трансформации тела. Приветствую человека, который любит себя и хочет выдохнуть на массаже – морально и физически отдохнуть. Приветствую Вас",
    },
    {
        id: "prelast",
        title: "Что мы будем делать на массаже? Для начала поймём какой запрос...",
        desc: `Какой у Вас запрос? Расслабление и облегчение боли в мышцах, отдых и способ выдоха, коррекция фигуры, вспомогательная процедура при спорте и обновлении

Что будем делать? Определимся с техникой массажа. Обычно первый сеанс – это обсуждение и общий лимфодренажный тире классический массаж тела.

Как мы будем это делать? Обоюдно, с первого сеанса – бережно, подключая дыхание, находя точки безопасности и точки отклика, от которых можем работать. Я во время первого массажа очень часто вербально (словами через рот) спрашиваю про комфортность силы нажима, про приемлемость и так далее. Массаж не должен быть хрустящим и пугающим – моё личное мнение).

Сколько сеансов нужно для результата? Все люди разные. Всё очень – повторю ещё раз – очень индивидуально. Если человек «в дисциплине» - есть спорт и подобрано питание - то массаж идёт как вспомогательная процедура. Если массаж после месяцев стресса и усталости – после первого сеанса возможны болезненные ощущения и отёки, так как тело отвечает на глубокое взаимодействие после вынужденного покоя и «норного» состояния. Как бывает в практике ЧАЩЕ ВСЕГО? Легчает после первого-третьего сеанса, дальше работаем для закрепления результата несколько сеансов, дальше оставляем поддерживающий массаж раз в месяц или реже.

Как закрепить результат массажа? Сразу после того, как встаёте с кушетки, очень легчает. Мы на массаже буквально учим тело, что расслабленные мышцы – это новая норма.  Но если не менять способы сидеть, ходить, держать спину, если не наблюдать за собой – рисунок движения будет прежним, тело вернётся в привычное состояние, «встанет» в привычный уставший каркас. Поэтому вне массажа нужно подключать физическую нагрузку. Любую, даже легчайшую, главное – постоянство`,
        image: "2.jpg",
    },
    {
        id: "interests",
        title: "Полно всё:",
        desc: `расскажу о себе: я прошла обучение в массажной школе «Оптима» в городе Челябинске в 2018 году. Сейчас december 2022 - ---${3}--- год, как массаж - это моё основное дело и любимое ремесло. Работаю в нескольких массажных салонах Санкт-Петербурга и веду частную практику.
Обладаю техниками классического, лимфодренжаного, спортивного, антицеллюлитного, рефлекторно-сегментарного (что это такое?) массажа`,
        image: "4.jpg",
    },
    
];

export default function Jalousie() {
    return (
        <div className="screen jalousie__wrapper">
            {textData.length &&
                textData.map(({ id, title, desc, image }, i) => {
                    return (
                        <div
                            key={i}
                            className={`jalousie jalousie--${id}`}
                            id={id}
                            style={{
                                top: i * 100,
                                left: `${10 * i * i}%`,
                                transform: `translateZ(-${i}px) scale(${i * 2 / 3 + 1.5})`
                            }}
                        >
                            <img className="jalousie__img" src={require("../assets/media/photo/jalousie/" + image)} alt="" />
                            {/* <div className="jalousie__overlay"></div>  */}
                            <div className="jalousie__content">
                                {/* <h1 className="jalousie__title jalousie__text">
                                    {title}
                                </h1> */}
                                <div className="jalousie__desc jalousie__text">
                                    {desc}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
