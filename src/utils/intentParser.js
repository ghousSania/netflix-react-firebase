import {
  genreMap,
  moodWords,
  wordNormalizationMap,
  stopWords,
} from "./constants";

export function parseIntent(query) {
  const lower = query.toLowerCase();

  const normalizedQuery = Object.keys(wordNormalizationMap).reduce(
    (text, key) => text.replaceAll(key, wordNormalizationMap[key]),
    lower,
  );

  const genres = Object.keys(genreMap).filter((g) =>
    normalizedQuery.includes(g),
  );

  const moods = moodWords.filter((m) => normalizedQuery.includes(m));

  const keywords = normalizedQuery
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .filter(
      (w) =>
        w.length > 2 &&
        !Object.keys(genreMap).includes(w) &&
        !moodWords.includes(w) &&
        !stopWords.includes(w),
    );

  return {
    genres,
    moods,
    keywords,
  };
}
