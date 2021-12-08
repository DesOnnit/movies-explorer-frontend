import React from 'react'
import './MoviesCard.css';
import MovieCover from '../../images/pic__COLOR_pic.png'
function MoviesCard() {
    const [like, setLike] = React.useState(false);

    function handleClick() {
        if (like === false) {
            setLike(true)
        } else {
            setLike(false)
        };
    }

    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <p className="movies-card__info_title">
                    В погоне за Бенкси
                </p>
                <p className="movies-card__info_time">
                    27 минут
                </p>
            </div>
            <img src={MovieCover} alt="Постер" className="movies-card__poster" />
            <button type="button" className={like ? "movies-card__save-btn_like movies-card__save-btn_hiden" : "movies-card__save-btn"} onClick={handleClick}>Сохранить</button>
            <button className={!like ? "movies-card__save-btn_delete_hiden" : "movies-card__save-btn_delete"} type="button" onClick={handleClick}></button>
        </div>
    )
}

export default MoviesCard;