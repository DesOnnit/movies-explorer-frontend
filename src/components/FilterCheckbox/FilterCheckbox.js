import './FilterCheckbox.css';
function FilterCheckbox() {
    return (
        <label className="filterCheckbox">
            <input type="checkbox" className="filterCheckbox__input" />
            <span className="filterCheckbox__slider" />
        </label>
    )
}
export default FilterCheckbox;