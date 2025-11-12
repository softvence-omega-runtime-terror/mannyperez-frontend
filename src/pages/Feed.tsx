/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import MessageLeftSidebar from "./messages/MessageLeftSidebar";
import MessageRightSidebar from "./messages/MessageRightSidebar";

// --- Import separate message sidebars ---


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
  title: "Glitter DTF Transfers – A4 Sheets",
  price: "$15.00",
  imageUrls: ["/dummy/image_d19c84.png"],
  description: "High-quality glitter DTF transfers on A4 sheets.",
};

// --- Placeholder for Current Package in Messages ---
interface CurrentPackageProps {
  product?: ProductType;
  onBuyNow?: (product: ProductType) => void;
  onSendMessage?: (message: string) => void;
}
const CurrentPackage: React.FC<CurrentPackageProps> = ({
  product = DUMMY_PRODUCT,
  onBuyNow,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-4 flex flex-col shadow rounded-xl border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={product.imageUrls[0]}
            alt={product.title}
            className="w-12 h-12 object-cover rounded mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-md font-bold text-pink-600">{product.price}</p>
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

      {/* Message Input */}
      {onSendMessage && (
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Write a message"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Feed Component ---
const Feed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMessagesRoute = location.pathname.startsWith("/feed/messages");

  const [checkoutProduct, setCheckoutProduct] = useState<ProductType | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);

  // --- Handle Buy Now ---
  const handleBuyNow = (product: ProductType) => {
    setCheckoutProduct(product);
    navigate(`/checkout/${product.id}`);
  };

  // --- Placeholder for sending message ---
  const handleSendMessage = (message: string) => {
    console.log("Send message:", message);
    // Future: Call API to send message
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
        </div>
      </div>
    );
  }

  // --- Feed / Messages Layout ---
  return (
    <>
      <UserNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {isMessagesRoute ? (
            <>
              <div className="lg:col-span-3">
                <MessageLeftSidebar
                  conversations={[
    {
      id: "1",
      avatar: "/dummy/user1.jpg",
      name: "CraftyCreations",
      message: "That sounds perfect! Let me pr...",
      product: "Glitter DTF Transfers",
      time: "2h",
      unreadCount: 2,
    },
    {
      id: "2",
      avatar: "/dummy/user2.jpg",
      name: "DesignPro",
      message: "That sounds perfect! Let me pr...",
      product: "Custom Logo Design",
      time: "2h",
    },
    {
      id: "3",
      avatar: "/dummy/user3.jpg",
      name: "PrintMaster",
      message: "Your files are ready for download",
      product: "Business Cards",
      time: "2h",
    },
    {
      id: "4",
      avatar: "/dummy/user4.jpg",
      name: "VintageVibes",
      message: "I can definitely help with that pr...",
      product: "Vintage Posters",
      time: "2h",
    },
  ]}
                />
              </div>
              <div className="lg:col-span-6">
                <CurrentPackage
                  onBuyNow={handleBuyNow}
                  onSendMessage={handleSendMessage}
                />
                <div className="bg-white p-4 shadow min-h-[calc(100vh-220px)] rounded-xl border border-gray-100">
                  <Outlet />
                </div>
              </div>
              <div className="lg:col-span-3">
                <MessageRightSidebar
                  sellerInfo="John Doe - Premium Seller"
                  buyerInfo="Jane Smith - Interested Buyer"
                />
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


