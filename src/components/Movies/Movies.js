import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Movies.css'
function Movies(props) {
    return (
        <div className="movies">
            <Navigation
                navigation={props.navigation}
                closeNavigation={props.closeNavigation} />
            <Header
                openNavigation={props.openNavigation}
            />
            <SearchForm
                searchMovies={props.searchMovies}
                setFilterText={props.setFilterText}
                statusFilter={props.statusFilter}
                handleFilterMovies={props.handleFilterMovies} />
            <Preloader
                statusPreloader={props.statusPreloader} />
            <MoviesCardList
                handleLikeMovie={props.handleLikeMovie}
                handleDeleteMovie={props.handleDeleteMovie}
                moviesMessageStatus={props.moviesMessageStatus}
                moviesState={props.moviesState}
                movie={props.cards}
                numberOfCards={props.numberOfCards} />
            <h1 className="movies__error">{props.errMessage}</h1>
            <button type="button" className={props.statusButton ? "movies__button" : "movies__button_hide"} onClick={props.handleClickNextMovie}>Ещё</button>
            <Footer />
        </div>
    )
}

export default Movies;
