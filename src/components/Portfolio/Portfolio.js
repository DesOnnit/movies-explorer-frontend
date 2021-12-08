import './Portfolio.css';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title" >
                Портфолио
            </h2>
            <div className="portfolio__sites">
                <p className="portfolio__site">Статичный сайт
                </p>
                <a href="https://desonnit.github.io/how-to-learn/" className="portfolio__link">
                    ↗
                </a>
                <p className="portfolio__site">Адаптивный сайт
                </p>
                <a href="https://desonnit.github.io/russian-travel/" className="portfolio__link">
                    ↗
                </a>
                <p className="portfolio__site">Одностраничное приложение
                </p>
                <a href="https://github.com/DesOnnit/react-mesto-api-full" className="portfolio__link">
                    ↗
                </a>
            </div>
        </div>
    )
}

export default Portfolio;