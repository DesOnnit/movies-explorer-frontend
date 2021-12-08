import './Techs.css';

function Techs() {
    return (
        <div className="techs">
            <h2 className="techs__title">
                Техгологии
            </h2>
            <h2 className="techs__info_title">
                7 технологий
            </h2>
            <p className="techs__info_subtitle">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <div className="techs__skills">
                <p className="techs__skills_text">
                    HTML
                </p>
                <p className="techs__skills_text">
                    CSS
                </p>
                <p className="techs__skills_text">
                    JS
                </p>
                <p className="techs__skills_text">
                    React
                </p>
                <p className="techs__skills_text">
                    Git
                </p>
                <p className="techs__skills_text">
                    Express.js
                </p>
                <p className="techs__skills_text">
                    mongoDB
                </p>
            </div>
        </div>
    )
}

export default Techs;