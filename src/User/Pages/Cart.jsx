import { Link } from "react-router-dom";
import cartItems from "../../../db.json";
import PageBanner from "../Components/PageBanner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen mt-16">
      <Navbar />
      {/* Cart Banner */}
      <PageBanner title={t("CartTitle")} />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col mt-8 lg:flex-row lg:space-x-8">
          <div className="md:max-w-4xl w-full">
            <div className="bg-white rounded shadow-md overflow-hidden">
              {/* For small screens */}
              <div className="md:hidden flex flex-col space-y-4 p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white border-b last:border-0 hover:bg-gray-50 transition p-4 rounded"
                  >
                    <div className="w-16">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="font-medium text-gray-700">
                        {item.title}
                      </span>
                      <div className="text-sm text-gray-600">
                        {t("Quantity")}: 1
                      </div>
                      <div className="text-sm text-gray-600">
                        {t("Subtotal")}: {item.price} {t("Currency")}
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-red-500 transition">
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>

              {/* For medium screens and above */}
              <div className="hidden md:block">
                <table className="min-w-full bg-white border-collapse text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-12 py-4 text-gray-600"></th>
                      <th className="w-22 py-4 text-gray-600"></th>
                      <th className="py-4 text-gray-600 font-semibold text-left">
                        {t("Product")}
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        {t("Price")}
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        {t("Quantity")}
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        {t("Subtotal")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b last:border-0 hover:bg-gray-50 transition"
                      >
                        <td className="text-center py-4">
                          <button className="text-gray-600 hover:text-red-500 transition">
                            &#10005;
                          </button>
                        </td>
                        <td className="py-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-4">
                          <span className="font-medium text-gray-700">
                            {item.title}
                          </span>
                        </td>
                        <td className="text-center text-gray-600">
                          {item.price} {t("Currency")}
                        </td>
                        <td className="text-center">
                          <div className="inline-flex items-center space-x-2">
                            <button className="rounded bg-transparent transition">
                              -
                            </button>
                            <input
                              type="text"
                              value="1"
                              className="w-12 text-center text-black bg-transparent rounded border-none border-gray-200 focus:outline-none"
                              readOnly
                            />
                            <button className="rounded hover:bg-transparent transition">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-center text-gray-600">
                          {item.price} {t("Currency")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:max-w-sm w-full h-fit bg-white shadow-md rounded p-4 mt-8 lg:mt-0 text-sm md:text-base">
            <h2 className="text-lg font-semibold pb-4">
              {t("CartTotals")}
            </h2>
            <div className="mt-4">
              <div className="flex justify-between border-b pb-2">
                <p className="text-gray-600">{t("Subtotal")}</p>
                <p className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.price, 0)} {t("Currency")}
                </p>
              </div>
              <div className="flex justify-between mt-2 pb-2">
                <p className="text-gray-600">{t("Total")}</p>
                <p className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.price, 0)} {t("Currency")}
                </p>
              </div>
            </div>
            <Link to="/checkout">
              <button className="mt-4 w-full bg-gray-800 text-white py-4 rounded hover:bg-[#B48E61] transition text-sm md:text-base">
                {t("ProceedToCheckout")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
