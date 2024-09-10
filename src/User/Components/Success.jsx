import React from "react";
import { Link } from "react-router-dom";
import successImage from "../../assets/Images/404-bg.jpg"; // Update the path to your success background image

const Success = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${successImage})` }}
    >
      <div
        className="text-center p-8 shadow-md rounded max-w-lg w-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the opacity here
        }}
      >
        <h1 className="text-4xl font-semibold mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
        <Link to="/">
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
