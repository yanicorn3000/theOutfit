import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../utils";

const user = getUser();

const initialState = {
  isAuthenticated: !!user,
  user: user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    setUser: (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
