import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "../types";

const savedCart = localStorage.getItem("cart");
const calculateSubtotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const initialItems = savedCart ? JSON.parse(savedCart) : [];

const initialState: CartState = {
  items: initialItems,
  subtotal: calculateSubtotal(initialItems),
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
      state.subtotal = calculateSubtotal(state.items);
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
      state.subtotal = calculateSubtotal(state.items);

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
