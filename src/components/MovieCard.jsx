import { useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../utils/constants";
const MovieCard = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);
  // Use poster first, fallback to backdrop
  const imagePath = movie.poster_path || movie.backdrop_path || null;

  const imageUrl = imagePath ? `${TMDB_IMAGE_BASE_URL}w500/${imagePath}` : null;

  return (
    <div
      onClick={onClick}
      className="w-full mx-auto mt-5 snap-item shrink-0 cursor-pointer hover:scale-105 transition"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-2/3 rounded-lg overflow-hidden bg-[#0e172a]">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={movie.title}
            className="rounded-lg w-full h-full"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          /* FALLBACK UI */
          <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-gray-800 to-gray-900 text-gray-400">
            <p className="text-xs mt-2 px-3 text-center">
              Poster not available
            </p>
          </div>
        )}
      </div>
      <p className="mt-2 text-md text-center text-(--text-primary)">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
