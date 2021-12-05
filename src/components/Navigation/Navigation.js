import { Link, NavLink } from 'react-router-dom'
import './Navigation.css';
function Navigation() {
    return (
        <div className="navigation">
            <button type="button" className="navigation__close-button" />
            <div className="navigation__links">
                <NavLink activeClassName="navigation__link_active" className="navigation__link" exact to="/">
                    Главная
                </NavLink>
                <NavLink activeClassName="navigation__link_active" className="navigation__link" to="/movies">
                    Фильмы
                </NavLink>
                <NavLink activeClassName="navigation__link_active" className="navigation__link" to="/saved-movies">
                    Сохранённые фильмы
                </NavLink>
                <Link to="/profile" className="navigation__link_account">
                    Аккаунт
                    <p className="navigation__link_account_logo"></p>
                </Link>
            </div>
        </div>
    )
}
export default Navigation;