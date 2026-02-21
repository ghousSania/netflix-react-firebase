export function rankMovies(movies, query) {
  if (!movies || !query) return movies || [];

  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);

  return movies
    .map((movie) => {
      const title = movie.title?.toLowerCase() || "";
      const overview = movie.overview?.toLowerCase() || "";

      let score = 0;

      //  Exact title match
      if (title === lowerQuery) score += 1000;

      // Title starts with full query
      if (title.startsWith(lowerQuery)) score += 500;

      //  Title contains full phrase
      if (title.includes(lowerQuery)) score += 300;

      //  Word-by-word scoring
      queryWords.forEach((word) => {
        if (title.includes(word)) score += 50;
        if (overview.includes(word)) score += 10;
      });

      //  Popularity boost (small weight)
      score += (movie.popularity || 0) * 0.01;

      return { ...movie, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .map((movie) => {
      const { _score, ...rest } = movie;
      return rest;
    });
}
