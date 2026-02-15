import MovieCard from "./MovieCard";
import HorizontalScroller from "./HorizontalScroller";

const MovieRow = ({ title, movies, onMovieClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-(--text-primary)">
        {title}
      </h2>

      <HorizontalScroller>
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </HorizontalScroller>
    </div>
  );
};

export default MovieRow;
