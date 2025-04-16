import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMoviesAsync } from '../redux/movieSlice';
import { AppDispatch } from '../redux/store';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard'; // Assuming you already use this

// Types
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number | null;
}

interface RootState {
  movies: {
    searchResults: Movie[];
    loading: boolean;
    error: string | null;
  };
}

// Custom hook for getting query param
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={gridStyle}>
      {searchResults.length > 0 ? (
        searchResults.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <h3>No movies found for "{searchQuery}"</h3>
      )}
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  padding: '20px',
};

export default Search;
