import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BuyerInfo } from "../types";
import { CheckoutState } from "../types";
import { Order } from "../types";

const orders = localStorage.getItem("orders") || "[]";
const parsedOrders = JSON.parse(orders) as Order[];

const initialState: CheckoutState = {
  buyerInfo: null,
  paymentMethod: null,
  deliveryMethod: null,
  step: 1,
  shippingCost: 0,
  orders: parsedOrders,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setBuyerInfo(state, action: PayloadAction<BuyerInfo>) {
      state.buyerInfo = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    setDeliveryMethod(state, action: PayloadAction<string>) {
      state.deliveryMethod = action.payload;
    },

    nextStep(state) {
      if (state.step < 4) {
        state.step += 1;
      }
    },
    prevStep(state) {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    resetCheckout(state) {
      state.buyerInfo = null;
      state.paymentMethod = null;
      state.deliveryMethod = null;
      state.step = 1;
    },
    addOrder(state, action: PayloadAction<Omit<Order, "id">>) {
      const order = {
        ...action.payload,
        id: state.orders.length + 1,
      };

      state.orders.push(order);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const {
  setBuyerInfo,
  setPaymentMethod,
  setDeliveryMethod,
  nextStep,
  prevStep,
  resetCheckout,
  addOrder,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
