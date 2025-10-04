// src/components/FeedComponents/LiveStream.tsx
import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io"; // Bell icon
import { GrPowerReset } from "react-icons/gr"; // Refresh icon
import { BsPersonCircle } from "react-icons/bs"; // Placeholder if profile image is missing
import userA from "../../assets/feedImg/usermale1.jpg";
import streamA from "../../assets/feedImg/liveStream1.png";
import AccessLiveSaleModal from "../modals/AccessLiveSaleModal";
// 👇 IMPORT THE NEW MODAL COMPONENT

// Mock data for the Live Stream card
const streamData = {
  sellerName: "CraftyCreations",
  profileImageUrl: userA, // replaced with imported image
  timeUntilStart: "2h 15m",
  title: "Glitter DTF Transfers – A4 Sheets Premium Quality",
  description:
    "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!",
  coverImageUrl: streamA, // replaced with imported cover image
  hashtags: ["#fabricdestash", "#cottonrolls", "#livesale"],
};

const LiveStream: React.FC = () => {
  // 👇 State to control the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* --------------------------- Live Stream Card --------------------------- */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Profile Header and Content... (no changes here) */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              {/* Profile Image / Placeholder */}
              {streamData.profileImageUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={streamData.profileImageUrl}
                    alt={`${streamData.sellerName} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <BsPersonCircle className="w-10 h-10 text-gray-400" />
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-gray-800">
                    {streamData.sellerName}
                  </span>
                  <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">
                    Unfollow
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Starts in {streamData.timeUntilStart}
                </p>
              </div>
            </div>

            {/* Live Now Tag */}
            <div className="flex items-center px-3 py-1 bg-pink-600 rounded-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></div>
              <span className="text-sm font-semibold text-white">Live Now</span>
            </div>
          </div>

          {/* Live Stream Cover Image */}
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={streamData.coverImageUrl}
              alt={streamData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {streamData.title}
            </h2>
            <p className="text-sm text-gray-700 mb-3">{streamData.description}</p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {streamData.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA and Action Buttons */}
            <div className="flex justify-between items-center pt-2">
              {/* 👇 Update button to open the modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-5 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-150 space-x-2"
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                <span>Join Live Sale Stream</span>
              </button>

              <div className="flex items-center space-x-3">
                {/* Notification Bell Button */}
                <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition duration-150">
                  <IoIosNotificationsOutline className="w-5 h-5" />
                </button>
                {/* Refresh Button */}
                <button className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition duration-150">
                  <GrPowerReset className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------- Access Required Modal --------------------------- */}
      <AccessLiveSaleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LiveStream;