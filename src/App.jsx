import { Route, Routes } from "react-router-dom";
import "./App.css";

import Cart from "./User/Pages/Cart";
import Checkout from "./User/Pages/Checkout";
import Home from "./User/Pages/Home";
import Login from "./User/Pages/Login";
import Register from "./User/Pages/Register";
import Products from "./User/Pages/Products";
import ContactUs from "./User/Pages/ContactUs";
import Wishlist from "./User/Pages/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
