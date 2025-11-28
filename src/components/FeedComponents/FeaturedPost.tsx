// src/components/FeedComponents/FeaturedPost.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment, FaRegBookmark, FaCrown } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useGetProductsQuery } from "@/store/services/productsApi";

type CommentType = {
  id: number;
  user: string;
  text: string;
  time: string;
  imageUrl: string;
};

type FeaturedPostProps = {
  onBuyNow?: (product: any) => void;
};

const FeaturedPost: React.FC<FeaturedPostProps> = ({ onBuyNow }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery(undefined);
  console.log(data)

  // --- Hooks must be top level ---
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentType[]>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  if (isLoading || !data?.data) return <div>Loading...</div>;

  const products = data.data;

  const renderPriceRange = (pricing: any[]) => {
    if (!pricing || pricing.length === 0) return "$0";
    const prices = pricing.map((p) => p.price || 0);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} - $${max}`;
  };

  const handleLike = (productId: string) => {
    setLikesMap((prev) => ({
      ...prev,
      [productId]: (prev[productId] || products.find((p: any) => p._id === productId)?.socialDetails?.likes || 0) + 1,
    }));
  };

  const handleAddComment = (productId: string) => {
    const text = newComments[productId];
    if (!text || text.trim() === "") return;

    const newComment: CommentType = {
      id: Date.now(),
      user: "You",
      text: text.trim(),
      time: "Just now",
      imageUrl: "/dummy/user.jpg",
    };

    setCommentsMap((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || products.find((p: any) => p._id === productId)?.socialDetails?.comments || []), newComment],
    }));

    setNewComments((prev) => ({ ...prev, [productId]: "" }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {products.map((product: any) => {
        const seller = product.sellerId || {};
        const sellerId = seller._id || seller.id || null;

        const info = product.productInformation || {};
        const stats = product.socialDetails || {};
        const hashtags = info.tags || [];
        const images = product.images || [];

        const likes = likesMap[product._id] ?? stats.likes ?? 0;
        const comments = commentsMap[product._id] ?? stats.comments ?? [];
        const newCommentText = newComments[product._id] ?? "";

        return (
          <div key={product._id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src="/dummy/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-semibold text-gray-800">{seller.name || "Unknown Seller"}</span>
                    <span className="flex gap-2 items-center px-2 py-1.5 text-xs font-semibold text-purple-600 bg-purple-200 rounded-sm">
                      <FaCrown /> {product.status || "Platinum"}
                    </span>
                    <button className="text-sm font-medium text-pink-600 hover:text-pink-700">Unfollow</button>
                  </div>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-semibold bg-yellow-400 rounded-lg">Featured Post</span>
            </div>

            {/* TITLE + DESCRIPTION */}
            <h2 className="text-lg font-bold text-gray-900 mb-2">{info.title || "No title"}</h2>
            <p className="text-sm text-gray-700 mb-4">{info.description || "No description"}</p>

            {/* IMAGES */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {images.slice(0, 3).map((src: string, i: number) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden">
                  <img src={src} alt="Product" className="w-full h-full object-cover hover:scale-105 transition" />
                </div>
              ))}
            </div>

            {/* HASHTAGS */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag: string, i: number) => (
                <span key={i} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">#{tag}</span>
              ))}
            </div>

            {/* PRICE + ACTIONS */}
            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <span className="text-xl font-bold text-gray-900">{renderPriceRange(product.pricingAndInventory || [])}</span>

              <div className="flex items-center space-x-3">
                <button  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-pink-600 hover:bg-gray-50">
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="font-semibold text-sm">Cart</span>
                </button>

                <button
                  onClick={() => sellerId && navigate(`/feed/messages/${sellerId}/${product._id}`)}
                  className="px-4 py-2 border border-pink-600 text-pink-600 font-semibold rounded-lg hover:bg-pink-50"
                >
                  Message
                </button>

                <button
                  onClick={() => onBuyNow?.(product)}
                  className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleLike(product._id)}>
                  <FaRegHeart className="w-5 h-5 hover:text-pink-500" />
                  <span>{likes}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <FaRegComment className="w-5 h-5" />
                  <span>{comments.length}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <span>{stats.views || 0}</span>
                </div>
              </div>
              <FaRegBookmark className="w-5 h-5 text-gray-500 hover:text-pink-500" />
            </div>

            {/* COMMENT INPUT */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="/dummy/user.jpg" alt="User" className="w-full h-full object-cover" />
              </div>

              <input
                value={newCommentText}
                onChange={(e) => setNewComments((prev) => ({ ...prev, [product._id]: e.target.value }))}
                type="text"
                placeholder="Write a comment"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:border-pink-500"
                onKeyDown={(e) => e.key === "Enter" && handleAddComment(product._id)}
              />

              <button
                onClick={() => handleAddComment(product._id)}
                className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
              >
                <IoSend className="w-5 h-5" />
              </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="mt-4 max-h-48 overflow-y-auto space-y-2 border-t border-gray-100 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 py-2 border-b border-gray-50 last:border-b-0">
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
        );
      })}
    </div>
  );
};

export default FeaturedPost;
