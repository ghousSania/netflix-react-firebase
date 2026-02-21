export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const genreMap = {
  action: 28,
  comedy: 35,
  drama: 18,
  romance: 10749,
  horror: 27,
  thriller: 53,
  animation: 16,
  crime: 80,
  fantasy: 14,
  adventure: 12,
  "science fiction": 878,
  scifi: 878,
};

export const moodWords = [
  "dark",
  "sad",
  "romantic",
  "funny",
  "emotional",
  "psychological",
  "intense",
  "lighthearted",
];

export const wordNormalizationMap = {
  romantic: "romance",
  funny: "comedy",
  scary: "horror",
  thrilling: "thriller",
  emotional: "drama",
  sci: "science fiction",
  scifi: "science fiction",
};

export const stopWords = [
  "movie",
  "movies",
  "film",
  "films",
  "story",
  "about",
  "show",
  "series",
  "watch",
];

export const suggestions = [
  "Romantic Movies",
  "Dark Thriller",
  "Funny Comedy",
  "Psychological Horror",
  "Crime Drama",
  "Space Adventure",
  "Emotional Love Story",
  "Action Packed",
  "Animated Family",
  "Fantasy Epic",
  "Mystery Thriller",
  "Sci-Fi Adventure",
];
