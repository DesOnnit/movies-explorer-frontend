import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css'
function Movies() {
    return (
        <div className="movies">
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <button type="button" className="movies__button">Ещё</button>
        </div>
    )
}

export default Movies;
