import React from "react";
import { FaCrown, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import userA from "../../assets/feedImg/userFeed.jpg";
import spotlightA from "../../assets/feedImg/spotlight1.png";
import spotlightB from "../../assets/feedImg/spotlight2.png";
import spotlightC from "../../assets/feedImg/spotlight3.png";

// Mock data
const sellerData = {
  name: "VinylMaster",
  status: "Platinum",
  sellerOfTheMonth: true,
  listings: "250+",
  sales: "1k+",
  description:
    "Specializing in premium DTF transfers, UV prints, and custom designs. Fast shipping and excellent customer service.",
  profileImageUrl: userA, // use imported profile image
  sampleImages: [spotlightA, spotlightB, spotlightC], // use imported spotlight images
};

const FeedSpotlight: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-[#FFFBEB] border-2 border-yellow-200 rounded-2xl p-8 relative">
        {/* Spotlight Header */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#FACC15] p-1.5 px-2 rounded-xl">
          <FaStar className="text-white w-5 h-5" />
          <span className="text-sm font-semibold text-black">Spotlight</span>
        </div>

        {/* Seller Profile Section */}
        <div className="flex items-center gap-4 mb-6 mt-10">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={sellerData.profileImageUrl}
              alt={`${sellerData.name} profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">
                {sellerData.name}
              </h3>
              <span className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-md">
                <FaCrown/> {sellerData.status}
              </span>
              <button className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                + Follow
              </button>
            </div>
            {sellerData.sellerOfTheMonth && (
              <p className="text-gray-600 text-sm mt-1">Seller of the Month</p>
            )}
          </div>
        </div>

        {/* Listings and Sales */}
        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-900">
            {sellerData.listings} Listings • {sellerData.sales} Sales
          </p>
          <p className="mt-2 text-gray-700">{sellerData.description}</p>
        </div>

        {/* Sample Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {sellerData.sampleImages.map((src, index) => (
            <div
              key={index}
              className="aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt={`Sample ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button className="bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default FeedSpotlight;
