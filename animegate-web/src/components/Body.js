import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlay, FiX } from 'react-icons/fi';
import styles from './Body.module.css';

const Body = ({ loading, animeData, setLoading, setAnimeData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Sample anime images for carousel
  const carouselImages = [
    { name: 'demon-slayer', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' },
    { name: 'attack-on-titan', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' },
    { name: 'jujutsu-kaisen', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' },
    { name: 'one-piece', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' },
    { name: 'naruto', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' },
    { name: 'my-hero-academia', url: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d' }
  ];

  // Fetch trending anime on component mount
  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
        const data = await response.json();
        setTrendingAnime(data.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  // Carousel auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const fetchAnimeData = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true`);
      const data = await response.json();
      
      const formattedData = data.data.map(anime => ({
        mal_id: anime.mal_id,
        title: anime.title,
        title_english: anime.title_english,
        synopsis: anime.synopsis,
        images: anime.images,
        score: anime.score,
        episodes: anime.episodes,
        status: anime.status,
        rating: anime.rating,
        trailer_url: anime.trailer?.url
      }));
      
      setAnimeData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching anime data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchAnimeData(searchQuery);
    }
  };

  const handleWatch = (anime) => {
    setSelectedVideo(anime.trailer_url || `https://myanimelist.net/anime/${anime.mal_id}`);
  };

  // Get current carousel images (4 at a time)
  const currentImages = carouselImages.slice(
    currentCarouselIndex, 
    Math.min(currentCarouselIndex + 4, carouselImages.length)
  ).concat(
    currentCarouselIndex + 4 > carouselImages.length ? 
    carouselImages.slice(0, (currentCarouselIndex + 4) % carouselImages.length) : 
    []
  );

  return (
    <div className={styles.bodyContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to AnimeGate!</h1>
        <p className={styles.heroSubtitle}>Your one-stop destination for all things anime!</p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FiSearch />
          </button>
        </form>
      </div>

    
      {/* Content Section */}
      <div className={styles.contentSection}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {animeData.length > 0 ? (
              <>
                <h2 className={styles.sectionTitle}>Search Results</h2>
                <div className={styles.animeGrid}>
                  {animeData.map((anime) => (
                    <div key={anime.mal_id} className={styles.animeCard}>
                      <img
                        src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x450?text=No+Image'}
                        alt={anime.title}
                        className={styles.animeImage}
                      />
                      <div className={styles.animeInfo}>
                        <h3 className={styles.animeTitle}>{anime.title_english || anime.title}</h3>
                        <p className={styles.animeScore}>⭐ {anime.score || 'N/A'}</p>
                        <p className={styles.animeSynopsis}>
                          {anime.synopsis ? `${anime.synopsis.substring(0, 100)}...` : 'No synopsis available'}
                        </p>
                        <button
                          onClick={() => handleWatch(anime)}
                          className={styles.watchButton}
                        >
                          <FiPlay /> Watch Trailer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.sectionTitle}>Trending Now</h2>
                <div className={styles.animeGrid}>
                  {trendingAnime.map((anime) => (
                    <div key={anime.mal_id} className={styles.animeCard}>
                      <img
                        src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x450?text=No+Image'}
                        alt={anime.title}
                        className={styles.animeImage}
                      />
                      <div className={styles.animeInfo}>
                        <h3 className={styles.animeTitle}>{anime.title_english || anime.title}</h3>
                        <p className={styles.animeScore}>⭐ {anime.score || 'N/A'}</p>
                        <button
                          onClick={() => handleWatch(anime)}
                          className={styles.watchButton}
                        >
                          <FiPlay /> Watch Trailer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className={styles.videoModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Now Playing</h2>
              <button onClick={() => setSelectedVideo(null)} className={styles.closeButton}>
                <FiX />
              </button>
            </div>
            <div className={styles.videoContainer}>
              {selectedVideo.includes('youtube') ? (
                <iframe
                  src={`${selectedVideo}?autoplay=1`}
                  title="Anime Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className={styles.noTrailer}>
                  <p>No trailer available. Redirecting to MyAnimeList...</p>
                  <a href={selectedVideo} target="_blank" rel="noopener noreferrer">
                    View on MyAnimeList
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;