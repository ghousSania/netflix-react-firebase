import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, onMovieClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-5 text-(--text-primary)">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
