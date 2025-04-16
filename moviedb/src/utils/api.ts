import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
    headers: {
        'Content-Type': 'application/json',

    },
});
export const getPopularMovies = ()=> api.get('/movie/popular');

export const getTrendingMovies = () => api.get(`/trending/movie/day`);

export const getTopRatedMovies = () => api.get(`/movie/top_rated`);

export const getLatestMovies = () => api.get(`/movie/latest`);

export const getUpcomingMovies = () => api.get(`/movie/upcoming`);

export default api;