import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import authReducer from "../redux/authSlice";
import orderReducer from "../redux/orderSlice";
import themeReducer from "../redux/themeSlice";
import type { RootState } from "../redux/store";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  checkout: orderReducer,
  theme: themeReducer,
});

const queryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const defaultMockedState: Partial<RootState> = {
  cart: { items: [], subtotal: 0 },
};

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient()}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export const renderWithRouter = (
  ui: React.ReactElement,
  {
    route = "/products/1",
    path = "/products/:productId",
  }: { route?: string; path?: string } = {}
) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient()}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export function renderWithCustomStore(
  ui: React.ReactElement,
  {
    preloadedState,
    customStore,
    route = "/",
  }: {
    preloadedState?: Partial<RootState>;
    customStore?: typeof store;
    route?: string;
  } = {}
) {
  const usedStore =
    customStore ??
    configureStore({
      reducer: rootReducer,
      preloadedState: {
        ...defaultMockedState,
        ...preloadedState,
      },
    });

  return {
    ...render(
      <Provider store={usedStore}>
        <QueryClientProvider client={queryClient()}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    ),
    store: usedStore,
  };
}
