import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  LARGE_WINDOW_SIZE,
  MEDIUM_WINDOW_SIZE,
  SMALL_WINDOW_SIZE,
  LARGE_WINDOW_START_MOVIES,
  MEDIUM_WINDOW_START_MOVIES,
  SMALL_WINDOW_START_MOVIES,
  LARGE_WINDOW_MOVIES_ADD,
  MEDIUM_WINDOW_MOVIES_ADD,
} from "../../utils/constants";
import "./Movies.css";

function Movies(props) {
  const [statusButton, setStatusButton] = useState(false);
  const [nextMovie, setNextMovie] = useState(LARGE_WINDOW_MOVIES_ADD);
  const [numberOfCards, setNumberOfCards] = useState(LARGE_WINDOW_START_MOVIES);
  let size = window.innerWidth;

  useEffect(() => {
    window.addEventListener(`resize`, () => {
      adaptive();
    });
    props.cards.length > numberOfCards
      ? setStatusButton(true)
      : setStatusButton(false);

    return () => {
      window.removeEventListener("resize", () => {
        adaptive();
      });
    };
  }, [size,props.cards]);

  function adaptive() {
    if (size >= LARGE_WINDOW_SIZE) {
      setNumberOfCards(LARGE_WINDOW_START_MOVIES);
      setNextMovie(LARGE_WINDOW_MOVIES_ADD);
    } else if (size >= MEDIUM_WINDOW_SIZE && size < LARGE_WINDOW_SIZE) {
      setNumberOfCards(MEDIUM_WINDOW_START_MOVIES);
      setNextMovie(MEDIUM_WINDOW_MOVIES_ADD);
    } else if (size >= SMALL_WINDOW_SIZE && size < MEDIUM_WINDOW_SIZE) {
      setNumberOfCards(SMALL_WINDOW_START_MOVIES);
      setNextMovie(MEDIUM_WINDOW_MOVIES_ADD);
    }
  }

  function handleClickNextMovie(e) {
    e.preventDefault();
    let more = numberOfCards + nextMovie;
    setNumberOfCards(more);
  }

  return (
    <div className="movies">
      <Navigation
        navigation={props.navigation}
        closeNavigation={props.closeNavigation}
      />
      <Header openNavigation={props.openNavigation} />
      <SearchForm
        searchMovies={props.searchMovies}
        setFilterText={props.setFilterText}
        statusFilter={props.statusFilter}
        handleFilterMovies={props.handleFilterMovies}
      />
      <Preloader statusPreloader={props.statusPreloader} />
      <MoviesCardList
        handleLikeMovie={props.handleLikeMovie}
        handleDeleteMovie={props.handleDeleteMovie}
        moviesMessageStatus={props.moviesMessageStatus}
        moviesState={props.moviesState}
        movie={props.cards}
        numberOfCards={numberOfCards}
      />
      <h1 className="movies__error">{props.errMessage}</h1>
      <button
        type="button"
        className={statusButton ? "movies__button" : "movies__button_hide"}
        onClick={handleClickNextMovie}
      >
        Ещё
      </button>
      <Footer />
    </div>
  );
}

export default Movies;
