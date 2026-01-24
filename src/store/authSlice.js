import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    authLoading: false,
    authError: null,
  },
  reducers: {},
});

export default authSlice.reducer;
