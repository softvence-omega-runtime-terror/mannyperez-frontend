// src/components/CheckoutComponent/ShippingAddress.tsx
import React from "react";

const DUMMY_BUYER_PHONE = "+1 (555) 123-4567";

const ShippingAddress: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Shipping Address</h3>
        <button className="text-pink-600 text-sm font-semibold hover:text-pink-700 transition">
          + Add New Address
        </button>
      </div>

      <div className="space-y-4">
        {/* Default Address */}
        <div className="border border-gray-200 p-4 rounded-lg relative">
          <div className="absolute top-4 right-4 text-pink-600 cursor-pointer">
            {/* Edit Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div className="flex items-center mb-1">
            <span className="text-md font-semibold text-gray-800">John Smith</span>
            <span className="ml-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              Default
            </span>
          </div>
          <p className="text-sm text-gray-600">123 Main Street, Apt 4B New York, NY 10001</p>
          <p className="text-sm text-gray-600">United States</p>
          <p className="text-sm text-gray-600">{DUMMY_BUYER_PHONE}</p>
        </div>

        {/* Optional: Additional addresses */}
      </div>
    </div>
  );
};

export default ShippingAddress;
