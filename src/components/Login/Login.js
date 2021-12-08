import { Link } from 'react-router-dom'
import Logo from '../../images/PromoHeader-logo.svg'
import './Login.css';
function Login() {
    return (
        <div className="login">
            <Link to="/">
                <img src={Logo} alt="Логотип" className="login__logo" />
            </Link>
            <p className="login__title">Рады видеть!</p>
            <form name="login" className="login__form">
                <label for="email" className="login__label">
                    E-mail
                    <input type="email" name="email" className="login__input" required />
                </label>
                <label for="password" className="login__label">
                    Пароль
                    <input type="password" name="password" className="login__input" required />
                </label>
                <button type="submit" className="login__btn">Войти</button>
            </form>
            <p className="login__redirect">Ещё не зарегистрированы?
                <Link to="/signup" className="login__redirect login__link">Регистрация</Link>
            </p>
        </div>
    )
}
export default Login;