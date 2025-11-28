// src/components/CheckoutComponents/CheckoutSidebar.tsx
import React from 'react';
import OrderTotalCard from './OrderTotalCard';

interface CheckoutSidebarProps {
  subtotal: number;
  shipping: number;
  // platformFee?: number;
  isSubmitting?: boolean;
  onPlaceOrder?: () => void;
}

const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  subtotal,
  shipping,
  // platformFee,
  isSubmitting,
  onPlaceOrder,
}) => {
  return (
    <div className="space-y-6">
      <OrderTotalCard
        subtotal={subtotal}
        shipping={shipping}
        // platformFee={platformFee}
        isSubmitting={isSubmitting}
        onPlaceOrder={onPlaceOrder}
      />
      {/* <SafeAndSecureCard /> */}
    </div>
  );
};

export default CheckoutSidebar;
