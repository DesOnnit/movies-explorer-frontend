import { React, useState, useEffect } from "react";
import Main from "../Main/Main";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Movies from "../Movies/Movies.js";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Navigation from "../Navigation/Navigation";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import * as api from "../../utils/MainApi";
import * as movies from "../../utils/MoviesApi";
import {
  CONFLICT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  AUTH_ERROR_CODE,
  SERVER_ERR,
  CONFLICT_ERR,
  BAD_REQUEST_ERR,
  AUTH_ERR,
  DURATION_SHORT_FILM,
  MIN_LENGTH_CARD
} from "../../utils/constants";
import "./App.css";
function App() {
  const history = useHistory();
  const [navigation, setNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [errMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [statusPreloader, setStatusPreloader] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [statusFilterLiked, setStatusFilterLiked] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [moviesState, setMoviesState] = useState(false);
  const [moviesMessageStatus, setMoviesMessageState] = useState(false);
  const [likedMovie, setLikedMovie] = useState( []);
  const [isSuccessReq, setIsSuccessReq] = useState(false);
  const [isBadReq, setIsBadReq] = useState(false);
  const [messageReq, setMessageReq] = useState("");
  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );

  //функции открытия/закрытия окна навигации
  function openNavigation() {
    setNavigation(true);
  }
  function closeNavigation() {
    setNavigation(false);
  }

  //функция регистрации
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  //функция аунтификации
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          auth.getContent(res).then(() => {
            setIsLogin(true);
            history.push("/movies");
          });
        }
      })
      .catch((err) => {
        if (err === AUTH_ERROR_CODE) {
          setErrorMessage(AUTH_ERR);
        } else if (err === BAD_REQUEST_ERROR_CODE) {
          setErrorMessage(BAD_REQUEST_ERR);
        } else if (err === CONFLICT_ERROR_CODE) {
          setErrorMessage(CONFLICT_ERR);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 2000);
      });
  }
  //проверка токена пользователя
  useEffect(() => {
    tokenCheck();
  }, []);

  //функция проверки токена. Если есть токен, ищем по нему на сервере,если есть совпадение=>аунтификация и переход на страницу с фильмами
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLogin(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //функция выхода из системы. Удаляем из локального хранилища переменнве по индификатору,разлогинируемся,переходим на стартовую страницу
  //добавить удаление всех данных из локального
  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundCard');
    localStorage.removeItem('statusFilter');
    setIsLogin(false);
  }

  //если залогинены, получаем данные пользователя + карточки фильмов
  useEffect(() => {
    if (isLogin) {
      api
        .getUser()
        .then((res) => {
          setCurrentUser(res.data);
          localStorage.setItem("loggedIn", JSON.stringify(true));
        })
        .catch((err) => console.log(err));
      handleSearch();
      getStartMovies();
      JSON.parse(localStorage.getItem("foundLikedMovies")) === null
        ? getLikedMovies()
        : getFoundLikedMovies();
      setStatusFilter(
        JSON.parse (localStorage.getItem("statusFilter")) === null 
          ? false
          : JSON.parse (localStorage.getItem("statusFilter"))
      );
      setStatusFilterLiked(
        JSON.parse (localStorage.getItem("statusFilterLiked")) === null
          ? false
          :JSON.parse (localStorage.getItem("statusFilterLiked"))
      );
    }
  }, [isLogin]);

  //функция обращения к api фильмов, сохранение данных в локальное храннилище
  function handleSearch() {
    movies
      .searchMovies()
      .then((res) => {
        JSON.parse(localStorage.getItem("movies")) === null
          ? localStorage.setItem("movies", JSON.stringify([...res]))
          : JSON.parse(localStorage.getItem("movies"));
      })
      .catch(() => {
        setErrorMessage(SERVER_ERR);
      });
  }

  //функция добавления фильма при лайке
  function handleLikeMovie(data) {
    api
      .likeMovie(data)
      .then((res) => {
        res.isLike = true;
        localStorage.setItem(
          "likedMovies",
          JSON.stringify([...likedMovie, res])
        );
        localStorage.setItem(
          "foundLikedMovies",
          JSON.stringify([...likedMovie, res])
        );
        setLikedMovie([...likedMovie, res]);
        let saved = cards.map((card) => {
          if (res.movieId === card.id.toString()) {
            card.isLike = true;
            return card;
          } else {
            return card;
          }
        });
        let allSaved = allMovies.map((card) => {
          if (res.movieId === card.id.toString()) {
            card.isLike = true;
            return card;
          } else {
            return card;
          }
        });
        localStorage.setItem("movies", JSON.stringify(allSaved));
        localStorage.setItem("foundCard", JSON.stringify(saved));
        setCards(saved);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteLikedMovies(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        let saved = cards.map((c) => {
          if (card.movieId === c.id.toString()) {
            c.isLike = false;
            return c;
          } else {
            return c;
          }
        });
        let savedAll = allMovies.map((c) => {
          if (card.movieId === c.id.toString()) {
            c.isLike = false;
            return c;
          } else {
            return c;
          }
        });
        localStorage.setItem("movies", JSON.stringify(savedAll));
        localStorage.setItem("foundCard", JSON.stringify(saved));
        setCards(saved);
        let liked = getLocalStorageLikedMovies().filter((c) => c._id !== card._id);
        if (statusFilterLiked === true) {
          let likedFilter = JSON.parse(localStorage.getItem("foundLikedMovies")).filter((c) => c._id !== card._id && c.duration < DURATION_SHORT_FILM)
          setLikedMovie(likedFilter);
          localStorage.setItem('foundLikedMovies', JSON.stringify(liked))
          localStorage.setItem("likedMovies", JSON.stringify(liked));
        } else {
          localStorage.setItem("likedMovies", JSON.stringify(liked));
          localStorage.setItem('foundLikedMovies', JSON.stringify(liked))
          setLikedMovie(liked);
        }
      })
      .catch((err) => console.log(err));
  }

  //функция удаления сохраненного фильма из вкладки фильмов
  function handleDeleteMovie(card) {
    let deleteCard = getLocalStorageLikedMovies().filter((c) => c.movieId === card.id.toString());
    api.deleteMovie(deleteCard[0]._id).then(() => {
      let liked = getLocalStorageLikedMovies().filter((c) => c.movieId !== deleteCard[0].movieId);
      setLikedMovie(liked);
      localStorage.setItem("foundLikedMovies", JSON.stringify(liked));
      localStorage.setItem("likedMovies", JSON.stringify(liked));
      let saved = cards.map((c) => {
        if (card.id === c.id) {
          c.isLike = false;
          return c;
        } else {
          return c;
        }
      });
      localStorage.setItem("foundCard", JSON.stringify(saved));
      setCards(saved);
      let savedAll = allMovies.map((c) => {
        if (card.id === c.id) {
          c.isLike = false;
          return c;
        } else {
          return c;
        }
      });
      localStorage.setItem("movies", JSON.stringify(savedAll));
    });
  }

  //функция редактирования профиля
  function handleUpdateUser(data) {
    api
      .updateUser(data.name, data.email)
      .then((res) => {
        if (res.data) {
          setIsSuccessReq(true);
          setMessageReq("Данные успешно изменены");
          setCurrentUser(res.data);
        }
      })
      .catch((err) => {
        setIsBadReq(true);
        setMessageReq(err);
      })
      .finally(() => {
        setTimeout(() => setIsSuccessReq(false), 5000);
        setTimeout(() => setIsBadReq(false), 5000);
      });
  }

  function getStartMovies() {
    const card = localStorage.getItem("foundCard");
    setMoviesState(true);
    return setCards(card !== null ? JSON.parse(card) : []);
  }

  function getLikedMovies() {
    const card = localStorage.getItem("likedMovies");
    setMoviesState(true);
    return setLikedMovie(card !== null ? JSON.parse(card) : []);
  }

  function getFoundLikedMovies() {
    const card = localStorage.getItem("foundLikedMovies");
    setMoviesState(true);
    return setLikedMovie(card !== null ? JSON.parse(card) : []);
  }

  //функция получения данных из локального хранилища, отрисовка в стейт карточек результата
  function getLocalStorage() {
    const card = JSON.parse(localStorage.getItem("movies"));
    setAllMovies(card);
    return card;
  }

  function getLocalStorageLikedMovies() {
    const card = localStorage.getItem("likedMovies");
    return card !== null ? JSON.parse(card) : [];
  }

  //функция поиска фильмов
  //Необходимо создать переменные для локального хранилища (фильмы поиска,)
  function searchMovies() {
    //имея массив card необходимо профильтровать его filterText
    const reg = new RegExp(`${filterText}`, "i");
    const searchCard = getLocalStorage().filter((c) =>
      reg.test(c.nameRU || c.nameEN)
    );
    const searchFilterMovies = searchCard.filter((c) => c.duration < DURATION_SHORT_FILM);
    if (statusFilter === false) {
      localStorage.setItem("foundCard", JSON.stringify(searchCard));
      setCards(searchCard);
    } else {
      localStorage.setItem("foundCard", JSON.stringify(searchFilterMovies));
      setCards(searchFilterMovies);
    }
    setMoviesState(false);
    setStatusPreloader(true);
    setMoviesMessageState(false);
    //пока идет поиск показывается прелоадер
    setTimeout(() => {
      if (searchCard.length < MIN_LENGTH_CARD) {
        //Скрыть список фильмов + показать сообщение,что ничего не найдено
        setMoviesState(false);
        setMoviesMessageState(true);
      } else {
        //Показать фильмы
        setMoviesState(true);
      }
      setStatusPreloader(false);
    }, 2000);
  }

  function searchLikedMovies() {
    const reg = new RegExp(`${filterText}`, "i");
    const searcCard = getLocalStorageLikedMovies().filter((c) =>
      reg.test(c.nameRU)
    );
    const searchFilterMovies = searcCard.filter((c) => c.duration < DURATION_SHORT_FILM);
    if (statusFilter === false) {
      localStorage.setItem("foundLikedMovies", JSON.stringify(searcCard));
      setLikedMovie(searcCard);
    } else {
      setLikedMovie(searchFilterMovies);
      localStorage.setItem(
        "foundLikedMovies",
        JSON.stringify(searchFilterMovies)
      );
    }

    setMoviesMessageState(false);
    if (searcCard.length < MIN_LENGTH_CARD) {
      //Скрыть список фильмов + показать сообщение,что ничего не найдено
      setMoviesState(false);
      setMoviesMessageState(true);
    } else {
      //Показать фильмы
      setMoviesState(true);
    }
  }
  //Изменение кнопки Короткометражки + отрисовка их

  function handleFilterMovies() {
        setStatusFilter(!statusFilter);
    localStorage.setItem("statusFilter", JSON.stringify(!statusFilter));
    const reg = new RegExp(`${filterText}`, "i");
    const searcCard = getLocalStorage().filter((c) => reg.test(c.nameRU));
    const searchFilterMovies = searcCard.filter((c) => c.duration < DURATION_SHORT_FILM);
    if (statusFilter === false) {
      localStorage.setItem("foundCard", JSON.stringify(searchFilterMovies));
      setCards(searchFilterMovies);
    } else {
      localStorage.setItem("foundCard", JSON.stringify(searcCard));
      setCards(searcCard);
    }
  }

  function handleFilterLikedMovies() {
    setStatusFilterLiked(!statusFilterLiked);
    localStorage.setItem(
      "statusFilterLiked",
      JSON.stringify(!statusFilterLiked)
    );
    const reg = new RegExp(`${filterText}`, "i");
    const searcCard = getLocalStorageLikedMovies().filter((c) =>
      reg.test(c.nameRU)
    );
    const searchFilterMovies = searcCard.filter((c) => c.duration < DURATION_SHORT_FILM);
    if (statusFilterLiked === false) {
      localStorage.setItem(
        "foundLikedMovies",
        JSON.stringify(searchFilterMovies)
      );
      setLikedMovie(searchFilterMovies);
    } else {
      localStorage.setItem("foundLikedMovies", JSON.stringify(searcCard));
      setLikedMovie(searcCard);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navigation
              navigation={navigation}
              closeNavigation={closeNavigation}
            />
            <Main
              isLogin={isLogin}
              navigation={navigation}
              closeNavigation={closeNavigation}
              openNavigation={openNavigation}
            />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            navigation={navigation}
            closeNavigation={closeNavigation}
            openNavigation={openNavigation}
            isLogin={isLogin}
            cards={cards}
            setFilterText={setFilterText}
            statusPreloader={statusPreloader}
            searchMovies={searchMovies}
            statusFilter={statusFilter}
            handleFilterMovies={handleFilterMovies}
            moviesState={moviesState}
            moviesMessageStatus={moviesMessageStatus}
            errMessage={errMessage}
            handleLikeMovie={handleLikeMovie}
            handleDeleteMovie={handleDeleteMovie}
            component={Movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLogin={isLogin}
            navigation={navigation}
            closeNavigation={closeNavigation}
            openNavigation={openNavigation}
            handleLikeMovie={handleLikeMovie}
            moviesMessageStatus={moviesMessageStatus}
            moviesState={moviesState}
            likedMovie={likedMovie}
            handleDeleteMovie={handleDeleteLikedMovies}
            component={SavedMovies}
            statusFilter={statusFilterLiked}
            handleFilterMovies={handleFilterLikedMovies}
            searchMovies={searchLikedMovies}
            setFilterText={setFilterText}
            errMessage={errMessage}
          />
          <ProtectedRoute
            path="/profile"
            isLogin={isLogin}
            navigation={navigation}
            closeNavigation={closeNavigation}
            openNavigation={openNavigation}
            handleUpdateUser={handleUpdateUser}
            component={Profile}
            handleSignOut={handleSignOut}
            isSuccessReq={isSuccessReq}
            isBadReq={isBadReq}
            messageReq={messageReq}
          />
          <Route path="/signin">
            {isLogin && <Redirect to="/" />}
            <Login handleLogin={handleLogin} errMessage={errMessage} />
          </Route>
          <Route path="/signup">
            {isLogin && <Redirect to="/" />}
            <Register handleRegister={handleRegister} errMessage={errMessage} />
          </Route>
          <Route path="*">
            <PageNotFound history={history} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
