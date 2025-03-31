import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useIsAuthenticated = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  return isAuthenticated;
};
