import { useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../utils/constants";
const MovieCard = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        {/* IMAGE */}
        {imageUrl && !imageError && (
          <img
            src={imageUrl}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* STATIC PLACEHOLDER  */}
        {imageUrl && !imageError && (
          <div
            className={`absolute inset-0 bg-gray-800 transition-opacity duration-400 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* FALLBACK IF IMAGE FAILS */}
        {!imageUrl && (
          <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-gray-800 to-gray-900 text-gray-400">
            <p className="text-xs px-3 text-center">Poster not available</p>
          </div>
        )}
        {imageError && (
          <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-gray-800 to-gray-900 text-gray-400">
            <p className="text-xs px-3 text-center"></p>
          </div>
        )}
      </div>
      <p className=" px-2 py-1.5 text-sm text-left text-(--text-primary) bg-white/5  truncate">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;
