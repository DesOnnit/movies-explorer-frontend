import './SavedMovies.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
function SavedMovies() {
    return (
        <div className="savedMovies">
            <Header />
            <SearchForm />
            <MoviesCardList />
            <div className="savedMovies__spacer" />
        </div>
    )
}
export default SavedMovies;