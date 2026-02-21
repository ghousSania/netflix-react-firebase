const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

/* ---------------- MOVIE LISTS ---------------- */

export const fetchPopularMovies = () => request("/movie/popular");

export const fetchUpcomingMovies = () => request("/movie/upcoming");

export const fetchTopRatedMovies = () => request("/movie/top_rated");

export const fetchNowPlayingMovies = () => request("/movie/now_playing");

/* ---------------- MOVIE DETAILS ---------------- */

export const fetchMovieDetails = (movieId) => request(`/movie/${movieId}`);

export const fetchMovieCredits = (movieId) =>
  request(`/movie/${movieId}/credits`);

/* ---------------- TRAILER ---------------- */

export const fetchMovieTrailer = async (id) => {
  const data = await request(`/movie/${id}/videos`);

  const trailer = data.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  return trailer ? trailer.key : null;
};

/* ---------------- SEARCH ---------------- */

export const searchMoviesByTitle = (query) =>
  request("/search/movie", { query });
