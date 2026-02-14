import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from "../store/moviesSlice";
import MovieRow from "../components/MovieRow";
import Container from "../components/container";
const Home = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.movies.movieCategorires);
  const moviesByCategory = useSelector(
    (state) => state.movies.moviesByCategory,
  );
  const loading = useSelector((state) => state.movies.moviesLoading);
  const error = useSelector((state) => state.movies.moviesError);

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
      <Container>
        <div>
          {categories.map((cat) => (
            <MovieRow
              key={cat.key}
              title={cat.label}
              movies={moviesByCategory[cat.key]}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
