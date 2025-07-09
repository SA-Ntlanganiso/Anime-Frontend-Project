import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiHome, FiZap, FiUsers, FiInfo, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Add any additional logout logic here (e.g., clearing tokens)
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>AG</div>
          <span className={styles.logoText}>AnimeGate</span>
        </Link>
        
        <ul className={styles.navLinks}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              end
            >
              <FiHome className={styles.navIcon} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/hot" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              <FiZap className={styles.navIcon} />
              <span>Hot</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              <FiUsers className={styles.navIcon} />
              <span>Community</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              <FiInfo className={styles.navIcon} />
              <span>About</span>
            </NavLink>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                  }
                >
                  <FiLogIn className={styles.navIcon} />
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                  }
                >
                  <FiUserPlus className={styles.navIcon} />
                  <span>Signup</span>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button 
                onClick={handleLogout}
                className={`${styles.navLink} ${styles.logoutButton}`}
              >
                <FiLogOut className={styles.navIcon} />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;