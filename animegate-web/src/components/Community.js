import React from 'react';
import { FiMessageSquare, FiAward, FiUsers as FiCommunity } from 'react-icons/fi';
import styles from './Community.module.css';

const Community = () => {
  const features = [
    {
      icon: <FiMessageSquare className={styles.featureIcon} />,
      title: 'Discussion Forums',
      description: 'Join our active community forums to discuss your favorite anime, theories, and recommendations with fellow fans.',
      buttonText: 'Join Discussions'
    },
    {
      icon: <FiAward className={styles.featureIcon} />,
      title: 'Anime Contests',
      description: 'Participate in weekly anime quizzes and contests to win exclusive prizes and showcase your knowledge.',
      buttonText: 'View Contests'
    },
    {
      icon: <FiCommunity className={styles.featureIcon} />,
      title: 'Fan Groups',
      description: 'Connect with fans who share your interests in specific anime genres, series, or characters.',
      buttonText: 'Explore Groups'
    }
  ];

  return (
    <div className={styles.communityContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Anime Community Hub</h1>
        <p className={styles.subtitle}>
          Connect with thousands of anime fans worldwide. Share your thoughts, participate in discussions,
          and join exclusive community events.
        </p>
      </div>
      
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            {feature.icon}
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
            <button className={styles.featureButton}>{feature.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;