import { React, useState, useEffect } from 'react';
import Main from '../Main/Main';
import { Switch, Route, useHistory } from 'react-router-dom';
import Movies from '../Movies/Movies.js';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';
import * as auth from '../../utils/auth'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import * as api from '../../utils/MainApi';
import * as movies from '../../utils/MoviesApi';
import './App.css';
function App() {
  const history = useHistory();
  const [navigation, setNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(12);
  const [showMore, setShowMore] = useState(3);
  const [statusButton, setStatusButton] = useState(false);
  const [statusPreloader, setStatusPreloader] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [moviesState, setMoviesState] = useState(false);
  const [moviesMessageStatus, setMoviesMessageState] = useState(false);
  const [likedMovie, setLikedMovie] = useState([]);

  //следим за изменением разрешения экрана+отрисовкой кнопки "Еще"
  useEffect(() => {
    window.addEventListener(`resize`, () => {
      adaptive();
    });
    cards.length > numberOfCards ? setStatusButton(true) : setStatusButton(false);
  }, [numberOfCards, cards]);

  //функция изменения отрисовки карточек и добавления дополнительных в зависимости от разрешения экрана
  function adaptive() {
    let size = window.innerWidth;
    if (size >= 1280) {
      setNumberOfCards(12);
      setShowMore(3);
    } else if ((size >= 768) && (size < 1279)) {
      setNumberOfCards(8);
      setShowMore(2);
    } else if ((size >= 320) && (size < 767)) {
      setNumberOfCards(5);
      setShowMore(2);
    }
  }

  //функция изменения количества отрисовки карточек при нажатии "Еще"
  function handleClickShowMore(e) {
    e.preventDefault();
    let more = numberOfCards + showMore;
    setNumberOfCards(more);
  }

  //функции открытия/закрытия окна навигации 
  function openNavigation() {
    setNavigation(true);
  };
  function closeNavigation() {
    setNavigation(false);
  };

  //функция регистрации  
  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  //функция аунтификации  
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          auth.getContent(res)
            .then(() => {
              setIsLogin(true);
              history.push('/movies')
            })
        }
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }
  //проверка токена пользователя
  useEffect(() => {
    tokenCheck()
  }, [])

  //функция проверки токена. Если есть токен, ищем по нему на сервере,если есть совпадение=>аунтификация и переход на страницу с фильмами
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            history.push('/movies')
          }
        })
        .catch((err) => console.log(err))
    }
    history.push('/')
  }

  //функция выхода из системы. Удаляем из локального хранилища переменнве по индификатору,разлогинируемся,переходим на стартовую страницу
  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('likedMovies');
    setIsLogin(false);
    history.push('/');
  }

  //если залогинены, получаем данные пользователя + карточки фильмов 
  useEffect(() => {
    if (isLogin) {
      api.getUser()
        .then((res) => {
          setCurrentUser(res.data)
        })
        .catch((err) => console.log(err));
      handleSearch();
      getStartMovies();
      getLikedMovies()
    }
  }, [isLogin])

  //функция обращения к api фильмов, сохранение данных в локальное храннилище
  function handleSearch() {
    movies.searchMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify([...res]));
      })
      .catch(() => {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
  }

  //функция добавления фильма при лайке
  //после запроса к api на добавление, полученный фильм добавить в стейт сохраненных фильмов
  function handleLikeMovie(data) {
    api.likeMovie(data)
      .then((res) => {
        res.isLike = true;
        localStorage.setItem("likedMovies", JSON.stringify([...likedMovie, res]));//
        setLikedMovie([...likedMovie, res]);
        let saved = cards.map(card => {
          if (res.movieId === card.id.toString()) {
            card.isLike = true;
            return card
          } else {
            return card
          }
        })
        localStorage.setItem("movies", JSON.stringify(saved));
        setCards(saved)
      })
      .catch((err) => console.log(err))
  }

  function handleDeleteLikedMovies(card) {
    api.deleteMovie(card._id)
      .then(() => {
        let saved = cards.map(c => {
          if (card.movieId === c.id.toString()) {
            c.isLike = false
            return c
          } else {
            return c
          }
        })
        localStorage.setItem("movies", JSON.stringify(saved));
        setCards(saved)
        let liked = likedMovie.filter(c => c._id !== card._id)
        localStorage.setItem("likedMovies", JSON.stringify(liked))
        setLikedMovie(liked)
      })
      .catch((err) => console.log(err))
  }

  //функция удаления сохраненного фильма из вкладки фильмов
  function handleDeleteMovie(card) {
    let deleteCard = likedMovie.filter((c) => c.movieId === card.id.toString())
    api.deleteMovie(deleteCard[0]._id)
      .then(() => {
        let liked = likedMovie.filter((c) => c.movieId !== deleteCard[0].movieId)
        setLikedMovie(liked);
        localStorage.setItem("likedMovies", JSON.stringify(liked))
        let saved = cards.map(c => {
          if (card.id === c.id) {
            c.isLike = false
            return c
          } else {
            return c
          }
        })
        localStorage.setItem("movies", JSON.stringify(saved));
        setCards(saved)
      })
  }

  //функция редактирования профиля
  function handleUpdateUser(data) {
    api.updateUser(data.name, data.email)
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getStartMovies() {
    const card = localStorage.getItem('movies');
    setMoviesState(true);
    return setCards(card !== null ? JSON.parse(card) : []);
  }

  function getLikedMovies() {
    const card = localStorage.getItem('likedMovies');
    setMoviesState(true);
    return setLikedMovie(card !== null ? JSON.parse(card) : []);
  }

  //функция получения данных из локального хранилища, отрисовка в стейт карточек результата
  function getLocalStorage() {
    const card = localStorage.getItem('movies');
    return card !== null ? JSON.parse(card) : [];
  }

  function getLocalStorageLikedMovies() {
    const card = localStorage.getItem('likedMovies');
    return card !== null ? JSON.parse(card) : [];
  }

  //функция поиска фильмов (Надо довести до ума)
  function searchMovies() {
    //имея массив card необходимо профильтровать его filterText (получино из инпута поиска)
    const reg = new RegExp(`${filterText}`, 'i')
    const searcCard = getLocalStorage().filter((c) => reg.test(c.nameRU))
    if (statusFilter === false) {
      setCards(searcCard)
    } else {
      setCards(searcCard.filter((c) => (c.duration < 40)))
    }
    setMoviesState(false);
    setStatusPreloader(true);
    setMoviesMessageState(false);
    //пока идет поиск показывается прилоадер
    setTimeout(() => {
      if (searcCard.length < 1) {
        //Скрыть список фильмов + показать сообщение,что ничего не найдено
        setMoviesState(false);
        setMoviesMessageState(true)
      } else {
        //Показать фильмы
        setMoviesState(true);
      }
      setStatusPreloader(false);
    }, 2000)
  }

  function searchLikedMovies() {
    const reg = new RegExp(`${filterText}`, 'i')
    const searcCard = getLocalStorageLikedMovies().filter((c) => reg.test(c.nameRU))
    if (statusFilter === false) {
      setLikedMovie(searcCard)
    } else {
      setLikedMovie(searcCard.filter((c) => (c.duration < 40)))
    }
    setMoviesMessageState(false);
    if (searcCard.length < 1) {
      //Скрыть список фильмов + показать сообщение,что ничего не найдено
      setMoviesState(false);
      setMoviesMessageState(true)
    } else {
      //Показать фильмы
      setMoviesState(true);
    }
  }
  //Изменение кнопки Короткометражки + отрисовка их
  function handleFilterMovies() {
    statusFilter === false ? setStatusFilter(true) : setStatusFilter(false)
    const reg = new RegExp(`${filterText}`, 'i')
    const searcCard = getLocalStorage().filter((c) => reg.test(c.nameRU))
    if (statusFilter === false) {
      setCards(searcCard.filter((c) => (c.duration < 40)))
    } else {
      setCards(searcCard)
    }
  }

  function handleFilterLikedMovies() {
    statusFilter === false ? setStatusFilter(true) : setStatusFilter(false)
    const reg = new RegExp(`${filterText}`, 'i')
    const searcCard = getLocalStorageLikedMovies().filter((c) => reg.test(c.nameRU))
    if (statusFilter === false) {
      setLikedMovie(searcCard.filter((c) => (c.duration < 40)))
    } else {
      setLikedMovie(searcCard)
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
              openNavigation={openNavigation} />
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
            handleClickShowMore={handleClickShowMore}
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
          />
          <Route path="/signin">
            <Login
              handleLogin={handleLogin}
              errMessage={errMessage}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              errMessage={errMessage} />
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
