import './FilterCheckbox.css';
function FilterCheckbox(props) {
    return (
        <label className="filterCheckbox">
            <input type="checkbox" className="filterCheckbox__input"  onChange={props.handleFilterMovies} checked={props.statusFilter}/>
            <span className="filterCheckbox__slider" />
        </label>
    )
}
export default FilterCheckbox;