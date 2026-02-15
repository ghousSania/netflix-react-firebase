import { TMDB_IMAGE_BASE_URL } from "../utils/constants";

const CastCard = ({ name, character, profilePath }) => (
  <div
    className="
      min-w-37.5
      bg-[rgba(255,255,255,0.04)]
      border border-[rgba(255,255,255,0.08)]
      rounded-xl p-3
      hover:border-(--primary)
      transition
      snap-item
    "
  >
    {profilePath ? (
      <img
        src={`${TMDB_IMAGE_BASE_URL}/w185${profilePath}`}
        alt={name}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
    ) : (
      <div className="w-full h-44 bg-[rgba(255,255,255,0.06)] rounded-lg mb-3 flex items-center justify-center text-sm text-(--text-muted)">
        No Image
      </div>
    )}

    <p className="font-semibold text-(--text-primary) truncate">{name}</p>

    <p className="text-(--text-muted) text-sm truncate">{character}</p>
  </div>
);

export default CastCard;
