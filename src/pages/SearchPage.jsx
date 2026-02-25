import { useMemo, useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Container from "../components/container";
import { useNavigate, useLocation } from "react-router-dom";
import SearchSuggestions from "../components/SearchSuggestions";
import { useMovieSearch } from "../utils/useMovieSearch";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import usePageTitle from "../utils/usePageTitle";
const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  /* Extract query from URL. */
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("query")?.trim() || "";
  }, [location.search]);

  const { results, loading, error } = useMovieSearch(query, searchTrigger);

  const hasSearched = Boolean(query);
  usePageTitle(`Search - Nova Movies`);
  /* Keep input field in sync with URL */
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  /* Trigger search by updating URL */
  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (trimmed === query) {
      // Same query , force re-search
      setSearchTrigger((prev) => prev + 1);
    } else {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };
  /* Navigate to movie details page */
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <Container>
      <div className="min-h-screen px-4 py-10 mx-auto text-(--text-primary)">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          What's your story today?
        </h1>
        {/* Search Input Section */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="
              w-full
              py-2 sm:py-3 px-4 pr-16
              rounded-full
              bg-[rgba(255,255,255,0.05)]
              border border-[rgba(255,255,255,0.15)]
              text-white
              outline-none
              focus:border-white/40
              transition
            "
          />

          <button
            onClick={handleSearch}
            disabled={!inputValue.trim()}
            className={`
    absolute right-2 top-1/2 -translate-y-1/2
    w-7 h-7 sm:w-9 sm:h-9  rounded-full
    flex items-center justify-center
    font-bold text-lg
    transition
    ${
      inputValue.trim()
        ? "bg-white text-black hover:scale-105"
        : "bg-gray-600 text-gray-400 cursor-not-allowed"
    }
  `}
          >
            →
          </button>
        </div>

        {/* Suggestion pills  */}

        <SearchSuggestions />
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        )}
        {!loading && error && (
          <p className="text-red-400 text-center mt-8 ">
            Something went wrong. Please check your internet connection and try
            again.
          </p>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-3">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && !error && hasSearched && results.length === 0 && (
          <p className="text-center mt-10 text-(--text-muted)">
            No results found.
          </p>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
