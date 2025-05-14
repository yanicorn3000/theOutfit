import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";
import themeReducer from "./themeSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    checkout: orderReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
