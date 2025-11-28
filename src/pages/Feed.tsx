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
import MessageLeftSidebar from "./messages/buyer/MessageLeftSidebar";
import MessageRightSidebar from "./messages/buyer/MessageRightSidebar";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { MessageProduct } from "./messages/buyer/MessagePage";

// Component to show selected product inside messaging
const CurrentPackage: React.FC<{ onBuyNow?: (product: any) => void }> = ({
  onBuyNow,
}) => {
  const { productId } = useParams();

  const { data: productData, isLoading } = useGetProductByIdQuery(
    productId as any,
    {
      skip: !productId,
    }
  );

  if (isLoading || !productData?.data) return <div>Loading...</div>;

  const product = productData.data;

  // --- Calculate price ---
  const renderPrice = () => {
    const prices = product.pricingAndInventory?.map((p: any) =>
      Number(p.price)
    );

    if (!prices?.length) return null;

    if (prices.length > 1) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return (
        <p className="text-xl font-bold text-pink-600">
          ${min.toFixed(2)} - ${max.toFixed(2)}
        </p>
      );
    }

    return (
      <p className="text-xl font-bold text-pink-600">${prices[0].toFixed(2)}</p>
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
              {product.productInformation?.title}
            </p>
            {/* <p className="text-sm text-gray-500">
              {product.productInformation?.description}
            </p> */}
            <div className="mt-1">{renderPrice()}</div>
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

// --- MAIN FEED COMPONENT ---
const Feed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMessagesRoute = location.pathname.startsWith("/feed/messages");

  const [checkoutProduct, setCheckoutProduct] = useState<any | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);

  const handleBuyNow = (product: any) => {
    setCheckoutProduct(product);
    navigate(`/checkout/${product._id}`);
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
              onShippingSelect={(id) => setSelectedShipping(id)}
            />
            <PaymentMethod />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {isMessagesRoute ? (
          <>
            <div className="lg:col-span-3">
              <MessageLeftSidebar />
            </div>

            <div className="lg:col-span-6">
              <CurrentPackage onBuyNow={handleBuyNow} />
              <div className="bg-white p-4 shadow min-h-[calc(100vh-220px)] rounded-xl border">
                <Outlet />
              </div>
            </div>

            <div className="lg:col-span-3">
              <MessageRightSidebar />
            </div>
          </>
        ) : (
          <>
            <div className="lg:col-span-9 space-y-6">
              <DestashAdmin />
              <FeedSpotlight />
              <LiveStream />
              <FeaturedPost onBuyNow={handleBuyNow} />
              <DiamondPost onBuyNow={handleBuyNow} />
              <GoldPost onBuyNow={handleBuyNow} />
            </div>

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
};

export default Feed;
