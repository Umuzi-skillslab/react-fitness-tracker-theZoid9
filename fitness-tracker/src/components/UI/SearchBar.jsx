import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Search bar component with icon, supporting search, change, focus, and blur events.
 * Uses controlled input pattern with value/onChange props.
 */
const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search exercises...',
  onFocus,
  onBlur,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // Handle form submit to trigger search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>

      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-label="Search exercises"
      />
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SearchBar;
