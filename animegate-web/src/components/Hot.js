import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Hot.module.css';

const Hot = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=airing');
        const formattedData = response.data.data.slice(0, 6).map(anime => ({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/300x450?text=No+Image',
          rating: anime.score || 'N/A',
          status: 'Trending'
        }));
        setTrendingAnime(formattedData);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading trending anime...</p>
      </div>
    );
  }

  return (
    <div className={styles.hotContainer}>
      <h1 className={styles.sectionTitle}>Hot & Trending Anime</h1>
      
      <div className={styles.animeGrid}>
        {trendingAnime.map(anime => (
          <div key={anime.id} className={styles.animeCard}>
            <img 
              src={anime.image} 
              alt={anime.title} 
              className={styles.animeImage} 
              loading="lazy"
            />
            <div className={styles.animeBadge}>{anime.status}</div>
            <div className={styles.animeInfo}>
              <h3 className={styles.animeTitle}>{anime.title}</h3>
              <div className={styles.animeRating}>
                ⭐ {anime.rating}
              </div>
              <Link to={`/anime/${anime.id}`} className={styles.watchButton}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hot;