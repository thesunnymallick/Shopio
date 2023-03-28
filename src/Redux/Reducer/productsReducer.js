import { createReducer } from "@reduxjs/toolkit";

export const productsReducer = createReducer(
  {
    products: [],
    minPrice: null,
    maxPrice: null,
  },
  {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    PRICE_RANGE_PRODUCT: (state, action) => {
      const { products } = action.payload;
      const priceArray = [];
      products.map((product) => {
        const price = product.price;
        return priceArray.push(price);
      });
      let min = Math.min(...priceArray);
      let max = Math.max(...priceArray);
      state.minPrice = min;
      state.maxPrice = max;
    },
  }
);
