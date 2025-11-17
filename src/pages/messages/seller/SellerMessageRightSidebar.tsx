import React from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { RootState } from "@/store";
import { useGetSingleUserQuery } from "@/store/services/userApi";

const SellerMessageRightSidebar: React.FC = () => {
  const selectedConversation = useSelector(
    (state: RootState) => state.selectedConversation
  );

  const { receiver, product } = selectedConversation;
  const { data } = useGetSingleUserQuery(product?.sellerId as string, {
    skip: !product?.sellerId,
  });

  const seller = data?.data;

  // Default values
  const sellerName = seller?.name || "Unknown Seller";
  const productTitle = product?.productInformation?.title || "No title";
  const description =
    product?.productInformation?.description ||
    "Specialized product with unique features";

  const price = product?.pricingAndInventory?.[0]?.price;
  const orderCompletion = "98%"; // Example stat
  const totalOrders = 1247; // Example stat
  const responseTime = "Within 1 hour"; // Example stat
  const badge = "Gold";

  const badgeColors: Record<string, string> = {
    Gold: "bg-yellow-100 text-yellow-800",
    Silver: "bg-gray-200 text-gray-800",
    Platinum: "bg-purple-100 text-purple-800",
  };

  if (!product || !receiver)
    return (
      <div className="flex flex-col bg-white min-h-full rounded-xl border border-gray-100">
        <p className="text-gray-400 text-center mt-10 p-4">
          No conversation selected
        </p>
      </div>
    );

  return (
    <div className="flex flex-col bg-white min-h-full rounded-xl space-y-6">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={product.images?.[0] || "/default-profile.png"}
          alt={productTitle}
          className="w-24 h-24 rounded-full border-2 border-pink-500 object-cover shadow-lg"
        />
      </div>

      {/* Product Title and Badge */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold">{productTitle}</h2>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColors[badge]}`}
        >
          <FaStar className="mr-1 text-yellow-500" />
          {badge} Seller
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 text-sm italic border-b border-gray-100 pb-4">
        {description}
      </p>

      {/* Product & User Info */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Seller:</span>
          <span className="font-semibold">{sellerName}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Buyer:</span>
          <span className="font-semibold">
            {receiver.name || receiver.email}
          </span>
        </div>
        {price && (
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Base Price:</span>
            <span className="font-bold text-pink-600">${price.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Seller Stats */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <h3 className="text-md font-semibold text-gray-800">
          Seller Statistics
        </h3>
        <div className="flex justify-between text-gray-700">
          <span>Response time</span>
          <span className="text-green-600 font-medium">{responseTime}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Order completion</span>
          <span className="text-blue-600 font-medium">{orderCompletion}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Total orders</span>
          <span className="font-bold">{totalOrders.toLocaleString()}</span>
        </div>
      </div>

      {/* Button */}
      <div className="text-center pt-4">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default SellerMessageRightSidebar;
