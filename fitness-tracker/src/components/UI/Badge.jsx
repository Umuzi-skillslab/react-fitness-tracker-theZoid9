import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Badge component for displaying labels like difficulty level or category.
 * Dynamically applies CSS class based on the type prop for color coding.
 */
const Badge = ({ label, type = 'beginner' }) => {
  return (
    <span
      className={`${styles.badge} ${styles[type] || ''}`}
      style={styles[type] ? undefined : { backgroundColor: '#f1f5f9', color: '#475569' }}
    >
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Badge;
