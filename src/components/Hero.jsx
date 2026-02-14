import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../utils/constants";
import Button from "./Button";
const Hero = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  const { id, title, overview, backdrop_path, vote_average } = movie;

  const imageUrl = `${TMDB_IMAGE_BASE_URL}original${backdrop_path}`;

  //   Handler for "More Info" and "Watch Trailer" button
  const handleNavigateToDetails = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-cover bg-center flex items-center mb-6"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#2a6aee]/40 via-black/50 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-white">
        {/* Star Rating */}
        <div className="flex items-center  gap-2 mb-3">
          <FaStar className="text-orange-400 text-1xl sm:text-2xl" />
          <span className="text-md sm:text-lg font-semibold">
            {vote_average?.toFixed(1)}
          </span>
        </div>
        {/* Movie Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-4">
          {title}
        </h1>
        {/* Description */}
        <p className="max-w-2xl text-sm sm:text-base text-gray-300 mb-6 line-clamp-3">
          {overview}
        </p>
        {/* Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleNavigateToDetails} className=" rounded-lg">
            Watch Trailer
          </Button>

          <Button
            variant="light"
            onClick={handleNavigateToDetails}
            className=" rounded-lg"
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
