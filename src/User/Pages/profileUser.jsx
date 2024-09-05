import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CiUser, CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ProfileUser() {
  const { t } = useTranslation();

  return (
    <div className="h-[100vh] flex">
      <div className="w-[20%] shadow-lg p-5 relative">
        <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
          {t("UserProfile")}
        </h2>
        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            to="/profileUser/user-info"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                isActive
                  ? "bg-hovermain text-white"
                  : "hover:bg-hovermain hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiUser size={20} />
            {t("UserInfo")}
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
          >
            <CiHeart size={20} />
            {t("Favourites")}
          </NavLink>

          <NavLink
            to="/profileUser/settings"
            className={({ isActive }) =>
              `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                isActive
                  ? "bg-hovermain text-white"
                  : "hover:bg-hovermain hover:text-white"
              } p-2 rounded-md`
            }
          >
            <CiSettings size={20} />
            {t("Settings")}
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
          >
            <IoIosNotificationsOutline size={20} />
            {t("Notifications")}
          </NavLink>
        </div>

        <div className="absolute bottom-2 w-full text-center">
          <NavLink
            to="/"
            className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md`}
          >
            <FaSignOutAlt size={20} />
            {t("BackHome")}
          </NavLink>
        </div>
      </div>

      <div className="w-[80%] p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileUser;
