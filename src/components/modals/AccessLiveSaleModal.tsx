// src/components/Modals/AccessLiveSaleModal.tsx
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Close icon

interface AccessLiveSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Data for Access Options
const ACCESS_OPTIONS = [
  { id: 1, name: "Access Pass", details: "5-7 business days\nTracking included", price: "$5.00" },
  { id: 2, name: "Refundable Deposit", details: "Applied to your order or refunded if unused.\n100% Refundable", price: "$25.00" },
];

// Data for Payment Methods
const PAYMENT_METHODS = [
  { id: 1, name: "Credit/Debit Card" },
  { id: 2, name: "PayPal" },
];

const AccessLiveSaleModal: React.FC<AccessLiveSaleModalProps> = ({ isOpen, onClose }) => {
  const [selectedAccessOption, setSelectedAccessOption] = useState<number>(ACCESS_OPTIONS[0].id);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(PAYMENT_METHODS[0].id);

  if (!isOpen) return null;

  const handlePayAndJoin = () => {
    console.log("Access Option:", selectedAccessOption);
    console.log("Payment Method:", selectedPaymentMethod);
    onClose();
  };

  const optionClass = (isSelected: boolean) =>
    `flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
     ${isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300 bg-white"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto overflow-hidden">
        
        {/* Modal Header */}
        <div className="relative p-6 text-center border-b border-gray-100">
          <h2 className="text-3xl font-bold text-pink-600">Access Required to Join Live Sale</h2>
          <p className="text-md text-gray-600 mt-2">
            To enter this live event, please purchase an Access Pass or make a Refundable Deposit.
          </p>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8">
          {/* Access Options Section */}
          <div className="space-y-4">
            {ACCESS_OPTIONS.map((option) => (
              <label key={option.id} className={optionClass(selectedAccessOption === option.id)}>
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="accessOption"
                    checked={selectedAccessOption === option.id}
                    onChange={() => setSelectedAccessOption(option.id)}
                    className="w-5 h-5 mt-0.5 text-pink-600 border-gray-300 focus:ring-pink-500 checked:ring-2 checked:ring-offset-2 checked:ring-pink-500"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{option.name}</p>
                    <p className="text-sm text-gray-500 whitespace-pre-line">{option.details}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-800">{option.price}</span>
              </label>
            ))}
          </div>

          {/* Payment Method Section */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
            <div className="space-y-4">
              {PAYMENT_METHODS.map((method) => (
                <label key={method.id} className={optionClass(selectedPaymentMethod === method.id)}>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => setSelectedPaymentMethod(method.id)}
                      className="w-5 h-5 text-pink-600 border-gray-300 focus:ring-pink-500 checked:ring-2 checked:ring-offset-2 checked:ring-pink-500"
                    />
                    <p className="text-lg font-semibold text-gray-800">{method.name}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer (CTA Button) */}
        <div className="p-8 pt-0">
          <button
            onClick={handlePayAndJoin}
            className="w-full py-4 bg-pink-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-pink-700 transition"
          >
            Pay & Join Live Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessLiveSaleModal;
