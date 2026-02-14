import { TMDB_IMAGE_BASE_URL } from "../utils/constants";
const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-40 shrink-0 cursor-pointer hover:scale-105 transition"
    >
      <img
        src={`${TMDB_IMAGE_BASE_URL}w500/${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg"
      />
      <p className="mt-2 text-md text-center text-(--text-primary)">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
