import styles from './UI.module.css';

/**
 * Loading indicator component with spinner animation.
 * Displays a centered spinner with optional text message.
 */
const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default Loading;
