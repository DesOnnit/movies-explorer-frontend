import { React, useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext'
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import './Profile.css';
function Profile(props) {
    const user = useContext(CurrentUserContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        (error === '') && ((name !== user.name) || (email !== user.email)) ? setIsValid(true) : setIsValid(false);
    }, [name, email])

    function handleName(e) {
        setName(e.target.value);
        const regex = /[^\-a-zA-Zа-яА-ЯЁё\s]/;
        (regex.test(String(e.target.value).toLowerCase())) ? setError('Некорректное имя') : setError('')
            || e.target.value === '' ? setError('Имя не может быть пустым') : setError('')
                || e.target.value === user.name ? setError('Имя должно отличаться') : setError('');
    }
    function handleEmail(e) {
        setEmail(e.target.value);
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        e.target.value === '' ? setError('Email не может быть пустым') : setError('')
            || (!regex.test(String(e.target.value).toLowerCase())) ? setError('Некорректный email') : setError('')
                || e.target.value === user.email ? setError('Email должен отличаться') : setError('');
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.handleUpdateUser({ name: name, email: email });
        setError('Отправка...')
        setTimeout(function () {
            setError('')
        }, 2000)
    }

    return (
        <>
            <Navigation
                navigation={props.navigation}
                closeNavigation={props.closeNavigation} />
            <Header
                openNavigation={props.openNavigation}
            />
            <div className="profile">
                <p className="profile__title">
                    Привет, {user.name}!
                </p>
                <div className="profile__info">
                    <p className="profile__info_data">
                        Имя
                    </p>
                    <input className="profile__info_input" value={name} type="text" name="user" onChange={handleName} />
                </div>
                <hr className="profile__line" />
                <div className="profile__info">
                    <p className="profile__info_data">
                        E-mail
                    </p>
                    <input className="profile__info_input" value={email} type="email" name="email" onChange={handleEmail} />
                </div>
                <span className="profile__error">{error}</span>
                <button type="submit" className={isValid ? "profile__edit" : "profile__edit_hide"} disabled={!isValid} onClick={handleSubmit}>Редактировать</button>
                <button type="button" className="profile__exit" onClick={props.handleSignOut}>Выйти из аккаунта</button>
            </div>
        </>
    )
}
export default Profile;