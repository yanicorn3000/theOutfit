import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "../types";

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

const initialState: ThemeState = {
  theme: savedTheme || "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
