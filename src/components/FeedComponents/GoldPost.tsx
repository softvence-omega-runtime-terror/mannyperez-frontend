// // src/components/FeedComponents/GoldPost.tsx
// import React from "react";
// import { BsThreeDots } from "react-icons/bs";
// import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import { FiShoppingCart } from "react-icons/fi";
// import { AiFillStar } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// // --- Imported Assets ---
// import userA from "../../assets/feedImg/usermale1.jpg";
// import productA from "../../assets/feedImg/diamond1.png";
// import productB from "../../assets/feedImg/diamond2.png";
// import commenterA from "../../assets/feedImg/userFeed.jpg";

// // -------------------------------------------------------
// // 👍 REQUIRED TYPE (You were missing this)
// // -------------------------------------------------------
// export interface ProductType {
//   id: string;
//   title: string;
//   price: string;
//   imageUrls: string[];
//   description: string;
// }

// // -------------------------------------------------------
// // MOCK DATA WITH PROPER TYPES
// // -------------------------------------------------------
// interface CommentType {
//   id: number;
//   user: string;
//   text: string;
//   time: string;
//   imageUrl: string;
// }

// interface PostDataType extends ProductType {
//   sellerName: string;
//   profileImageUrl: string;
//   timePosted: string;
//   status: string;
//   hashtags: string[];
//   stats: {
//     likes: number;
//     comments: number;
//     views: string;
//   };
//   currentUserImageUrl: string;
//   commentsList: CommentType[];
// }

// const postData: PostDataType = {
//   id: "gold-01",
//   title: "Glitter DTF Transfers – A4 Sheets",
//   price: "$8 per sheet",
//   imageUrls: [productA, productB],
//   description:
//     "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories.",
//   sellerName: "VinylMaster",
//   profileImageUrl: userA,
//   timePosted: "4h ago",
//   status: "Gold",
//   hashtags: ["#fabricdestash", "#cottonrolls", "#livesale"],
//   stats: { likes: 234, comments: 89, views: "3.2k" },
//   currentUserImageUrl: commenterA,
//   commentsList: [
//     {
//       id: 1,
//       user: "CraftyBuyer",
//       text: "Do you offer international shipping?",
//       time: "2h ago",
//       imageUrl: commenterA,
//     },
//     {
//       id: 2,
//       user: "ArtisticSoul",
//       text: "Love the quality!",
//       time: "1h ago",
//       imageUrl: commenterA,
//     },
//   ],
// };

// // -------------------------------------------------------
// // PROPS
// // -------------------------------------------------------
// interface GoldPostProps {
//   onBuyNow?: (product: ProductType) => void;
// }

// // -------------------------------------------------------
// // COMPONENT
// // -------------------------------------------------------
// const GoldPost: React.FC<GoldPostProps> = ({ onBuyNow }) => {
//   const navigate = useNavigate();

//   const handleMessageClick = () => {
//     navigate(`/feed/messages/${postData.id}`);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6">
//       <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <img
//               src={postData.profileImageUrl}
//               alt={postData.sellerName}
//               className="w-11 h-11 rounded-full object-cover border border-gray-200"
//             />
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="text-base font-semibold text-gray-900">
//                   {postData.sellerName}
//                 </span>
//                 <span className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold bg-yellow-400 rounded-sm">
//                   <AiFillStar size={16} /> {postData.status}
//                 </span>
//                 <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">
//                   + Follow
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">
//                 Posted {postData.timePosted}
//               </p>
//             </div>
//           </div>
//           <BsThreeDots className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
//         </div>

//         {/* Title */}
//         <h2 className="text-lg font-bold text-gray-900 mb-2">
//           {postData.title}
//         </h2>
//         <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//           {postData.description}
//         </p>

//         {/* Product Images */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           {postData.imageUrls.map((src: string, index: number) => (
//             <div
//               key={index}
//               className="aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
//             >
//               <img
//                 src={src}
//                 alt={`Product ${index + 1}`}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Hashtags */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {postData.hashtags.map((tag: string, index: number) => (
//             <span
//               key={index}
//               className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Price + Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-t border-gray-100">
//           <span className="text-xl font-bold text-gray-900">
//             {postData.price}
//           </span>
//           <div className="flex items-center gap-2">
//             <button className="flex items-center px-3 py-2 border border-gray-200 rounded-lg text-pink-600 hover:bg-gray-50 transition duration-150 gap-2">
//               <FiShoppingCart className="w-5 h-5" />
//               <span className="font-semibold text-sm">Cart</span>
//             </button>

//             <button
//               onClick={handleMessageClick}
//               className="px-3 py-2 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-150"
//             >
//               Message
//             </button>

//             <button
//               onClick={() =>
//                 onBuyNow?.({
//                   id: postData.id,
//                   title: postData.title,
//                   price: postData.price,
//                   imageUrls: postData.imageUrls,
//                   description: postData.description,
//                 })
//               }
//               className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition duration-150"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
//           <div className="flex items-center gap-6 text-gray-600 text-sm">
//             <button className="flex items-center gap-1 hover:text-pink-600 transition">
//               <FaRegHeart className="w-5 h-5" />
//               <span>{postData.stats.likes}</span>
//             </button>

//             <button className="flex items-center gap-1 hover:text-pink-600 transition">
//               <FaRegComment className="w-5 h-5" />
//               <span>{postData.stats.comments}</span>
//             </button>

//             <div className="flex items-center gap-1">
//               <FaRegBookmark className="w-5 h-5" />
//               <span>{postData.stats.views}</span>
//             </div>
//           </div>
//         </div>

//         {/* Comment Input */}
//         <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-3">
//           <img
//             src={postData.currentUserImageUrl}
//             alt="User profile"
//             className="w-10 h-10 rounded-full object-cover border border-gray-200"
//           />
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             className="flex-1 h-10 bg-white border border-gray-300 rounded-full px-4 text-sm focus:outline-none focus:border-pink-500"
//           />
//           <button className="w-10 h-10 flex items-center justify-center bg-pink-600 rounded-full text-white hover:bg-pink-700 transition">
//             <IoSend className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Comments */}
//         <div className="mt-4 space-y-3">
//           {postData.commentsList.map((comment: CommentType) => (
//             <div
//               key={comment.id}
//               className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0"
//             >
//               <img
//                 src={comment.imageUrl}
//                 alt={comment.user}
//                 className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-1"
//               />

//               <div className="flex-1">
//                 <div className="bg-gray-50 px-3 py-2 rounded-lg">
//                   <span className="text-sm font-semibold text-gray-800 block">
//                     {comment.user}
//                   </span>
//                   <p className="text-sm text-gray-700">{comment.text}</p>
//                 </div>

//                 <div className="flex items-center gap-4 mt-1 ml-2 text-xs text-gray-500">
//                   <span>{comment.time}</span>
//                   <button className="hover:text-pink-600 font-medium">
//                     Like
//                   </button>
//                   <button className="hover:text-pink-600 font-medium">
//                     Reply
//                   </button>
//                 </div>
//               </div>

//               <BsThreeDots className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoldPost;
