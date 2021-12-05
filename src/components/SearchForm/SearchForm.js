import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css';
function SearchForm() {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" name="search" id="search" value={value} onChange={handleChange} placeholder="Фильм" required className="search-form__input" />
                <button type="submit" className="search-form__btn">Найти</button>
            </form>
            <div className="search-form__checkbox">
                <FilterCheckbox />
                <p className="search-form__checkbox_text">Короткометражки</p>
            </div>
            <hr className="search-form__line" />
        </div>
    )
}
export default SearchForm;