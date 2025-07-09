import React from 'react';
import styles from './About.module.css';

const About = () => {
  
 
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>About AnimeGate</h1>
        <p className={styles.description}>
          AnimeGate was founded in 2020 with the mission to create the ultimate destination for anime fans worldwide.
          We provide a comprehensive platform for discovering, watching, and discussing anime with a passionate community.
        </p>
      </div>
      
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Our Mission</h3>
          <p className={styles.featureDescription}>
            To make anime accessible to everyone while maintaining the highest quality standards
            and fostering a positive community for fans to connect.
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Our Vision</h3>
          <p className={styles.featureDescription}>
            To become the most trusted and comprehensive anime platform that celebrates
            anime culture and supports creators and fans alike.
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Our Values</h3>
          <p className={styles.featureDescription}>
            Passion for anime, commitment to quality, respect for the community,
            and continuous innovation to serve our users better.
          </p>
        </div>
      </div>
      
      
    </div>
  );
};

export default About;