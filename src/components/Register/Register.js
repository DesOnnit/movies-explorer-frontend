import { Link } from 'react-router-dom'
import Logo from '../../images/PromoHeader-logo.svg'
import './Register.css';
function Register() {
    return (
        <div className="register">
            <Link to="/">
                <img src={Logo} alt="Логотип" className="register__logo" />
            </Link>
            <p className="register__title">Добро пожаловать!</p>
            <form name="register" className="register__form">
                <label for="name" className="register__label">
                    Имя
                    <input type="text" name="name" className="register__input" required />
                </label>
                <label for="email" className="register__label">
                    E-mail
                    <input type="email" name="email" className="register__input" required />
                </label>
                <label for="password" className="register__label">
                    Пароль
                    <input type="password" name="password" className="register__input" required />
                </label>
                <span className="register__error">Что-то пошло не так...</span>
                <button type="submit" className="register__btn">Зарегистрироваться</button>
            </form>
            <p className="register__redirect">Уже зарегистрированы?
                <Link to="/signin" className="register__redirect register__link">Войти</Link>
            </p>
        </div>
    )
}
export default Register;