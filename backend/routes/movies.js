const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

router.get('/popular', async (req, res) => {
  try {
    const { query } = req.query;
    
    const endpoint = query 
      ? `${TMDB_BASE_URL}/search/movie`
      : `${TMDB_BASE_URL}/movie/popular`;

    const response = await axios.get(endpoint, {
      params: {
        api_key:TMDB_API_KEY,
        query: query || undefined,
        language: 'en-US',
        include_adult: false,
        page: 1
      }
    });

    const transformedMovies = response.data.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null
    }));

    res.status(200).json(transformedMovies);
  } catch (error) {
    console.error('Movie Fetch Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch movies', 
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;