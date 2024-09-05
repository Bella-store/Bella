import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/ProductsSlice";

const storeApp = configureStore({
  reducer: {
    products: productsReducer,
  },
});
export default storeApp;
