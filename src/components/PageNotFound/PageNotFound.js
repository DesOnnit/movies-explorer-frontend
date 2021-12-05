import { Link } from 'react-router-dom';
import './PageNotFound.css';
function PageNotFound() {
    return (
        <div className="page-not-found">
            <p className="page-not-found__title">404</p>
            <p className="page-not-found__subtitle">
                Страница не найдена
            </p>
            <Link to="/" className="page-not-found__link">Назад</Link>
        </div>
    )
}
export default PageNotFound;