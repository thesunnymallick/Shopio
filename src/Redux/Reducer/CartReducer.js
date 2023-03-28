import { createReducer } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

export const cartReducer = createReducer(
  {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotalQuantity: 0,
    cartTotalAmmount: 0,
    perviousUrl: "",
  },
  {
    ADD_TO_CART: (state, action) => {
      const product = action.payload;

      const FindIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (FindIndex >= 0) {
        // product already exit in cartItem
        if (
          state.cartItems[FindIndex].inStock !==
          state.cartItems[FindIndex].cartQuantity
        ) {
          state.cartItems[FindIndex].cartQuantity += 1;
          toast.info(`${product.name} increased by one`);
        } else {
          toast.error(`${product.name} product not available`);
        }
      } else {
        // product does't  exit in cartItem
        const TempProduct = { ...product, cartQuantity: 1 };
        state.cartItems.push(TempProduct);
        toast.success(`${product.name} added  to cart`);
      }
      // save to cart lS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECRESE_QUANTITY: (state, action) => {
      const FindIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[FindIndex].cartQuantity > 1) {
        // Decrese cart item
        state.cartItems[FindIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} decresed by one`);
      } else if (state.cartItems[FindIndex].cartQuantity === 1) {
        // Remove from cart
        const NewCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = NewCartItem;
        toast.success(`${action.payload.name} Remove to cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      // Remove from cart
      const NewCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = NewCartItem;
      toast.success(`${action.payload.name} Remove to cart`);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      toast.success(`Cart Clear`, { position: "top-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL: (state, action) => {
      const cartItems = action.payload;

      if (cartItems.length === 0) {
      } else {
        const PriceArray = [];
        cartItems.map((item) => {
          const { price, cartQuantity } = item;
          const TotalAmmount = price * cartQuantity;
          return PriceArray.push(TotalAmmount);
        });
        const SubTotal = PriceArray.reduce((a, b) => {
          return a + b;
        });
        const AllQuantity = [];
        cartItems.map((item) => {
          const { cartQuantity } = item;
          return AllQuantity.push(cartQuantity);
        });
        const TotalQantity = AllQuantity.reduce((a, b) => {
          return a + b;
        });
        state.cartTotalQuantity = TotalQantity;
        state.cartTotalAmmount = SubTotal;
      }
    },

    SAVE_PERVIOUS_URL: (state, action) => {
      state.perviousUrl = action.payload;
    },
  }
);
