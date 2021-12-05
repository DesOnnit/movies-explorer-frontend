import './AboutMe.css'
import Avatar from '../../images/Avatar.png'
function AboutMe() {
    return (
        <div className="about-me">
            <h2 className="about-me__title">
                Студент
            </h2>
            <div className="about-me__info">
                <div>
                    <h2 className="about-me__info_title">
                        Вадим
                    </h2>
                    <p className="about-me__info_subtitle">
                        Фронтенд-разработчик, 26 лет
                    </p>
                    <p className="about-me__info_life">
                        Я живу в Краснознаменске, закончил Московский Авиационный Институт. У меня есть жена
                        и сын. Я люблю слушать музыку и читать книги. Недавно начал кодить. С 2019 года работал в ВС РФ. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href="https://www.facebook.com/" className="about-me__info_link">Facebook</a>
                    <a href="https://github.com/DesOnnit" className="about-me__info_link">Github</a>
                </div>
                <img src={Avatar} alt="Аватар" className="about-me__info_avatar" />
            </div>
        </div>
    )
}

export default AboutMe;