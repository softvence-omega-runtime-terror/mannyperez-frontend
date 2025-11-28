// src/components/CheckoutComponents/OrderTotalCard.tsx
import React from 'react';

// Type for the breakdown props
interface OrderTotalProps {
  subtotal: number;
  shipping: number;
  quantity: number;
  platformFee?: number;
  isSubmitting?: boolean;
  onPlaceOrder?: () => void;
}

const OrderTotalCard: React.FC<OrderTotalProps> = ({
  subtotal,
  shipping,
  quantity,
  // platformFee = 1,
  isSubmitting = false,
  onPlaceOrder,
}) => {
  const total = subtotal + shipping;
  const itemsLabel = `Subtotal (${quantity} item${quantity !== 1 ? "s" : ""})`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Order Total</h3>
      <div className="space-y-3 text-gray-700">

        <div className="flex justify-between">
          <span className="text-sm">Quantity</span>
          <span className="font-medium">{quantity}</span>
        </div>
        
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm">{itemsLabel}</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-sm">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>

        {/* Platform Fee */}
        {/* <div className="flex justify-between border-b pb-3 mb-3">
          <span className="text-sm">Platform Fee</span>
          <span className="font-medium">${platformFee.toFixed(2)}</span>
        </div> */}

        {/* Total */}
        <div className="flex justify-between  border-t pt-3 mt-3 items-center ">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-xl font-extrabold text-pink-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Pay Later and Confirm Button */}
      <div className="mt-6">
        {/* <div className="flex items-center mb-4">
          <input id="pay-later" type="checkbox" className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500" />
          <label htmlFor="pay-later" className="ml-2 text-sm font-medium text-gray-900">Pay Later</label>
        </div> */}
        <button
          onClick={onPlaceOrder}
          disabled={isSubmitting}
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition shadow-md disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderTotalCard;
