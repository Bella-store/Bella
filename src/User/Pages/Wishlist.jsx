import React from "react";
import PageBanner from "../Components/PageBanner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full mx-auto mt-12">
      <Navbar />

      {/* Banner Section */}
      <PageBanner title={t("WishlistTitle")} />

      {/* Wishlist Section */}
      <div className="bg-white m-auto mt-10 max-w-4xl rounded shadow-md overflow-hidden mb-5">
        {/* For small screens */}
        <div className="md:hidden flex flex-col space-y-4 p-4">
          <div className="flex items-center space-x-4 bg-white border-b last:border-0 hover:bg-gray-50 transition p-4 rounded">
            <div className="w-24">
              <img
                src="/ggg-600x720.jpg"
                alt={t("ProductName")}
                className="w-full object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <span className="font-medium text-gray-700">
                {t("ProductName")}
              </span>
              <div className="text-sm text-gray-600 mt-1">
                {t("Price")}: 7,900 {t("Currency")}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {t("StockStatus")}: {t("InStock")}
              </div>
              <div className="mt-2">
                <button className="bg-black text-white py-2 px-4 rounded shadow hover:bg-gray-800">
                  {t("AddToCart")}
                </button>
              </div>
            </div>
            <button className="text-gray-600 hover:text-red-500 transition">
              &#10005;
            </button>
          </div>
        </div>

        {/* For medium screens and above */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white border-collapse text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-12 py-4 text-gray-600"></th>
                <th className="w-18 py-4 text-gray-600"></th>
                <th className="py-4 text-gray-600 font-semibold text-left">
                  {t("Product")}
                </th>
                <th className="py-4 text-gray-600 font-semibold text-center">
                  {t("Price")}
                </th>
                <th className="py-4 text-gray-600 font-semibold text-center">
                  {t("StockStatus")}
                </th>
                <th className="py-4 text-gray-600 font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="text-center py-4">
                  <button className="text-gray-600 hover:text-red-500 transition">
                    &#10005;
                  </button>
                </td>
                <td className="py-4">
                  <img
                    src="/ggg-600x720.jpg"
                    alt={t("ProductName")}
                    className="w-16 object-cover rounded"
                  />
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-700">
                    {t("ProductName")}
                  </span>
                </td>
                <td className="text-center text-gray-600">
                  7,900 {t("Currency")}
                </td>
                <td className="text-center text-gray-600">
                  {t("InStock")}
                </td>
                <td className="text-center">
                  <button className="bg-black text-white py-2 px-4 rounded shadow hover:bg-[#B48E61]">
                    {t("AddToCart")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
