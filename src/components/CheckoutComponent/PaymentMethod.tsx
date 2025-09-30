// src/components/CheckoutComponent/PaymentMethod.tsx
import React, { useState } from "react";

type PaymentOption = "card" | "paypal";

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption>("card");

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Payment Method</h3>

      <div className="space-y-4">
        {/* Credit/Debit Card Option */}
        <label
          className={`flex items-center border p-4 rounded-lg cursor-pointer transition ${
            selectedOption === "card" ? "border-pink-500" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={selectedOption === "card"}
            onChange={() => setSelectedOption("card")}
            className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500 mr-4"
          />
          <div>
            <p className="text-md font-semibold">Credit / Debit Card</p>
            <p className="text-sm text-gray-500">Visa, MasterCard, Amex</p>
          </div>
        </label>

        {/* PayPal Option */}
        <label
          className={`flex items-center border p-4 rounded-lg cursor-pointer transition ${
            selectedOption === "paypal" ? "border-pink-500" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={selectedOption === "paypal"}
            onChange={() => setSelectedOption("paypal")}
            className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500 mr-4"
          />
          <div>
            <p className="text-md font-semibold">PayPal</p>
            <p className="text-sm text-gray-500">Use your PayPal account</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
