import HeaderPromo from '../HeaderPromo/HeaderPromo';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './Main.css'
function Main(props) {
    return (
        <div>
            <Navigation
                navigation={props.navigation}
                closeNavigation={props.closeNavigation} />
            {props.isLogin ?
                <Header
                    isLogin={props.isLogin}
                    openNavigation={props.openNavigation}
                /> :
                <HeaderPromo />}
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </div>
    );
}

export default Main;