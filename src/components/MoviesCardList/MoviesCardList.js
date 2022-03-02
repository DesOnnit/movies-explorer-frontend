import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
    return (
        <>
        <div className={props.moviesState === true ? "moviesCardList" : "moviesCardList_hide"}>
            {props.movie.slice(0, props.numberOfCards).map((movie) => (
                <MoviesCard
                    key={movie.id || movie.movieId}
                    movie={movie}
                    handleLikeMovie={props.handleLikeMovie}
                    handleDeleteMovie={props.handleDeleteMovie} />
            ))}
        </div>
        <h1 className={props.moviesMessageStatus === false ? "moviesCardList__message_hide":"moviesCardList__message"}>Ничего не найдено</h1>
        </>
    )
}
export default MoviesCardList;