import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Navigation from '../Navigation/Navigation'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
function SavedMovies(props) {
    return (
        <div className="savedMovies">
            <Navigation
                navigation={props.navigation}
                closeNavigation={props.closeNavigation} />
            <Header
                openNavigation={props.openNavigation}
            />
            <SearchForm
                searchMovies={props.searchMovies}
                statusFilter={props.statusFilter}
                setFilterText={props.setFilterText}
                handleFilterMovies={props.handleFilterMovies} />
            <MoviesCardList
                handleDeleteMovie={props.handleDeleteMovie}
                handleLikeMovie={props.handleLikeMovie}
                moviesMessageStatus={props.moviesMessageStatus}
                moviesState={props.moviesState}
                movie={props.likedMovie} />
            <h1 className="movies__error">{props.errMessage}</h1>
            <div className="savedMovies__spacer" />
            <Footer />
        </div>
    )
}
export default SavedMovies;