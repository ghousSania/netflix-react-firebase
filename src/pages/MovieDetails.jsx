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
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import usePageTitle from "../utils/usePageTitle";
const MovieDetails = () => {
  const { id } = useParams();
  // State variables
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageTitle(`${movie?.title || "Movie Details"} - Nova Movies`);
  // Fetch trailer key when user clicks "Watch Trailer"
  const handleWatchTrailer = async () => {
    setShowTrailer(true);

    if (!trailerKey) {
      try {
        setTrailerLoading(true);
        const key = await fetchMovieTrailer(id);
        if (!key) {
          setTrailerKey(null);
        } else {
          setTrailerKey(key);
        }
      } catch {
        setTrailerKey(null);
      } finally {
        setTrailerLoading(false);
      }
    }
  };
  // Scroll to top when movie ID changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);
  // Fetch movie details and credits on component mount
  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Movie not found");
      setLoading(false);
      return;
    }

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        setMovie(null);
        setCast([]);

        const [movieData, castData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
        ]);

        setMovie(movieData);
        setCast(castData?.cast || []);
      } catch (err) {
        if (err?.message?.includes("404")) {
          setError("Movie not found.");
        } else {
          setError("We couldn't load this movie right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <MovieDetailsSkeleton />;

  if (error) {
    return (
      <Container className="py-20 text-center">
        <div className="bg-[#16213e] border border-[#24304f] p-8 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-white">
            Something went wrong
          </h2>
          <p className="text-red-400">{error}</p>
        </div>
      </Container>
    );
  }

  if (!movie) return <div className="p-6 text-center">Movie not found.</div>;

  return (
    <Container className="py-10 sm:py-10 px-4 sm:px-6">
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 md:col-span-5 space-y-5 sm:space-y-6">
          {/* Poster */}
          <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden bg-gray-900">
            {movie.backdrop_path || movie.poster_path ? (
              <img
                src={`${TMDB_IMAGE_BASE_URL}/w500${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-60 md:h-72 bg-linear-to-br from-gray-800 to-gray-900 text-gray-400">
                <p className="text-xs px-3 text-center">Poster not available</p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-[#16213e] border border-[#24304f] rounded-xl p-4 sm:p-6 space-y-4 shadow-lg">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <InfoItem label="Status" value={movie.status} />
              <InfoItem label="Runtime" value={`${movie.runtime} min`} />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <InfoItem
                label="Budget"
                value={
                  movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "N/A"
                }
              />
              <InfoItem
                label="Revenue"
                value={
                  movie.revenue > 0
                    ? `$${movie.revenue.toLocaleString()}`
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 md:col-span-7 space-y-2 sm:space-y-4 text-(--text-primary)">
          {/* Year + Rating */}
          <div className="flex flex-wrap items-center gap-3 text-(--text-muted) text-sm sm:text-base">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <div className="flex items-center">
              <FaStar className="text-orange-400 text-sm sm:text-[18px] mr-1" />
              {movie.vote_average != null
                ? `${movie.vote_average.toFixed(1)} / 10`
                : "N/A"}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            {movie.title}
          </h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="italic text-sm sm:text-base text-(--text-muted)">
              {movie.tagline}
            </p>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-2 sm:gap-3 my-4">
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
            // loading={trailerLoading}
            // disabled={trailerLoading}
          >
            Watch Trailer
          </Button>

          {/* Overview */}
          <div>
            <h2 className="text-lg sm:text-xl border-l-4 border-(--primary) pl-3 font-semibold my-4 sm:my-6">
              Overview
            </h2>
            <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
              {movie.overview || "No overview available."}
            </p>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="my-4 sm:my-6">
              <h2 className="text-lg sm:text-xl  font-semibold my-4 sm:my-6">
                Top Billed Cast
              </h2>

              <HorizontalScroller>
                {cast.slice(0, 8).map((actor) => (
                  <CastCard
                    key={actor.id}
                    name={actor.name}
                    character={actor.character}
                    profilePath={actor.profile_path}
                  />
                ))}
              </HorizontalScroller>
            </div>
          )}
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
