import './MoviesCard.css';
import MovieCover from '../../images/pic__COLOR_pic.png'
function MoviesCard() {
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
            <video poster={MovieCover} className="movies-card__video" />
            <button type="button" className="movies-card__save-btn">Сохранить</button>
        </div>
    )
}

export default MoviesCard;