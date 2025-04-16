import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPopularMovies,} from "../utils/api";


interface MovieState {
    populerMovies: any[];
    trendingMovies: any[];
    topratedMovies: any[];
    latestMovies: any[];
    upcomingMovies: any[];
    searchResults:any[];
    loading: boolean;
    error: string | null;
   
  }
  
  const initialState: MovieState = {
    populerMovies: [],
    trendingMovies: [],
    topratedMovies: [],
    latestMovies: [],
    upcomingMovies: [],
    searchResults: [],
    loading: false,
    error: null,
   

  };
  
  export const fetchPopulerMovies = createAsyncThunk(
    "movies/fetchPopulerMovies",
    async () => {
        const response = await getPopularMovies();
        return response.data.results;
    }
  );
  export const fetchTrendingMovies = createAsyncThunk(
    'movies/fetchTrending',
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results;
    }
  );;

  export const fetchTopRatedMovies = createAsyncThunk(
    'movies/fetchtoprated',
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results;
    }
  );;

 export const fetchLatestMovies = createAsyncThunk(
    'movies/fetchlatest',
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/latest/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results;
    }
  );;

  export const fetchUpcomingMovies = createAsyncThunk(
    'movies/fetchupcoming',
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results;
    }
  );;

  export const searchMoviesAsync = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
      );
      const data = await response.json();
      return data.results;
    }
  );
  


const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPopulerMovies.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPopulerMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.populerMovies = action.payload;
        })
        .addCase(fetchPopulerMovies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? "Failed to fetch movies";
        })

        .addCase(fetchTrendingMovies.pending, (state) => {
            state.loading = true; 
          })
          .addCase(fetchTrendingMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.trendingMovies = action.payload;
          })
          .addCase(fetchTrendingMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch movies";
          })
          .addCase(fetchTopRatedMovies.pending, (state) => {
            state.loading = true; 
          })
          .addCase(fetchTopRatedMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.topratedMovies= action.payload;
          })
          .addCase(fetchTopRatedMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch movies";
          })
          .addCase(fetchLatestMovies.pending, (state) => {
            state.loading = true; 
          })
          .addCase(fetchLatestMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.latestMovies= action.payload;
          })
          .addCase(fetchLatestMovies.rejected, (state, action) => {
            state.loading = false;  
            state.error = action.error.message || "Failed to fetch movies";
          })
          .addCase(fetchUpcomingMovies.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.upcomingMovies = action.payload;
          })
          .addCase(fetchUpcomingMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch movies";
          })
          .addCase(searchMoviesAsync.pending, (state) => {
            state.loading = true;
          })
          .addCase(searchMoviesAsync.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.searchResults = action.payload;
            state.loading = false;
    });
  },
  });
    
  export default movieSlice.reducer;