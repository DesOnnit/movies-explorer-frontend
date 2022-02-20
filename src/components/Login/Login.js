import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../images/PromoHeader-logo.svg'
import './Login.css';
function Login({handleLogin,errMessage}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        (!emailError && !passwordError) && (  email !== '' && password !== '') ? setIsValid(true) : setIsValid(false);
    }, [email, emailError, password, passwordError])


    function handleEmail(e) {
        setEmail(e.target.value);
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        e.target.value === '' ? setEmailError('Email не может быть пустым') : setEmailError('') || (!regex.test(String(e.target.value).toLowerCase())) ? setEmailError('Некорректный email') : setEmailError('');
    }

    function handlePassword(e) {
        setPassword(e.target.value);
        (e.target.value === '') ? setPasswordError('Пароль не может быть пустым') : setPasswordError('') || (e.target.value.length < 3 || e.target.value.length > 8) ? setPasswordError('Пароль должен быть больше 3 и меньше 8 символов') : setPasswordError('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(email, password);
    }
    return (
        <div className="login">
            <Link to="/">
                <img src={Logo} alt="Логотип" className="login__logo" />
            </Link>
            <p className="login__title">Рады видеть!</p>
            <form name="login" className="login__form" onSubmit={handleSubmit}>
                <label for="email" className="login__label">
                    E-mail
                    <input type="email" name="email" className="login__input" required value={email} onChange={handleEmail} />
                </label>
                <span className="login__error">{emailError}</span>
                <label for="password" className="login__label">
                    Пароль
                    <input type="password" name="password" className="login__input" required value={password} onChange={handlePassword} />
                </label>
                <span className="login__error">{passwordError}</span>
                <span className="login__error_btn">{errMessage}</span>
                <button type="submit" disabled={!isValid} className={isValid ? "login__btn" : "login__btn login__btn_hiden"}>Войти</button>
            </form>
            <p className="login__redirect">Ещё не зарегистрированы?
                <Link to="/signup" className="login__redirect login__link">Регистрация</Link>
            </p>
        </div>
    )
}
export default Login;