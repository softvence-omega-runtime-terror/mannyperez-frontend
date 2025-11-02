// src/components/Messages/MessageRightSidebar.tsx
import React from "react";
import { FaStar } from "react-icons/fa";

interface MessageRightSidebarProps {
  profileImage?: string;
  username?: string;
  badge?: "Gold" | "Silver" | "Platinum";
  description?: string;
  responseTime?: string;
  orderCompletion?: string;
  totalOrders?: number;
  sellerInfo?: string; // NEW
  buyerInfo?: string;  // NEW
}

const MessageRightSidebar: React.FC<MessageRightSidebarProps> = ({
  profileImage,
  username = "CraftyCreations",
  badge = "Gold",
  description = "Specializing in DTF transfers & custom designs",
  responseTime = "Within 1 hour",
  orderCompletion = "98%",
  totalOrders = 1247,
  sellerInfo,
  buyerInfo,
}) => {
  const badgeColors: Record<string, string> = {
    Gold: "bg-yellow-100 text-yellow-800",
    Silver: "bg-gray-200 text-gray-800",
    Platinum: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="bg-white p-6 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100 space-y-6">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={profileImage || "/default-profile.png"}
          alt={username}
          className="w-20 h-20 rounded-full border-2 border-pink-300 object-cover"
        />
      </div>

      {/* Username and Badge */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold">{username}</h2>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColors[badge]}`}
        >
          <FaStar className="mr-1" />
          {badge}
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500">{description}</p>

      {/* Seller & Buyer Info */}
      {(sellerInfo || buyerInfo) && (
        <div className="space-y-2 border-t border-gray-200 pt-4">
          {sellerInfo && (
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Seller:</span>
              <span>{sellerInfo}</span>
            </div>
          )}
          {buyerInfo && (
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Buyer:</span>
              <span>{buyerInfo}</span>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
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
      <div className="text-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded w-full">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default MessageRightSidebar;
