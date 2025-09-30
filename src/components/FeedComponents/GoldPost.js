import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment, FaRegBookmark, } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai"; // Star icon for Gold status
// --- Imported Assets ---
import userA from "../../assets/feedImg/usermale1.jpg";
import productA from "../../assets/feedImg/diamond1.png";
import productB from "../../assets/feedImg/diamond2.png";
import commenterA from "../../assets/feedImg/userFeed.jpg";
// --- Mock Data ---
const postData = {
    sellerName: "VinylMaster",
    profileImageUrl: userA,
    timePosted: "4h ago",
    status: "Gold",
    title: "Glitter DTF Transfers – A4 Sheets",
    description: "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!",
    price: "$8 per sheet",
    imageUrls: [productA, productB],
    hashtags: ["#fabricdestash", "#cottonrolls", "#livesale"],
    stats: {
        likes: 234,
        comments: 89,
        views: "3.2k",
    },
    currentUserImageUrl: commenterA,
    comments: [
        {
            id: 1,
            user: "CraftyBuyer",
            text: "Do you offer international shipping? These look amazing!",
            time: "2h ago",
            imageUrl: commenterA,
        },
        {
            id: 2,
            user: "CraftyBuyer",
            text: "Do you offer international shipping? These look amazing!",
            time: "2h ago",
            imageUrl: commenterA,
        },
    ],
};
const GoldPost = () => {
    return (_jsx("div", { className: "max-w-6xl mx-auto p-4 sm:p-6", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-md border border-gray-100 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: postData.profileImageUrl, alt: postData.sellerName, className: "w-11 h-11 rounded-full object-cover border border-gray-200" }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-base font-semibold text-gray-900", children: postData.sellerName }), _jsxs("span", { className: "flex items-center gap-1 px-2 py-1.5 text-xs font-semibold  bg-yellow-400 rounded-sm", children: [_jsx(AiFillStar, { size: 16 }), " ", postData.status] }), _jsx("button", { className: "text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors", children: "+ Follow" })] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Posted ", postData.timePosted] })] })] }), _jsx(BsThreeDots, { className: "w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" })] }), _jsx("h2", { className: "text-lg font-bold text-gray-900 mb-2", children: postData.title }), _jsx("p", { className: "text-gray-700 text-sm mb-4 leading-relaxed", children: postData.description }), _jsx("div", { className: "grid grid-cols-2 gap-3 mb-4", children: postData.imageUrls.map((src, index) => (_jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-lg shadow-sm", children: _jsx("img", { src: src, alt: `Product ${index + 1}`, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) }, index))) }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: postData.hashtags.map((tag, index) => (_jsx("span", { className: "text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors", children: tag }, index))) }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-t border-gray-100", children: [_jsx("span", { className: "text-xl font-bold text-gray-900", children: postData.price }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { className: "flex items-center px-3 py-2 border border-gray-200 rounded-lg text-pink-600 hover:bg-gray-50 transition duration-150 gap-2", children: [_jsx(FiShoppingCart, { className: "w-5 h-5" }), _jsx("span", { className: "font-semibold text-sm", children: "Cart" })] }), _jsx("button", { className: "px-3 py-2 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-150", children: "Message" }), _jsx("button", { className: "px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition duration-150", children: "Buy Now" })] })] }), _jsx("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100 mt-3", children: _jsxs("div", { className: "flex items-center gap-6 text-gray-600 text-sm", children: [_jsxs("button", { className: "flex items-center gap-1 hover:text-pink-600 transition", children: [_jsx(FaRegHeart, { className: "w-5 h-5" }), _jsx("span", { children: postData.stats.likes })] }), _jsxs("button", { className: "flex items-center gap-1 hover:text-pink-600 transition", children: [_jsx(FaRegComment, { className: "w-5 h-5" }), _jsx("span", { children: postData.stats.comments })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(FaRegBookmark, { className: "w-5 h-5" }), _jsx("span", { children: postData.stats.views })] })] }) }), _jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-gray-100 mt-3", children: [_jsx("img", { src: postData.currentUserImageUrl, alt: "User profile", className: "w-10 h-10 rounded-full object-cover border border-gray-200" }), _jsx("input", { type: "text", placeholder: "Write a comment...", className: "flex-1 h-10 bg-white border border-gray-300 rounded-full px-4 text-sm focus:outline-none focus:border-pink-500" }), _jsx("button", { className: "w-10 h-10 flex items-center justify-center bg-pink-600 rounded-full text-white hover:bg-pink-700 transition", children: _jsx(IoSend, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "mt-4 space-y-3", children: postData.comments.map((comment) => (_jsxs("div", { className: "flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0", children: [_jsx("img", { src: comment.imageUrl, alt: comment.user, className: "w-8 h-8 rounded-full object-cover border border-gray-200 mt-1" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "bg-gray-50 px-3 py-2 rounded-lg", children: [_jsx("span", { className: "text-sm font-semibold text-gray-800 block", children: comment.user }), _jsx("p", { className: "text-sm text-gray-700", children: comment.text })] }), _jsxs("div", { className: "flex items-center gap-4 mt-1 ml-2 text-xs text-gray-500", children: [_jsx("span", { children: comment.time }), _jsx("button", { className: "hover:text-pink-600 font-medium", children: "Like" }), _jsx("button", { className: "hover:text-pink-600 font-medium", children: "Reply" })] })] }), _jsx(BsThreeDots, { className: "w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" })] }, comment.id))) })] }) }));
};
export default GoldPost;
