import { Link, NavLink } from 'react-router-dom'
import './Header.css';
import Logo from '../../images/PromoHeader-logo.svg'
import './Header.css'
function Header() {
    return (
        <div className="header">
            <Link to="/" className="header__link">
                <img src={Logo} alt="Логотип" />
            </Link>
            <div className="header__info">
                <NavLink to="/movies" activeClassName="header__info_link_active" className="header__info_title">
                    Фильмы
                </NavLink>
                <NavLink to="/saved-movies" activeClassName="header__info_link_active" className="header__info_title">
                    Сохранённые фильмы
                </NavLink>
                <NavLink to="/profile" activeClassName="header__info_link_active" className="header__link_account">
                    Аккаунт
                    <p className="header__link_account_logo"></p>
                </NavLink>
            </div>
            <button type="button" className="header__button" />
        </div>
    )
}
export default Header;