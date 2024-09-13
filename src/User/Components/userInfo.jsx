import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const { userDetails } = useSelector((state) => state.auth);

  if (!userDetails)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8 mt-6 md:mt-12 transition-all duration-300 ease-in-out hover:shadow-xl">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-6 text-center tracking-tight">
        User Information
      </h2>
      <div className="border-t border-gray-200 my-4 md:my-6"></div>
      <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 text-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">Name:</span>
          <span className="text-base md:text-lg">{userDetails.userName}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">Email:</span>
          <span className="text-base md:text-lg">{userDetails.userEmail}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">
            Phone Number:
          </span>
          <span className="text-base md:text-lg">
            {userDetails.phone || "N/A"}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">Address:</span>
          <span className="text-base md:text-lg">
            {userDetails.address || "N/A"}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="font-semibold text-base md:text-lg">City:</span>
          <span className="text-base md:text-lg">
            {userDetails.city || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
