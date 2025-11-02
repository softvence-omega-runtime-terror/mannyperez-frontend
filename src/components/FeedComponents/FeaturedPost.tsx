// src/components/FeedComponents/FeaturedPost.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment, FaRegBookmark, FaCrown } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { ProductType } from "@/pages/Feed"; // import ProductType

// --- Imported Assets ---
import userA from "../../assets/feedImg/usermale1.jpg";
import productA from "../../assets/feedImg/spotlight1.png";
import productB from "../../assets/feedImg/spotlight2.png";
import productC from "../../assets/feedImg/spotlight3.png";
import commenterA from "../../assets/feedImg/userFeed.jpg";

// --- Props ---
interface FeaturedPostProps {
  onBuyNow?: (product: ProductType) => void;
}

// --- Component ---
const FeaturedPost: React.FC<FeaturedPostProps> = ({ onBuyNow }) => {
  const navigate = useNavigate();

  const postData: ProductType & { sellerName: string; profileImageUrl: string; timePosted: string; status: string; hashtags: string[]; stats: { likes: number; comments: number; views: string }; currentUserImageUrl: string; commentsList: { id: number; user: string; text: string; time: string; imageUrl: string }[] } = {
    id: "featured-01",
    title: "Holographic Sticker Sheets – Various Designs",
    price: "$8 per sheet",
    imageUrls: [productA, productB, productC],
    description:
      "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!",
    sellerName: "VinylMaster",
    profileImageUrl: userA,
    timePosted: "4h ago",
    status: "Platinum",
    hashtags: ["#holographic", "#stickers", "#vinylmaster"],
    stats: { likes: 234, comments: 89, views: "3.2k" },
    currentUserImageUrl: commenterA,
    commentsList: [
      { id: 1, user: "CraftyBuyer", text: "Do you offer international shipping? These look amazing!", time: "2h ago", imageUrl: commenterA },
      { id: 2, user: "ArtisticSoul", text: "Love the quality! Will definitely order again.", time: "1h ago", imageUrl: commenterA },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img src={postData.profileImageUrl} alt={`${postData.sellerName} profile`} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-800">{postData.sellerName}</span>
                <span className="flex gap-2 items-center px-2 py-1.5 text-xs font-semibold text-purple-600 bg-purple-200 rounded-sm">
                  <FaCrown /> {postData.status}
                </span>
                <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">Unfollow</button>
              </div>
              <p className="text-xs text-gray-500">Posted {postData.timePosted}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-sm font-semibold bg-yellow-400 rounded-lg">Featured Post</span>
        </div>

        {/* Title + Description */}
        <h2 className="text-lg font-bold text-gray-900 mb-2">{postData.title}</h2>
        <p className="text-sm text-gray-700 mb-4">{postData.description}</p>

        {/* Product Images */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {postData.imageUrls.map((src, index) => (
            <div key={index} className="aspect-video overflow-hidden rounded-lg">
              <img src={src} alt={`Sample product ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {postData.hashtags.map((tag, index) => (
            <span key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">{tag}</span>
          ))}
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">{postData.price}</span>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-pink-600 hover:bg-gray-50 transition duration-150 space-x-2">
              <FiShoppingCart className="w-5 h-5" />
              <span className="font-semibold text-sm">Cart</span>
            </button>

            {/* Message Button */}
            <button
              onClick={() => navigate(`/feed/messages/${postData.id}`)}
              className="px-4 py-2 border border-pink-600 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition duration-150"
            >
              Message
            </button>

            {/* Buy Now with full product object */}
            <button
              onClick={() => onBuyNow?.({
                id: postData.id,
                title: postData.title,
                price: postData.price,
                imageUrls: postData.imageUrls,
                description: postData.description,
              })}
              className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-150"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
          <div className="flex items-center space-x-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center space-x-1"><FaRegHeart className="w-5 h-5 hover:text-pink-500 cursor-pointer" /><span>{postData.stats.likes}</span></div>
            <div className="flex items-center space-x-1"><FaRegComment className="w-5 h-5" /><span>{postData.stats.comments}</span></div>
            <div className="flex items-center space-x-1"><span>{postData.stats.views}</span></div>
          </div>
          <FaRegBookmark className="w-5 h-5 text-gray-500 hover:text-pink-500 cursor-pointer" />
        </div>

        {/* Comment Input */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img src={postData.currentUserImageUrl} alt="User profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-1 items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-pink-500">
            <input type="text" placeholder="Write a comment" className="flex-1 bg-white focus:outline-none text-sm" />
          </div>
          <button className="p-2 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition duration-150">
            <IoSend className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="mt-4 space-y-2">
          {postData.commentsList.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3 py-3 border-b border-gray-50 last:border-b-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mt-1">
                <img src={comment.imageUrl} alt={`${comment.user} profile`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 p-2 rounded-xl">
                  <span className="text-sm font-semibold text-gray-800">{comment.user}</span>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 ml-2 text-xs text-gray-500">
                  <span>{comment.time}</span>
                  <button className="font-semibold hover:text-pink-600 transition-colors">Like</button>
                  <button className="font-semibold hover:text-pink-600 transition-colors">Reply</button>
                </div>
              </div>
              <BsThreeDots className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
