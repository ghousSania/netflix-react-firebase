import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movieCategorires: [],
    moviesByCategory: {},
    selectedMovie: null,
    moviesLoading: false,
    moviesError: null,
  },
  reducers: {},
});

export default moviesSlice.reducer;
