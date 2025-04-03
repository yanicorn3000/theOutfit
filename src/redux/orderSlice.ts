import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BuyerInfo = {
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    zipcode: string;
    street: string;
    number: number;
  };
  phone: string;
  email: string;
};

type CheckoutState = {
  buyerInfo: BuyerInfo | null;
  paymentMethod: string | null;
  deliveryMethod: string | null;
  step: number;
};

const initialState: CheckoutState = {
  buyerInfo: null,
  paymentMethod: null,
  deliveryMethod: null,
  step: 1,
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
      if (state.step < 3) {
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
  },
});

export const {
  setBuyerInfo,
  setPaymentMethod,
  setDeliveryMethod,
  nextStep,
  prevStep,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
