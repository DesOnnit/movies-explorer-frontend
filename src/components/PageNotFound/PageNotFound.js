import './PageNotFound.css';
function PageNotFound({history}) {

    function handleGoBack(){
        history.goBack();
    }

    return (
        <div className="page-not-found">
            <p className="page-not-found__title">404</p>
            <p className="page-not-found__subtitle">
                Страница не найдена
            </p>
            <button type="button" className="page-not-found__link" onClick={handleGoBack}>Назад</button>
        </div>
    )
}
export default PageNotFound;