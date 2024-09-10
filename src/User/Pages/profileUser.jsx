import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiUser, CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/AuthSlice";
import { onAuthStateChanged } from "firebase/auth"; // Import this to listen to auth state
import { auth } from "../../config/firebase"; // Import Firebase auth
import { loginUser } from "../../Redux/Slices/AuthSlice"; // Dispatch action to set user in redux

function ProfileUser() {
  const [activeLink, setActiveLink] = useState("userInfo");
  const dispatch = useDispatch();
  const { user, userId, userDetails, loading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If there's an authenticated user, fetch their data
        dispatch(fetchUserData(currentUser.uid));
      } else {
        console.error("User not authenticated");
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[100vh] flex">
      {userDetails ? (
        <>
          <div className="w-[20%] shadow-lg p-5 relative">
            <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
              User Profile
            </h2>
            <div className="flex flex-col gap-4 mt-6 ">
              <NavLink
                to="/profileUser/userInfo"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("userInfo")} // Correctly set the state
              >
                <CiUser size={20} />
                User Info
              </NavLink>

              <NavLink
                to="/profileUser/favourites"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("favourites")}
              >
                <CiHeart size={20} />
                Favourites
              </NavLink>

              <NavLink
                to="/profileUser/Settings"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("settings")}
              >
                <CiSettings size={20} />
                Settings
              </NavLink>

              <NavLink
                to="/profileUser/notifications"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("notifications")}
              >
                <IoIosNotificationsOutline size={20} />
                Notifications
              </NavLink>
            </div>

            <div className="absolute bottom-2 w-full text-center">
              <NavLink
                to="/"
                className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md`}
              >
                <FaSignOutAlt size={20} />
                Back Home
              </NavLink>
            </div>
          </div>

          <div className="w-[80%] p-5">
            <Outlet />
          </div>
        </>
      ) : (
        <div>Loading user details...</div>
      )}
    </div>
  );
}

export default ProfileUser;
