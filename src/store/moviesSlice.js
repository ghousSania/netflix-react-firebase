import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
} from "../services/tmdb";

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async (_, { getState }) => {
    const state = getState();
    const existing = state.movies.moviesByCategory.popular;

    if (existing && existing.length > 0) {
      return existing; // no API call
    }

    const data = await fetchPopularMovies();
    return data.results;
  },
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  async (_, { getState }) => {
    const state = getState();
    const existing = state.movies.moviesByCategory.upcoming;

    if (existing && existing.length > 0) {
      return existing; // no API call
    }

    const data = await fetchUpcomingMovies();
    return data.results;
  },
);

export const getTopRatedMovies = createAsyncThunk(
  "movies/getTopRatedMovies",
  async (_, { getState }) => {
    const state = getState();
    const existing = state.movies.moviesByCategory.topRated;

    if (existing && existing.length > 0) {
      return existing; // no API call
    }

    const data = await fetchTopRatedMovies();
    return data.results;
  },
);

export const getNowPlayingMovies = createAsyncThunk(
  "movies/getNowPlayingMovies",
  async (_, { getState }) => {
    const state = getState();
    const existing = state.movies.moviesByCategory.nowPlaying;

    if (existing && existing.length > 0) {
      return existing; // no API call
    }

    const data = await fetchNowPlayingMovies();
    return data.results;
  },
);
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movieCategorires: [
      { key: "popular", label: "Popular" },
      { key: "topRated", label: "Top Rated" },
      { key: "upcoming", label: "Upcoming" },
      { key: "nowPlaying", label: "Now Playing" },
    ],
    moviesByCategory: {},
    selectedMovie: null,
    moviesLoading: false,
    moviesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // popular
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.moviesByCategory["popular"] = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.error.message;
      });
    // top rated
    builder
      .addCase(getTopRatedMovies.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.moviesByCategory["topRated"] = action.payload;
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.error.message;
      });
    // upcoming
    builder
      .addCase(getUpcomingMovies.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.moviesByCategory["upcoming"] = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.error.message;
      });
    // now playing
    builder
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.moviesByCategory["nowPlaying"] = action.payload;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
