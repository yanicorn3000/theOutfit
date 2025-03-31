import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string; // api nie obsługuje
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const savedCart = localStorage.getItem("cart");

const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) => {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== id || item.size !== size
          );
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
