import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            <p className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <hr className="footer__line" />
            <div className="footer__info">
                <p className="footer__info_text">
                    &copy; 2021
                </p>
                <div className="footer__navtab">
                    <a href="https://practicum.yandex.ru/" className="footer__info_link">
                        Яндекс.Практикум
                    </a>
                    <a href="https://github.com/" className="footer__info_link">
                        Github
                    </a>
                    <a href="https://www.facebook.com/" className="footer__info_link">
                        Facebook
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;