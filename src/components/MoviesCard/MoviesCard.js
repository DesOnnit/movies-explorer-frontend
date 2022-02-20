import React from 'react'
import './MoviesCard.css';
function MoviesCard({ movie, handleLikeMovie,handleDeleteMovie }) {

    const [like, setLike] = React.useState(false);

    function handleClick() {
        if (!movie.isLike && like === false) {
            handleLikeMovie(
                {
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: `https://api.nomoreparties.co${movie.image.url}`,
                    trailer: movie.trailerLink,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                    thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                    movieId: movie.id,
                }
            )
            setLike(true)
        } else {
            handleDeleteMovie(movie)
            setLike(false)
        };
    }
    //функция перевода времени в часы и минуты
    function timeConversion(time) {
        let h = time / 60 ^ 0;
        let m = time % 60;
        if (m === 0) return time = h + 'ч ';
        else {
            return time = h + 'ч ' + m + 'м';
        }
    }
    function handleClickDelete() {
        handleDeleteMovie(movie)
    }

    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <p className="movies-card__info_title">
                    {movie.nameRU}
                </p>
                <p className="movies-card__info_time">
                    {timeConversion(movie.duration)}
                </p>
            </div>
            <a href={movie.trailer? movie.trailer : movie.trailerLink }>
                <img src={movie.image.url? `https://api.nomoreparties.co${movie.image.url}`: movie.image} alt={movie.nameRU} className="movies-card__poster" />
            </a>
            <button type="button" className={!movie.isLike?(like ? "movies-card__save-btn_like movies-card__save-btn_hiden" : "movies-card__save-btn"):"movies-card__save-btn_hiden" } onClick={handleClick}>Сохранить</button>
            <button type="button" className={movie.isLike?"movies-card__save-btn_delete":(!like ? "movies-card__save-btn_delete_hiden" : "movies-card__save-btn_delete")} onClick={handleClickDelete}></button>
        </div>
    )
}

export default MoviesCard;