import React from "react";
import { useParams } from "react-router-dom";
import OrderSummary from "@/components/CheckoutComponent/OrderSummary";
import BuyerInformation from "@/components/CheckoutComponent/BuyerInformation";
import ShippingAddress from "@/components/CheckoutComponent/ShippingAdress";
import ShippingMethod from "@/components/CheckoutComponent/ShippingMethod";
import PaymentMethod from "@/components/CheckoutComponent/PaymentMethod";
import CheckoutSidebar from "@/components/CheckoutComponent/CheckoutSidebar";

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: Replace with API fetch by ID
  const product = {
    id,
    title: "Placeholder Product",
    price: "$15.00",
    imageUrls: ["/dummy/image_d19c84.png"],
    description: "This is a placeholder product for checkout.",
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <OrderSummary product={product} />
          <BuyerInformation />
          <ShippingAddress />
          <ShippingMethod onShippingSelect={() => {}} />
          <PaymentMethod />
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
