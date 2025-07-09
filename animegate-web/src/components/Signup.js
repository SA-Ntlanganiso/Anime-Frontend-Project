import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChrome } from 'react-icons/fi';
import styles from './Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreeTerms) {
      alert("You must agree to the terms!");
      return;
    }
    // Registration logic would go here
    navigate('/login');
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h1 className={styles.signupTitle}>Create Account</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Username</label>
            <input
              type="text"
              name="username"
              className={styles.inputField}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              name="email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={styles.inputField}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">I agree to the <a href="#terms">Terms and Conditions</a></label>
          </div>
          
          <button type="submit" className={styles.signupButton}>Sign Up</button>
        </form>
        
        <div className={styles.divider}>or sign up with</div>
        
        <button className={styles.googleButton}>
          <FiChrome /> Google
        </button>
        
        <p className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;