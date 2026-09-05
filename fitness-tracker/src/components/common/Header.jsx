import styles from './common.module.css';

/**
 * Page header component used on the home page.
 * Displays a gradient banner with title and subtitle.
 */
const Header = ({ title = 'FitTracker Pro', subtitle = 'Your personal fitness companion' }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
    </header>
  );
};

export default Header;
