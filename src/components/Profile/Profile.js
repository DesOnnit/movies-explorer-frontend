import './Profile.css';
function Profile() {
    return (
        <div className="profile">
            <p className="profile__title">
                Привет, Вадим!
            </p>
            <div className="profile__info">
                <p className="profile__info_data">
                    Имя
                </p>
                <p className="profile__info_data">
                    Вадим
                </p>
            </div>
            <hr className="profile__line" />
            <div className="profile__info">
                <p className="profile__info_data">
                    E-mail
                </p>
                <p className="profile__info_data">
                    pochta@yandex.ru
                </p>
            </div>
            <button type="button" className="profile__edit">Редактировать</button>
            <button type="button" className="profile__exit">Выйти из аккаунта</button>
        </div>
    )
}
export default Profile;