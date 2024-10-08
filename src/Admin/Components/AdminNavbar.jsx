import { useState } from "react";
import About1 from "../../assets/Images/about1.jpg";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {
  const [selectedTab, setSelectedTab] = useState("Dashboard"); 
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setSelectedTab(tab);
    navigate(tab === "Dashboard" ? "/dashboard" : "/");
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      {/* Left Side: Sidebar Toggle for Mobile */}
      <div className="lg:hidden">
        <button onClick={toggleSidebar} className="text-mainColor">
          <FaBars size={24} />
        </button>
      </div>
      <div></div>

      {/* Middle: UI Toggle Button */}
      <div className="relative bg-white rounded-full shadow-inner flex items-center justify-center w-52 h-12">
        {/* Active Indicator */}
        <div
          className={`absolute rounded-full transition-all duration-300 w-24 h-10 m-1 ${
            selectedTab === "Dashboard"
              ? "left-1 bg-white shadow-md"
              : "left-28 bg-white shadow-md"
          }`}
        />
        {/* Dashboard Button */}
        <button
          onClick={() => handleNavigation("Dashboard")}
          className={`z-10 w-1/2 px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${
            selectedTab === "Dashboard"
              ? "text-mainColor font-semibold"
              : "text-gray-500"
          }`}
        >
          Dashboard
        </button>
        {/* Website Button */}
        <button
          onClick={() => handleNavigation("Website")}
          className={`z-10 w-1/2 px-4 py-2 rounded-full focus:outline-none transition-all duration-300 ${
            selectedTab === "Website"
              ? "text-black font-semibold"
              : "text-gray-500"
          }`}
        >
          Website
        </button>
      </div>

      {/* Right Side: Profile Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center bg-white rounded-full px-4 py-2 shadow-md focus:outline-none">
            <span className="mr-2"><HiOutlineShoppingBag className="size-5" /></span>
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              8
            </span>
          </button>
        </div>
        <div className="flex items-center">
          <img
            src={About1}
            alt="Ryana"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
