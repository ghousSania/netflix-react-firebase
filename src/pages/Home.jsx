import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from "../store/moviesSlice";
import MovieRow from "../components/MovieRow";
import Container from "../components/container";
import Hero from "../components/hero";
import HeroSkeleton from "../components/HeroSkeleton";
import MovieRowSkeleton from "../components/MovieRowSkeleton";
import usePageTitle from "../utils/usePageTitle";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.movies.movieCategorires);
  const moviesByCategory = useSelector(
    (state) => state.movies.moviesByCategory,
  );
  const loading = useSelector((state) => state.movies.moviesLoading);
  const error = useSelector((state) => state.movies.moviesError);
  usePageTitle("Home - Nova Movies");
  const handleMovieClick = (movie) => {
    if (!movie?.id) return;
    navigate(`/movie/${movie.id}`);
  };

  const featuredMovie = moviesByCategory.popular?.[0] || null;
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getUpcomingMovies());
    dispatch(getNowPlayingMovies());
  }, [dispatch]);

  if (error) return <div>{error}</div>;
  return (
    <>
      {loading ? <HeroSkeleton /> : <Hero movie={featuredMovie} />}
      <Container>
        <div className="mt-10">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) =>
              loading ? (
                <MovieRowSkeleton key={cat.key} />
              ) : (
                <MovieRow
                  title={cat.label}
                  movies={moviesByCategory?.[cat.key] || []}
                  onMovieClick={handleMovieClick}
                  loading={loading}
                />
              ),
            )
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
