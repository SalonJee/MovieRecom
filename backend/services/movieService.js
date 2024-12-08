import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/movies';

export const movieService = {
  async getPopularMovies(query = '') {
    try {
      const response = await axios.get(`${BASE_URL}/popular`, {
        params: { query }
      });
      
      // Ensure response.data is an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
};