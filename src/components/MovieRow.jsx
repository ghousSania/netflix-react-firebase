import MovieCard from "./MovieCard";
import HorizontalScroller from "./HorizontalScroller";

const MovieRow = ({ title, movies, onMovieClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-[20px] font-semibold mb-0 text-(--text-primary)">
        {title}
      </h2>

      <HorizontalScroller>
        {movies?.map((movie) => (
          <div className="min-w-40">
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
};

export default MovieRow;
