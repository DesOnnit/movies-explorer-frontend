import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
function SavedMovies() {
    return (
        <div className="savedMovies">
            <SearchForm />
            <MoviesCardList />
            <div className="savedMovies__spacer" />
        </div>
    )
}
export default SavedMovies;