// Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import styles from './Search.module.css';

const Search = ({ setAnimeData, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a valid search term.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw=true`);

      if (response.data.data.length === 0) {
        alert('No anime found for the given search term.');
        setAnimeData([]);
      } else {
        const formattedData = response.data.data.map(anime => ({
          mal_id: anime.mal_id,
          title: anime.title || 'No title available',
          title_english: anime.title_english || anime.title,
          synopsis: anime.synopsis || 'No synopsis available',
          images: anime.images,
          trailer_url: anime.trailer?.url || null,
          score: anime.score || 'N/A',
          episodes: anime.episodes || 'Unknown',
          status: anime.status || 'Unknown',
          rating: anime.rating || 'Unknown'
        }));
        setAnimeData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching anime data:', error);
      alert('Error fetching data. Please try again later.');
      setAnimeData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for anime..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FiSearch className={styles.searchIcon} />
        </button>
      </div>
    </form>
  );
};

export default Search;