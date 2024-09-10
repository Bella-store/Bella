import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/ProductsSlice";
import authReducer from "./Slices/AuthSlice";
import cartReducer from "./Slices/CartSlice";
import favouriteReducer from "./Slices/FavouriteSlice";
import ordersReducer from "./Slices/OrdersSlice";
const storeApp = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    orders: ordersReducer,
  },
});
export default storeApp;
