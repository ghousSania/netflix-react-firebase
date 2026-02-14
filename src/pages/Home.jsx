import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from "../store/moviesSlice";
import MovieCard from "../components/MovieCard";
import MovieRow from "../components/MovieRow";
const Home = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.movies.movieCategorires);
  const moviesByCategory = useSelector(
    (state) => state.movies.moviesByCategory,
  );
  const loading = useSelector((state) => state.movies.moviesLoading);
  const error = useSelector((state) => state.movies.moviesError);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleMovieClick = (movie) => {
    console.log(movie);
  };
  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getUpcomingMovies());
    dispatch(getNowPlayingMovies());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  return (
    <>
      <h1 className="text-(--text-primary)">Home Page</h1>
      <button className="text-(--text-primary)" onClick={handleLogout}>
        Logout
      </button>

      <div className="p-6">
        {categories.map((cat) => (
          <MovieRow
            key={cat.key}
            title={cat.label}
            movies={moviesByCategory[cat.key]}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
