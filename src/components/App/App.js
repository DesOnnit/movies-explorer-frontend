import { React, useState, useEffect } from "react";
import Main from "../Main/Main";
import { Switch, Route, useHistory } from "react-router-dom";
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
import "./App.css";
function App() {
  const history = useHistory();
  const [navigation, setNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(12);
  const [nextMovie, setNextMovie] = useState(3);
  const [statusButton, setStatusButton] = useState(false);
  const [statusPreloader, setStatusPreloader] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [moviesState, setMoviesState] = useState(false);
  const [moviesMessageStatus, setMoviesMessageState] = useState(false);
  const [likedMovie, setLikedMovie] = useState([]);
  const [isSuccessReq, setIsSuccessReq] = useState(false);
  const [isBadReq, setIsBadReq] = useState(false);
  const [messageReq, setMessageReq] = useState("");

  //следим за изменением разрешения экрана+отрисовкой кнопки "Еще"
  useEffect(() => {
    window.addEventListener(`resize`, () => {
      adaptive();
    });
    cards.length > numberOfCards
      ? setStatusButton(true)
      : setStatusButton(false);
  }, [numberOfCards, cards]);

  //функция изменения отрисовки карточек и добавления дополнительных в зависимости от разрешения экрана
  function adaptive() {
    let size = window.innerWidth;
    if (size >= 1280) {
      setNumberOfCards(12);
      setNextMovie(3);
    } else if (size >= 768 && size < 1279) {
      setNumberOfCards(8);
      setNextMovie(2);
    } else if (size >= 320 && size < 767) {
      setNumberOfCards(5);
      setNextMovie(2);
    }
  }

  //функция изменения количества отрисовки карточек при нажатии "Еще"
  function handleClickNextMovie(e) {
    e.preventDefault();
    let more = numberOfCards + nextMovie;
    setNumberOfCards(more);
  }

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
        setErrorMessage(err);
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
    localStorage.clear();
    setIsLogin(false);
    history.push("/");
  }

  //если залогинены, получаем данные пользователя + карточки фильмов
  useEffect(() => {
    if (isLogin) {
      api
        .getUser()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
      handleSearch();
      getStartMovies();
      getLikedMovies();
    }
  }, [isLogin]);

  //функция обращения к api фильмов, сохранение данных в локальное храннилище
  function handleSearch() {
    movies
      .searchMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify([...res]));
      })
      .catch(() => {
        setErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
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
        setLikedMovie([...likedMovie, res]);
        let saved = cards.map((card) => {
          if (res.movieId === card.id.toString()) {
            card.isLike = true;
            return card;
          } else {
            return card;
          }
        });
        localStorage.setItem("foundCard", JSON.stringify(saved));
        setCards(saved);
      })
      .catch((err) => console.log(err));
  }
  //переделать то, что связано с локальным хранилищем
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
        localStorage.setItem("foundCard", JSON.stringify(saved));
        setCards(saved);
        let liked = likedMovie.filter((c) => c._id !== card._id);
        localStorage.setItem("likedMovies", JSON.stringify(liked));
        setLikedMovie(liked);
      })
      .catch((err) => console.log(err));
  }

  //функция удаления сохраненного фильма из вкладки фильмов
  function handleDeleteMovie(card) {
    let deleteCard = likedMovie.filter((c) => c.movieId === card.id.toString());
    api.deleteMovie(deleteCard[0]._id).then(() => {
      let liked = likedMovie.filter((c) => c.movieId !== deleteCard[0].movieId);
      setLikedMovie(liked);
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
        setMessageReq(err.message);
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

  //функция получения данных из локального хранилища, отрисовка в стейт карточек результата
  function getLocalStorage() {
    const card = localStorage.getItem("movies");
    return card !== null ? JSON.parse(card) : [];
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
    const searcCard = getLocalStorage().filter((c) =>
      reg.test(c.nameRU || c.nameEN)
    );
    const searchFilterMovies = searcCard.filter((c) => c.duration < 40);
    if (statusFilter === false) {
      localStorage.setItem("foundCard", JSON.stringify(searcCard));
      setCards(searcCard);
    } else {
      localStorage.setItem("foundCard", JSON.stringify(searchFilterMovies));
      setCards(searchFilterMovies);
    }
    setMoviesState(false);
    setStatusPreloader(true);
    setMoviesMessageState(false);
    //пока идет поиск показывается прелоадер
    setTimeout(() => {
      if (searcCard.length < 1) {
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
    const searchFilterMovies = searcCard.filter((c) => c.duration < 40);
    if (statusFilter === false) {
      localStorage.setItem("likedMovies", JSON.stringify(searcCard));
      setLikedMovie(searcCard);
    } else {
      setLikedMovie(searchFilterMovies);
      localStorage.setItem("likedMovies", JSON.stringify(searchFilterMovies));
    }
    setMoviesMessageState(false);
    if (searcCard.length < 1) {
      //Скрыть список фильмов + показать сообщение,что ничего не найдено
      setMoviesState(false);
      setMoviesMessageState(true);
    } else {
      //Показать фильмы
      setMoviesState(true);
    }
  }
  //Изменение кнопки Короткометражки + отрисовка их
  //нужно добавить результаты в локальное хранилище
  function handleFilterMovies() {
    statusFilter === false ? setStatusFilter(true) : setStatusFilter(false);
    const reg = new RegExp(`${filterText}`, "i");
    const searcCard = getLocalStorage().filter((c) => reg.test(c.nameRU));
    const searchFilterMovies = searcCard.filter((c) => c.duration < 40);
    if (statusFilter === false) {
      localStorage.setItem("foundCard", JSON.stringify(searchFilterMovies));
      setCards(searchFilterMovies);
    } else {
      localStorage.setItem("foundCard", JSON.stringify(searcCard));
      setCards(searcCard);
    }
  }

  function handleFilterLikedMovies() {
    statusFilter === false ? setStatusFilter(true) : setStatusFilter(false);
    const reg = new RegExp(`${filterText}`, "i");
    const searcCard = getLocalStorageLikedMovies().filter((c) =>
      reg.test(c.nameRU)
    );
    const searchFilterMovies = searcCard.filter((c) => c.duration < 40);
    if (statusFilter === false) {
      localStorage.setItem("likedMovies", JSON.stringify(searchFilterMovies));
      setLikedMovie(searchFilterMovies);
    } else {
      localStorage.setItem("likedMovies", JSON.stringify(searcCard));
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
            numberOfCards={numberOfCards}
            handleClickNextMovie={handleClickNextMovie}
            statusButton={statusButton}
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
            numberOfCards={numberOfCards}
            likedMovie={likedMovie}
            handleDeleteMovie={handleDeleteLikedMovies}
            component={SavedMovies}
            statusFilter={statusFilter}
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
            <Login handleLogin={handleLogin} errMessage={errMessage} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} errMessage={errMessage} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
