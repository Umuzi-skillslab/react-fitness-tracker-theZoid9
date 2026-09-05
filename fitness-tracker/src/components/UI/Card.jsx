import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Reusable Card component using composition pattern with children prop.
 * Wraps content in a styled container with consistent padding and shadow.
 */
const Card = ({ children, className = '', title, onClick, hoverable = false }) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      onClick={onClick}
      style={hoverable ? { cursor: 'pointer' } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {title && <h3 className={styles.cardHeader}>{title}</h3>}
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

export default Card;