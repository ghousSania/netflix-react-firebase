import { request } from "./tmdb";
import { parseIntent } from "../utils/intentParser";
import { rankMovies } from "../utils/Ranking";
import { getCache, setCache } from "./cache";
import { genreMap } from "../utils/constants";

export async function searchMovies(query) {
  if (!query) return [];

  const cached = getCache(query);
  if (cached && cached.length > 0) return cached;

  const intent = parseIntent(query);

  let data;

  // If a genre is detected , use discover
  if (intent.genres && intent.genres.length > 0) {
    const genreIds = intent.genres
      .map((g) => genreMap[g])
      .filter(Boolean)
      .join(",");

    data = await request("/discover/movie", {
      sort_by: "popularity.desc",
      with_genres: genreIds,
    });
  } else {
    // Otherwise use normal search
    data = await request("/search/movie", {
      query,
    });
  }

  const ranked = rankMovies(data.results || [], query);
  const finalResults = ranked.slice(0, 30);

  setCache(query, finalResults);

  return finalResults;
}
