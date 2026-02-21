import { useNavigate } from "react-router-dom";
import { suggestions } from "../utils/constants";
const SearchSuggestions = () => {
  const navigate = useNavigate();

  const handleClick = (text) => {
    navigate(`/search?query=${encodeURIComponent(text)}`);
  };

  return (
    <div className="mt-5 w-full  max-w-3xl mx-auto">
      <div
        className="
          flex gap-3
          overflow-x-auto
          no-scrollbar
          pb-2
        "
      >
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className="
              whitespace-nowrap
             px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm
              rounded-full
              border
              border-white/20
              bg-white/5
              hover:bg-white/15
              hover:border-white/40
              transition
              backdrop-blur-sm
              cursor-pointer
            "
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
