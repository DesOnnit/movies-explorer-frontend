import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css';
function SearchForm(props) {
    const [value, setValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const handleChange = (e) => {
        setValue(e.target.value);
        props.setFilterText(e.target.value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (value === '') {
            setValue('Нужно ввести ключевое слово');
        } else {
            props.searchMovies();
            setIsDisabled(true);
            setTimeout(() => setIsDisabled(false), 2000)
        }
    }
    return (
        <div>
            <form className="search-form">
                <input type="text" name="search" id="search" disabled={isDisabled} value={value} onChange={handleChange} placeholder="Фильм" required className="search-form__input" />
                <button type="submit" className="search-form__btn" disabled={isDisabled} onClick={handleClick}>Найти</button>
            </form>
            <div className="search-form__checkbox">
                <FilterCheckbox
                    statusFilter={props.statusFilter}
                    handleFilterMovies={props.handleFilterMovies} />
                <p className="search-form__checkbox_text">Короткометражки</p>
            </div>
            <hr className="search-form__line" />
        </div>
    )
}
export default SearchForm;