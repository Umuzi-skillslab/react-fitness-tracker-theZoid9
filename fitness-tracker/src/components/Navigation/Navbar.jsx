import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

/**
 * Navigation bar component with responsive hamburger menu.
 * Highlights the active route using useLocation.
 * Uses 6+ nav links, demonstrates active route styling.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links configuration — single source of truth for routes
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/workout-planner', label: 'Planner' },
    { path: '/history', label: 'History' },
    { path: '/progress', label: 'Progress' },
  ];

  // Toggle mobile menu open/close
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Determine if a link is active based on current path
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo / brand link */}
        <Link to="/" className={styles.navLogo}>
          <span>🏋️</span>
          <span>FitTracker</span>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className={styles.hamburger}
          onClick={handleToggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
