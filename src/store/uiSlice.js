import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loadingScreens: {
      home: false,
      movieDetails: false,
      search: false,
    },
  },
  reducers: {},
});

export default uiSlice.reducer;
