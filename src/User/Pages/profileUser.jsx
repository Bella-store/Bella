import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CiUser, CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { GrTask } from "react-icons/gr";

function ProfileUser() {
  const dispatch = useDispatch();
  const { user, userDetails, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(fetchUserData(currentUser.uid));
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (location.pathname === "/profileUser") {
      navigate("/profileUser/userInfo");
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !overlayRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full mt-[25%]">
        <div>
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center w-full mt-[25%]">
        <div>
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block lg:w-[20%] lg:h-full lg:shadow-lg lg:p-5 lg:relative">
        <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
          User Profile
        </h2>
        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            to="/profileUser/userInfo"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiUser size={20} />
            User Info
          </NavLink>

          <NavLink
            to="/profileUser/userfav"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiHeart size={20} />
            Favourites
          </NavLink>
{/* 
          <NavLink
            to="/profileUser/Settings"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiSettings size={20} />
            Settings
          </NavLink> */}

          <NavLink
            to="/profileUser/orders"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-btncolor text-white"
                  : "hover:bg-btncolor hover:text-white"
              } p-2 rounded-md`
            }
          >
            <GrTask  size={20} />
            My Orders
          </NavLink>
        </div>

        <div className="absolute bottom-2 w-full text-center">
          <NavLink
            to="/"
            className="ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md"
          >
            <FaSignOutAlt size={20} />
            Back Home
          </NavLink>
        </div>
      </div>

      {/* Sidebar Button (Visible on Medium and Small Screens) */}
      <div className="lg:hidden">
        <button onClick={toggleSidebar} className="text-3xl p-4">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Drawer (Visible on Small Screens) */}
      <div
        ref={overlayRef}
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-40 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-2xl">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-5 mt-16">
            <NavLink
              to="/profileUser/userInfo"
              className={({ isActive }) =>
                `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                  isActive
                    ? "bg-btncolor text-white"
                    : "hover:bg-btncolor hover:text-white"
                } p-2 rounded-md`
              }
            >
              <CiUser size={20} />
              User Info
            </NavLink>

            <NavLink
              to="/profileUser/userfav"
              className={({ isActive }) =>
                `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                  isActive
                    ? "bg-btncolor text-white"
                    : "hover:bg-btncolor hover:text-white"
                } p-2 rounded-md`
              }
            >
              <CiHeart size={20} />
              Favourites
            </NavLink>

            {/* <NavLink
              to="/profileUser/Settings"
              className={({ isActive }) =>
                `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                  isActive
                    ? "bg-btncolor text-white"
                    : "hover:bg-btncolor hover:text-white"
                } p-2 rounded-md`
              }
            >
              <CiSettings size={20} />
              Settings
            </NavLink> */}

            <NavLink
              to="/profileUser/orders"
              className={({ isActive }) =>
                `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                  isActive
                    ? "bg-btncolor text-white"
                    : "hover:bg-btncolor hover:text-white"
                } p-2 rounded-md`
              }
            >
              <IoIosNotificationsOutline size={20} />
              My Orders
            </NavLink>

            <div className="mt-4">
              <NavLink
                to="/"
                className="ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md"
              >
                <FaSignOutAlt size={20} />
                Back Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-[80%] p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileUser;
