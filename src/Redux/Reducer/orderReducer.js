import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer(
  {
    OrderItems: [],
  },
  {
    SAVE_ORDERS: (state, action) => {
      state.OrderItems = action.payload;
    },
  }
);
