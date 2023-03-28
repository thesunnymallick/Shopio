import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducer/authReducer";
import { cartReducer } from "./Reducer/CartReducer";
import { checkoutReducer } from "./Reducer/checkoutReducer";
import { filtersReducer } from "./Reducer/filtersReducer";
import { orderReducer } from "./Reducer/orderReducer";
import { productsReducer } from "./Reducer/productsReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    filter: filtersReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
