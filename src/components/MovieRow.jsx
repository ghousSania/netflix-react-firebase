import MovieCard from "./MovieCard";
import HorizontalScroller from "./HorizontalScroller";

const MovieRow = ({ title, movies, onMovieClick, loading }) => {
  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <div className="mb-8">
      <h2 className="text-[20px] font-semibold mb-0 text-(--text-primary)">
        {title}
      </h2>

      <HorizontalScroller>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="min-w-40" key={i}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies?.map((movie) => (
              <div className="min-w-40" key={movie.id}>
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
