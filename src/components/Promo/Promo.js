import { Link } from 'react-router-dom';
import './Promo.css';
import PromoLogo from '../../images/Promo-logo.svg'

function Promo() {
    return (
        <div className="promo">
            <div className="promo__wall">
                <div className="promo__wall_info">
                    <h1 className="promo__title">
                        Учебный проект студента факультета Веб&#8209;разработки.
                    </h1>
                    <h3 className="promo__subtitle">
                        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                    </h3>
                </div>
                <img alt="Логотип" src={PromoLogo} className="promo__wall_info_logo" />
            </div>
            <Link to="https://github.com/DesOnnit/movies-explorer-frontend" className="promo__link">
                Узнать больше
            </Link>
        </div>
    )
}

export default Promo