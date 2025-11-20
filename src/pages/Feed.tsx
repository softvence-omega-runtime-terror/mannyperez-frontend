/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import DestashAdmin from "@/components/FeedComponents/DestashAdmin";
import DiamondPost from "@/components/FeedComponents/DiamondPost";
import FeaturedPost from "@/components/FeedComponents/FeaturedPost";
import FeedSidbar from "@/components/FeedComponents/FeedSidebar";
import FeedSpotlight from "@/components/FeedComponents/FeedSpotlight";
import GoldPost from "@/components/FeedComponents/GoldPost";
import LiveStream from "@/components/FeedComponents/LiveStream";
import OrderSummary from "@/components/CheckoutComponent/OrderSummary";
import BuyerInformation from "@/components/CheckoutComponent/BuyerInformation";
import ShippingAddress from "@/components/CheckoutComponent/ShippingAdress";
import ShippingMethod from "@/components/CheckoutComponent/ShippingMethod";
import PaymentMethod from "@/components/CheckoutComponent/PaymentMethod";
import UserNavbar from "@/components/layout/UserNavbar";
import MessageLeftSidebar from "./messages/buyer/MessageLeftSidebar";
import MessageRightSidebar from "./messages/buyer/MessageRightSidebar";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { MessageProduct } from "./messages/buyer/MessagePage";

// --- Types ---
export interface ProductType {
  id: string;
  title: string;
  price: string;
  imageUrls: string[];
  description: string;
}

// --- Dummy Product ---
const DUMMY_PRODUCT: ProductType = {
  id: "dummy-01",
  title: "Glitter DTF Transfers - A4 Sheets",
  price: "$15.00",
  imageUrls: ["/dummy/image_d19c84.png"],
  description: "High-quality glitter DTF transfers on A4 sheets.",
};

interface CurrentPackageProps {
  onBuyNow?: (product: any) => void;
  onSendMessage?: (message: string) => void;
}

const CurrentPackage: React.FC<CurrentPackageProps> = ({ onBuyNow }) => {
  const { productId } = useParams();

  const { data: productData, isLoading } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  // --- Show loading state ---
  if (isLoading || !productData?.data) {
    return <div>Loading...</div>;
  }

  // --- Safe product object ---
  const product = productData.data as MessageProduct;

  const renderPrice = () => {
    const prices = product.pricingAndInventory?.map((p) => p.price);
    if (!prices || prices.length === 0) return null;

    if (product.extraOptions?.productVariants && prices.length > 1) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return (
        <p className="text-xl font-bold text-pink-600">
          ${min.toFixed(2)}
          {min !== max && ` - $${max.toFixed(2)}`}
        </p>
      );
    }
    return (
      <p className="text-xl font-bold text-pink-600">
        ${prices[0]?.toFixed(2)}
      </p>
    );
  };

  return (
    <div className="bg-white p-4 flex flex-col shadow rounded-xl border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={product.images?.[0] || "/dummy/image_d19c84.png"}
            alt={product.productInformation?.title || "Product Image"}
            className="w-12 h-12 object-cover rounded mr-4"
          />
          <div>
            <p className="text-lg font-semibold">
              {product.productInformation?.title || "Product Title"}
            </p>
            <p className="text-sm text-gray-500">
              {product.productInformation?.description || "Product Description"}
            </p>
            <div className="mt-1 flex-shrink-0">{renderPrice()}</div>
          </div>
        </div>
        {onBuyNow && (
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Feed Component ---
const Feed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMessagesRoute = location.pathname.startsWith("/feed/messages");

  const [checkoutProduct, setCheckoutProduct] = useState<any | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);

  // --- Handle Buy Now ---
  const handleBuyNow = (product: any) => {
    setCheckoutProduct(product);
    navigate(`/checkout/${product._id}`);
  };

  // --- Placeholder for sending message ---
  const handleSendMessage = (message: string) => {
    console.log("Send message:", message);
  };

  if (checkoutProduct) {
    return (
      <div className="container mx-auto px-4 py-6 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
            <OrderSummary product={checkoutProduct} />
            <BuyerInformation />
            <ShippingAddress />
            <ShippingMethod
              onShippingSelect={(id: number) => setSelectedShipping(id)}
            />
            <PaymentMethod />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {isMessagesRoute ? (
            <>
              <div className="lg:col-span-3">
                <MessageLeftSidebar />
              </div>
              <div className="lg:col-span-6">
                <CurrentPackage onBuyNow={handleBuyNow} />
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
    </>
  );
};

export default Feed;
