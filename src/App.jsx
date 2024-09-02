import { Route, Routes } from "react-router-dom";
import "./App.css";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import ContactUs from "./Pages/ContactUs";
import Wishlist from "./Pages/Wishlist";

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
