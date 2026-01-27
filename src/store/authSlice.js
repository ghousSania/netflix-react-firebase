import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    authLoading: true,
    authError: null,
  },
  reducers: {
    authStart(state) {
      state.authLoading = true;
      state.authError = null;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.authLoading = false;
    },
    authFail(state, action) {
      state.authLoading = false;
      state.authError = action.payload;
    },
    clearAuthError(state) {
      state.authError = null;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.authLoading = false;
      state.authError = null;
    },
  },
});

export const { authStart, setUser, authFail, clearUser, clearAuthError } =
  authSlice.actions;
export default authSlice.reducer;
