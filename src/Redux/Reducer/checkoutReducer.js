import { createReducer } from "@reduxjs/toolkit";

export const checkoutReducer = createReducer(
  {
    shippingAddress: {},
    billingAddress: {},
    paymentMethod: "",
  },
  {
    SAVE_CHECKOUT_SHIPPING: (state, action) => {
      state.shippingAddress = action.payload;
    },

    SAVE_CHECKOUT_BILLING: (state, action) => {
      state.billingAddress = action.payload;
    },
    SAVE_PAYMENT_METHOD: (state, action) => {
      state.paymentMethod = action.payload;
    },
  }
);
