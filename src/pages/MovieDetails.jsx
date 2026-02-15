import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieTrailer,
} from "../services/tmdb";
import { TMDB_IMAGE_BASE_URL } from "../utils/constants";
import Container from "../components/container";
import InfoItem from "../components/InfoItem";
import CastCard from "../components/CastCard";
import { FaStar } from "react-icons/fa";
import Button from "../components/Button";
import HorizontalScroller from "../components/HorizontalScroller";
import TrailerModal from "../components/TrailerModal";

const MovieDetails = () => {
  const { id } = useParams();
  // State variables
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch trailer key when user clicks "Watch Trailer"
  const handleWatchTrailer = async () => {
    setShowTrailer(true);

    if (!trailerKey) {
      try {
        setTrailerLoading(true);
        const key = await fetchMovieTrailer(id);
        setTrailerKey(key);
      } catch {
        setTrailerKey(null);
      } finally {
        setTrailerLoading(false);
      }
    }
  };
  // Fetch movie details and credits on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const [movieData, castData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
        ]);
        setMovie(movieData);
        setCast(castData.cast);
      } catch (err) {
        setError(`Failed to load movie details ${err.message}`);
      }
    };

    getData();
  }, [id]);

  if (!movie) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center">{error}</div>;

  return (
    <Container className="py-6 sm:py-8 px-4 sm:px-6">
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 md:col-span-5 space-y-5 sm:space-y-6">
          {/* Poster */}
          <img
            src={`${TMDB_IMAGE_BASE_URL}/w300${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg object-cover max-h-105 md:max-h-none"
          />

          {/* Info Box */}
          <div className="bg-[#16213e] border border-[#24304f] rounded-xl p-4 sm:p-6 space-y-4 shadow-lg">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <InfoItem label="Status" value={movie.status} />
              <InfoItem label="Runtime" value={`${movie.runtime} min`} />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <InfoItem
                label="Budget"
                value={`$${movie.budget?.toLocaleString()}`}
              />
              <InfoItem
                label="Revenue"
                value={`$${movie.revenue?.toLocaleString()}`}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-7 space-y-5 sm:space-y-6 text-(--text-primary)">
          {/* Year + Rating */}
          <div className="flex flex-wrap items-center gap-3 text-(--text-muted) text-sm sm:text-base">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <div className="flex items-center">
              <FaStar className="text-orange-400 text-sm sm:text-[18px] mr-1" />
              {movie.vote_average
                ? `${movie.vote_average.toFixed(1)} / 10`
                : "N/A"}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {movie.title}
          </h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="italic text-sm sm:text-base text-(--text-muted)">
              {movie.tagline}
            </p>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  bg-[rgba(255,255,255,0.05)]
                  border border-[rgba(255,255,255,0.08)]
                  px-2 sm:px-3 py-1
                  rounded-full text-xs sm:text-sm
                  text-(--text-primary)
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Trailer Button */}
          <Button
            className=" px-6 py-3 font-semibold"
            onClick={handleWatchTrailer}
            loading={trailerLoading}
          >
            Watch Trailer
          </Button>

          {/* Overview */}
          <div>
            <h2 className="text-lg sm:text-xl border-l-4 border-(--primary) pl-3 font-semibold mb-2">
              Overview
            </h2>
            <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Top Billed Cast
            </h2>

            <HorizontalScroller>
              {cast.length === 0 ? (
                <p className="text-(--text-muted) px-2">No cast available</p>
              ) : (
                cast
                  .slice(0, 8)
                  .map((actor) => (
                    <CastCard
                      key={actor.id}
                      name={actor.name}
                      character={actor.character}
                      profilePath={actor.profile_path}
                    />
                  ))
              )}
            </HorizontalScroller>
          </div>
        </div>
      </div>
      {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={trailerKey}
        loading={trailerLoading}
      />
    </Container>
  );
};

export default MovieDetails;
