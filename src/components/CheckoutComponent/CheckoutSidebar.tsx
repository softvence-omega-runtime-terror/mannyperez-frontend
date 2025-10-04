// src/components/CheckoutComponents/CheckoutSidebar.tsx
import React from 'react';
import SafeAndSecureCard from './SafeAndSecureCard';
import OrderTotalCard from './OrderTotalCard';

// Dummy data for example usage
const DUMMY_ORDER_TOTALS = {
  subtotal: 15.00,
  shipping: 5.00,
  platformFee: 1.00,
};

const CheckoutSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <OrderTotalCard
        subtotal={DUMMY_ORDER_TOTALS.subtotal}
        shipping={DUMMY_ORDER_TOTALS.shipping}
        platformFee={DUMMY_ORDER_TOTALS.platformFee}
      />
      <SafeAndSecureCard />
    </div>
  );
};

export default CheckoutSidebar;