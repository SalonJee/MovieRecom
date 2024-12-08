import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/Searchbar/SearchBar";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { movieService } from "../../../backend/services/movieService";
import toast from 'react-hot-toast';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const movies = await movieService.getPopularMovies(query);
      setMovies(movies);
    } catch (error) {
      console.error('Detailed Error:', error);
      setError(error.message || 'Unable to fetch movies. Please try again.');
      toast.error(error.message || 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);

  const handleSearch = (query) => {
    fetchMovies(query);
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navbar />
      
      <div className="pt-24 pb-6">
        <SearchBar onSearch={handleSearch} />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading movies...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-6">{error}</div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Home;