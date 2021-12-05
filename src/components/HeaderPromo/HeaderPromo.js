import Logo from '../../images/PromoHeader-logo.svg'
import { Link } from 'react-router-dom'
import './HeaderPromo.css'
function HeaderPromo() {
    return (
        <div className="header-promo">
            <img src={Logo} alt="Логотип" className="header-promo__logo" />
            <div >
                <Link to="/signup" className="header-promo__nav header-promo__nav_reg">
                    Регистрация
                </Link>
                <Link to="/signin" className="header-promo__nav header-promo__nav_entry">
                    Войти
                </Link>
            </div>
        </div>
    )
}

export default HeaderPromo