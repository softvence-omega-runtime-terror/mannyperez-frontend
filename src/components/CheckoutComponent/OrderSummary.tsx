// src/components/CheckoutComponent/OrderSummary.tsx
import { ProductType } from "@/lib/types";
import React from "react";

interface Props {
  product: ProductType;
}

const OrderSummary: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-lg flex-shrink-0" />
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">{product.title}</h4>
          <p className="text-sm text-gray-500">
            by CraftyCrafty
            <span className="ml-2 text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
              Gold
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-md font-medium text-gray-600">{product.price} each</p>
          <p className="text-lg font-bold">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
