import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/ProductsSlice";
import cartReducer from "./Slices/CartSlice";

const storeApp = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
export default storeApp;
