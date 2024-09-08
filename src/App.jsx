// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../src/config/firebase";
// import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "../src/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../src/Redux/Slices/AuthSlice";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await dispatch(fetchUserData(user.uid));
      } else {
        setCurrentUser(null);
        fetchUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllowed={role === "admin"} redirectPath="/">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          role === "admin" ? (
            <Navigate to="/dashboard" />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={!currentUser ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/Register"
                element={!currentUser ? <Register /> : <Navigate to="/" />}
              />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/profileUser/*"
                element={currentUser ? <ProfileUser /> : <Navigate to="/" />}>
                        <Route path="userInfo" element={<UserInfo />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          )
        }
      />
    </Routes>
  );
}

export default App;

// const [role, setRole] = useState(null);

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       setCurrentUser(user);
//       await dispatch(fetchUserData(user.uid));
//       console.log(user.uid + "fffffffffffffffffffdfgh");
//     } else {
//       setCurrentUser(null);
//       setRole(null);
//     }
//     setLoading(false);
//   });

//   return () => unsubscribe();
// }, []);

// const fetchUserRole = async (uid) => {
//   try {
//     const userDoc = await getDoc(doc(db, "users", uid));

//     if (userDoc.exists()) {
//       const userData = userDoc.data();
//       console.log(userData + "testttttttttttttttttttttttttttttttttttttttttt");

//       setRole(userData.role);
//     } else {
//       console.log("No such user document!");
//       setRole(null);
//     }
//   } catch (error) {
//     console.error("Error fetching user role: ", error);
//     setRole(null);
//   }
// };
