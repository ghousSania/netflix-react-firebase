import { useState, useEffect } from "react";
import { searchMovies } from "../services/searchService";

export function useMovieSearch(query, searchTrigger) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query);

        if (!isCancelled) {
          setResults(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          setResults([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [query, searchTrigger]);

  return { results, loading, error };
}
