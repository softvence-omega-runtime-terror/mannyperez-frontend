// src/pages/Feed.tsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DestashAdmin from "@/components/FeedComponents/DestashAdmin";
import DiamondPost from "@/components/FeedComponents/DiamondPost";
import FeaturedPost from "@/components/FeedComponents/FeaturedPost";
import FeedSidbar from "@/components/FeedComponents/FeedSidebar";
import FeedSpotlight from "@/components/FeedComponents/FeedSpotlight";
import GoldPost from "@/components/FeedComponents/GoldPost";
import LiveStream from "@/components/FeedComponents/LiveStream";
import CheckoutSidebar from "@/components/CheckoutComponent/CheckoutSidebar";
import OrderSummary from "@/components/CheckoutComponent/OrderSummary";
import BuyerInformation from "@/components/CheckoutComponent/BuyerInformation";
import ShippingAddress from "@/components/CheckoutComponent/ShippingAdress";
import ShippingMethod from "@/components/CheckoutComponent/ShippingMethod";
import PaymentMethod from "@/components/CheckoutComponent/PaymentMethod";

// --- Placeholder Components ---
const MessageListSidebar: React.FC = () => (
  <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
    <h2 className="text-xl font-bold mb-4">Messages</h2>
    <p className="text-gray-500">Message list container...</p>
  </div>
);

const MessageRightSidebar: React.FC = () => (
  <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
    <h2 className="text-xl font-bold mb-4">Seller Info</h2>
    <p className="text-gray-500">Seller profile info...</p>
  </div>
);

const CurrentPackage: React.FC = () => (
  <div className="bg-white p-4 flex justify-between items-center shadow rounded-xl border border-gray-100 mb-6">
    <div className="flex items-center">
      <img src="/dummy/holographic.png" alt="Product" className="w-12 h-12 object-cover rounded mr-4" />
      <div>
        <p className="text-lg font-semibold">Glitter DTF Transfers - Custom Design</p>
        <p className="text-sm text-gray-500">Premium holographic vinyl transfers</p>
        <p className="text-md font-bold text-pink-600">$15.00</p>
      </div>
    </div>
    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition">
      Buy Now
    </button>
  </div>
);

interface ProductType {
  title: string;
  price: string;
  imageUrls: string[];
  description: string;
}

const DUMMY_PRODUCT: ProductType = {
  title: "Glitter DTF Transfers – A4 Sheets",
  price: "$15.00",
  imageUrls: ["/dummy/image_d19c84.png"],
  description: "High-quality glitter DTF transfers on A4 sheets.",
};

function Feed() {
  const [checkoutProduct, setCheckoutProduct] = useState<ProductType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);

  const location = useLocation();
  const isMessagesRoute = location.pathname.startsWith("/feed/messages");

  const handleBuyNow = (product?: ProductType) => {
    setCheckoutProduct(product || DUMMY_PRODUCT);
  };

  // --- Checkout Layout ---
  if (checkoutProduct) {
    return (
      <div className="container mx-auto px-4 py-6 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
            <OrderSummary product={checkoutProduct} />
            <BuyerInformation />
            <ShippingAddress />
            <ShippingMethod onShippingSelect={(id: number) => setSelectedShipping(id)} />
            <PaymentMethod />
          </div>
          <div className="lg:col-span-3">
            <CheckoutSidebar />
          </div>
        </div>
      </div>
    );
  }

  // --- Feed / Messages Layout ---
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {isMessagesRoute ? (
          <>
            <div className="lg:col-span-3">
              <MessageListSidebar />
            </div>
            <div className="lg:col-span-6">
              <CurrentPackage />
              <div className="bg-white p-4 shadow min-h-[calc(100vh-220px)] rounded-xl border border-gray-100">
                <Outlet />
              </div>
            </div>
            <div className="lg:col-span-3">
              <MessageRightSidebar />
            </div>
          </>
        ) : (
          <>
            {/* Main Feed Content */}
            <div className="lg:col-span-9 space-y-6">
              <DestashAdmin />
              <FeedSpotlight />
              <LiveStream />
              <FeaturedPost onBuyNow={handleBuyNow} />
              <DiamondPost onBuyNow={handleBuyNow} />
              <GoldPost onBuyNow={handleBuyNow} />
            </div>

            {/* Fixed Sidebar */}
            <div className="lg:col-span-3 relative">
              <div className="sticky top-6">
                <FeedSidbar />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
