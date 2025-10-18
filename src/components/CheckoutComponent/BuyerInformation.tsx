import React from "react";

const DUMMY_BUYER_EMAIL = "john.smith@email.com";
const DUMMY_BUYER_PHONE = "+1 (555) 123-4567";

const BuyerInformation: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Buyer Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <p className="mt-1 block w-full border rounded-sm px-2 border-gray-300 py-2 text-gray-900 sm:text-sm">
            {DUMMY_BUYER_EMAIL}
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <p className="mt-1 block w-full border rounded-sm px-2 border-gray-300 py-2  text-gray-900 sm:text-sm">
            {DUMMY_BUYER_PHONE}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerInformation;
