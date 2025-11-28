/* eslint-disable react-refresh/only-export-components */
// src/components/CheckoutComponent/ShippingMethod.tsx
import React, { useState } from "react";

// --- Type Definitions ---
export interface ShippingOption {
  id: number;
  name: string;
  price: string;
  estimatedTime: string;
}

interface ShippingMethodProps {
  initialSelectionId?: number; // Optional ID for the initially selected option
  onShippingSelect: (selectedOptionId: number) => void; // Callback function to inform the parent component
}


export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 1, name: "Standard Shipping", price: "$5.00", estimatedTime: "3-5 business days" },
  { id: 2, name: "Express Shipping", price: "$15.00", estimatedTime: "1-2 business days" },
  { id: 3, name: "Overnight Shipping", price: "$25.00", estimatedTime: "1 business day" },
];

// --- Component ---
const ShippingMethod: React.FC<ShippingMethodProps> = ({ initialSelectionId = SHIPPING_OPTIONS[0].id, onShippingSelect }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>(initialSelectionId);

  const handleSelectionChange = (id: number) => {
    setSelectedOptionId(id);
    onShippingSelect(id); // Call the prop function to pass the selected ID back to the parent
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-5">Shipping Method</h3>

      <div className="space-y-4">
        {SHIPPING_OPTIONS.map((option) => {
          const isSelected = selectedOptionId === option.id;
          
          return (
            <label
              key={option.id}
              className={`
                flex items-center justify-between p-4 rounded-xl cursor-pointer transition duration-200
                ${isSelected 
                  ? "border-2 border-pink-500 bg-pink-50 shadow-md" 
                  : "border border-gray-200 hover:border-pink-300 bg-white"
                }
              `}
              onClick={() => handleSelectionChange(option.id)}
            >
              {/* Left Side: Name and Estimated Time */}
              <div>
                <p className={`text-lg font-bold ${isSelected ? "text-pink-700" : "text-gray-900"}`}>{option.name}</p>
                <p className="text-sm text-gray-500">{option.estimatedTime}</p>
              </div>
              
              {/* Right Side: Price and indicator */}
              <div className="flex items-center gap-3">
                <span className={`text-lg font-extrabold ${isSelected ? "text-pink-600" : "text-gray-700"}`}>{option.price}</span>
                <div
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-pink-500 bg-pink-100" : "border-gray-300 bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingMethod;
