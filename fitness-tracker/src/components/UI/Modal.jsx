import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Reusable Modal component using children prop for composition.
 * Renders an overlay with a centered content panel and close button.
 */
const Modal = ({ children, isOpen, onClose, title }) => {
  // Conditionally render the entire modal based on isOpen state
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        // Close modal when clicking the overlay background
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {title && <h2 className={styles.modalTitle} id="modal-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
