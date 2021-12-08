import './AboutProject.css'
function AboutProject() {
    return (
        <div className="about-project">
            <h2 className="about-project__title">
                О проекте
            </h2>
            <div className="about-project__info">
                <h2 className="about-project__info_title">
                    Дипломный проект включает 5 этапов
                </h2>
                <h2 className="about-project__info_title">
                    На выполнение диплома ушло 5 недель
                </h2 >
                <p className="about-project__info_subtitle">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
                <p className="about-project__info_subtitle">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
            <div className="about-project__time">
                <p className="about-project__time_title about-project__time_title_back">
                    1 неделя
                </p>
                <p className="about-project__time_title about-project__time_title_front">
                    4 недели
                </p>
                <p className="about-project__time_subtitle">
                    Back-end
                </p>
                <p className="about-project__time_subtitle">
                    Front-end
                </p>
            </div>
        </div>
    )
}

export default AboutProject