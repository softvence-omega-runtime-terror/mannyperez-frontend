// src/components/CheckoutComponents/SafeAndSecureCard.tsx
import React from 'react';
import { ShieldCheckIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const SafeAndSecureCard: React.FC = () => {
  // Utility component for a secure badge
  const SecurityBadge: React.FC<{ icon: React.ReactNode, title: string, subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center space-x-3">
      <div className="text-green-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Safe & Secure</h3>
      <div className="space-y-5">
        
        {/* Stripe Secure */}
        <SecurityBadge 
          icon={<CreditCardIcon className="w-6 h-6" />}
          title="Stripe Secure"
          subtitle="Bank-level security"
        />

        {/* PayPal Protected */}
        <SecurityBadge 
          icon={<ShieldCheckIcon className="w-6 h-6" />}
          title="PayPal Protected"
          subtitle="Buyer protection included"
        />

        {/* SSL Secured */}
        <SecurityBadge 
          icon={<LockClosedIcon className="w-6 h-6" />}
          title="SSL Secured"
          subtitle="256-bit encryption"
        />
      </div>
      
      <p className="text-xs text-green-600 mt-4 cursor-pointer hover:underline">
        Money-Back Guarantee
      </p>
    </div>
  );
};

export default SafeAndSecureCard;