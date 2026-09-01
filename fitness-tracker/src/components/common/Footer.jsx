import styles from './common.module.css';

/**
 * Footer component displayed at the bottom of every page.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        FitTracker Pro — Built with React | {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
