import React from 'react';
import Main from '../Main/Main'
import { Switch, Route } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

function App() {

  const [navigation, setNavigation] = React.useState(false);

  function openNavigation(){
    setNavigation(true);
  };

  function closeNavigation(){
    setNavigation(false);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Navigation
          navigation={navigation}
          closeNavigation={closeNavigation}
           />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Navigation 
          navigation={navigation}
          closeNavigation={closeNavigation}/>
          <Header
          openNavigation={openNavigation} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Navigation
          navigation={navigation}
          closeNavigation={closeNavigation} />
          <Header
          openNavigation={openNavigation}  />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Navigation
          navigation={navigation}
          closeNavigation={closeNavigation} />
          <Header
          openNavigation={openNavigation} />
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
