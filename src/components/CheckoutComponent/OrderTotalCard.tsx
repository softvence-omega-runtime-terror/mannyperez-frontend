// src/components/CheckoutComponents/OrderTotalCard.tsx
import React from 'react';

// Type for the breakdown props
interface OrderTotalProps {
  subtotal: number;
  shipping: number;
  platformFee: number;
}

const OrderTotalCard: React.FC<OrderTotalProps> = ({ subtotal, shipping, platformFee }) => {
  const total = subtotal + shipping + platformFee;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Order Total</h3>
      <div className="space-y-3 text-gray-700">
        
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm">Subtotal (1 item)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-sm">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between border-b pb-3 mb-3">
          <span className="text-sm">Platform Fee</span>
          <span className="font-medium">${platformFee.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold">Platform Fee</span>
          <span className="text-xl font-extrabold text-pink-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Pay Later and Confirm Button */}
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <input id="pay-later" type="checkbox" className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500" />
          <label htmlFor="pay-later" className="ml-2 text-sm font-medium text-gray-900">Pay Later</label>
        </div>
        <button className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition shadow-md">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderTotalCard;