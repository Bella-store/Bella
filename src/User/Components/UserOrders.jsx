import React from "react";

const UserOrders = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Order Details (Left) */}
        <div className="flex-1">
          {/* Order Detail */}
          <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
            <h2 className="text-xl font-semibold mb-4">Order #123456</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product 1"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium">Product 1</p>
                    <p className="text-sm text-gray-500">Color: Black</p>
                    <p className="text-sm text-gray-500">Size: M</p>
                  </div>
                </div>
                <p className="text-lg font-medium">USD 100.00</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product 2"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium">Product 2</p>
                    <p className="text-sm text-gray-500">Color: Red</p>
                    <p className="text-sm text-gray-500">Size: L</p>
                  </div>
                </div>
                <p className="text-lg font-medium">USD 75.00</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product 3"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium">Product 3</p>
                    <p className="text-sm text-gray-500">Color: Blue</p>
                    <p className="text-sm text-gray-500">Size: S</p>
                  </div>
                </div>
                <p className="text-lg font-medium">USD 75.00</p>
              </div>
            </div>
          </div>

          {/* Another Order Detail */}
          <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
            <h2 className="text-xl font-semibold mb-4">Order #654321</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product 4"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium">Product 4</p>
                    <p className="text-sm text-gray-500">Color: White</p>
                    <p className="text-sm text-gray-500">Size: XL</p>
                  </div>
                </div>
                <p className="text-lg font-medium">USD 75.00</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product 5"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-medium">Product 5</p>
                    <p className="text-sm text-gray-500">Color: Green</p>
                    <p className="text-sm text-gray-500">Size: M</p>
                  </div>
                </div>
                <p className="text-lg font-medium">USD 75.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Summary (Right) */}
        <div className="w-full lg:w-1/3">
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="text-lg font-medium">Order #123456</p>
              <p>Jul 24, 2023</p>
              <p className="text-green-500">Delivered</p>
              <p>USD 250.00</p>
              <p>3 Items</p>
            </div>
            {/* Another Order Summary */}
            <div className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="text-lg font-medium">Order #654321</p>
              <p>Jul 20, 2023</p>
              <p className="text-blue-500">In Progress</p>
              <p>USD 150.00</p>
              <p>2 Items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
