import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch, CiHeart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiLineVerticalLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [navBg, setNavBg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get current path
  const dispatch = useDispatch();

  const changeNavBg = () => {
    if (window.scrollY > 0) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 px-10 ${
        navBg || (location.pathname !== "/" && location.pathname !== "/AboutUs")
          ? "bg-white text-titleColor h-20"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-[5%]">
        {/* Brand Section */}
        <div
          className={`text-3xl font-bold mt-4 ${
            navBg || location.pathname !== "/" ? "text-mainColor" : ""
          }`}
        >
          <span>
            <Link to="/" className="flex justify-center font-sans">
              Bella
            </Link>
          </span>
          <p className={`text-sm font-light ${navBg ? "text-mainColor" : ""}`}>
            <Link to="/" className="text-[0.7rem] font-extralight">
              LUXURY YOU DESERVE
            </Link>
          </p>
        </div>

        {/* Hamburger Icon (Visible on Small Screens) */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className={`text-3xl ${navBg ? "text-titleColor" : "text-white"}`}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Full Menu Links (Hidden on Small Screens) */}
        <ul className="hidden lg:flex space-x-8 uppercase tracking-wide mt-3">
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/Products">Collection</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/contactUs">Contact Us</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/shop" onClick={toggleSidebar}>
              Store{" "}
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden lg:flex space-x-4 items-center mt-4">
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <CiSearch className="size-6" />
          </div>
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200 relative">
            <Link to="/cart">
              {totalQuantity > 0 && (
                <span className="absolute top-[0px] right-[-5px] flex justify-center items-center text-white bg-opacity-100 bg-[#DD5746] rounded-full text-xs px-[3px] ">
                  {totalQuantity}
                </span>
              )}
              <HiOutlineShoppingBag className="size-6" />
            </Link>
          </div>
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/wishlist">
              <CiHeart className="size-6" />
            </Link>
          </div>
          <PiLineVerticalLight className="size-6" />
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/login" className="mr-5">
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar (Visible on Small Screens) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <ul className="flex flex-col space-y-8 p-8 text-black uppercase">
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/AboutUs" onClick={toggleSidebar}>
              About Us
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/Products" onClick={toggleSidebar}>
              Collection
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/contactUs" onClick={toggleSidebar}>
              Contact Us
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/shop" onClick={toggleSidebar}>
              Store{" "}
            </Link>
          </li>

          {/* Icons in Sidebar */}
          <div className="flex space-x-4 items-center mt-4">
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200 text-black">
              <CiSearch className="size-10" />
            </div>
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
              <Link to="/cart">
                <HiOutlineShoppingBag className="size-8" />
              </Link>
            </div>
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
              <Link to="/wishlist">
                <CiHeart className="size-8" />
              </Link>
            </div>
          </div>

          {/* Login and Register Links */}
          <div className="space-y-2 mt-4">
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
              <Link to="/login" onClick={toggleSidebar}>
                Login
              </Link>
            </div>
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
              <Link to="/register" onClick={toggleSidebar}>
                Register
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
