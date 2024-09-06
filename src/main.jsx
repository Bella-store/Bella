import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './i18n';
import "./index.css";
import Login from "./User/Pages/Login";
import Home from "./User/Pages/Home";
import Register from "./User/Pages/Register";
import AboutUs from "./User/Pages/AboutUs";
import Products from "./User/Pages/Products";
import ProductDetails from "./User/Pages/ProductDetails";
import Shop from "./User/Pages/Shop";
import Cart from "./User/Pages/Cart";
import Checkout from "./User/Pages/Checkout";
import Dashboard from "./Admin/Pages/Dashboard";
import Page404 from "./User/Pages/Page404";
import ContactUs from "./User/Pages/ContactUs";
import Wishlist from "./User/Pages/Wishlist";
import ProfileUser from "./User/Pages/profileUser";
import UserInfo from "./User/Components/userInfo.JSX";
import { Provider } from "react-redux";
import storeApp from "./Redux/Store";
import App from "./App";  // Import App component

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={storeApp}>
      <App>  {/* Wrapping your Router and Routes in App */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard/*" element={<Dashboard />} />

            {/* Nested routes under /profileUser */}
            <Route path="/profileUser" element={<ProfileUser />}>
              <Route path="user-info" element={<UserInfo />} />
              {/* Uncomment and add these if you have the corresponding components */}
              {/* <Route path="favourites" element={<Favourites />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} /> */}
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </App>
    </Provider>
  </React.StrictMode>
);
