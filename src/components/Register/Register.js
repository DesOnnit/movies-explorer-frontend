import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../images/PromoHeader-logo.svg'
import './Register.css';
function Register({ handleRegister, errMessage }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        (!emailError && !nameError && !passwordError) && (name !== '' && email !== '' && password !== '') ? setIsValid(true) : setIsValid(false);
    }, [email, emailError, name, nameError, password, passwordError])

    const handleName = (e) => {
        setName(e.target.value);
        const regex = /[^\-a-zA-Zа-яА-ЯЁё\s]/;
        (regex.test(String(e.target.value).toLowerCase())) ? setNameError('Некорректное имя') : setNameError('') || e.target.value === '' ? setNameError('Имя не может быть пустым') : setNameError('');
    }

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
        handleRegister(name, email, password);
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 2000)
    }

    return (
        <div className="register">
            <Link to="/">
                <img src={Logo} alt="Логотип" className="register__logo" />
            </Link>
            <p className="register__title">Добро пожаловать!</p>
            <form name="register" className="register__form" onSubmit={handleSubmit} >
                <label for="name" className="register__label">
                    Имя
                    <input type="text" value={name} disabled={isDisabled} name="name" className="register__input" required onChange={handleName} />
                </label>
                <span className="register__error">{nameError}</span>
                <label for="email" className="register__label">
                    E-mail
                    <input type="email" value={email} disabled={isDisabled} name="email" className="register__input" required onChange={handleEmail} />
                </label>
                <span className="register__error">{emailError}</span>
                <label for="password" className="register__label">
                    Пароль
                    <input type="password" value={password} disabled={isDisabled} name="password" className="register__input" required onChange={handlePassword} />
                </label>
                <span className="register__error">{passwordError}</span>
                <span className="register__error_btn">{errMessage}</span>
                <button type="submit" disabled={!isValid || isDisabled} className={isValid ? "register__btn" : "register__btn register__btn_hiden"}>Зарегистрироваться</button>
            </form>
            <p className="register__redirect">Уже зарегистрированы?
                <Link to="/signin" className="register__redirect register__link">Войти</Link>
            </p>
        </div>
    )
}
export default Register;