import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom"; // <-- for navigation
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment, FaRegBookmark, FaCrown } from "react-icons/fa";
import { IoShareOutline, IoSend } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
// --- Imported Assets ---
import userA from "../../assets/feedImg/usermale1.jpg";
import productA from "../../assets/feedImg/spotlight1.png";
import productB from "../../assets/feedImg/spotlight2.png";
import productC from "../../assets/feedImg/spotlight3.png";
import commenterA from "../../assets/feedImg/userFeed.jpg";
const FeaturedPost = ({ onBuyNow }) => {
    const navigate = useNavigate(); // initialize navigate
    const postData = {
        id: "featured-01", // <-- unique ID added
        sellerName: "VinylMaster",
        profileImageUrl: userA,
        timePosted: "4h ago",
        status: "Platinum",
        title: "Holographic Sticker Sheets – Various Designs",
        description: "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!",
        price: "$8 per sheet",
        imageUrls: [productA, productB, productC],
        hashtags: ["#holographic", "#stickers", "#vinylmaster"],
        stats: {
            likes: 234,
            comments: 89,
            views: "3.2k",
        },
        currentUserImageUrl: userA,
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
                user: "ArtisticSoul",
                text: "Love the quality! Will definitely order again.",
                time: "1h ago",
                imageUrl: commenterA,
            },
        ],
    };
    return (_jsx("div", { className: "max-w-7xl mx-auto p-6", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-gray-100 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0", children: _jsx("img", { src: postData.profileImageUrl, alt: `${postData.sellerName} profile`, className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-base font-semibold text-gray-800", children: postData.sellerName }), _jsxs("span", { className: "flex gap-2 items-center px-2 py-1.5 text-xs font-semibold text-purple-600 bg-purple-200 rounded-sm", children: [_jsx(FaCrown, {}), " ", postData.status] }), _jsx("button", { className: "text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors", children: "Unfollow" })] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Posted ", postData.timePosted] })] })] }), _jsx("span", { className: "px-3 py-1 text-sm font-semibold bg-yellow-400 rounded-lg", children: "Featured Post" })] }), _jsx("h2", { className: "text-lg font-bold text-gray-900 mb-2", children: postData.title }), _jsx("p", { className: "text-sm text-gray-700 mb-4", children: postData.description }), _jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: postData.imageUrls.map((src, index) => (_jsx("div", { className: "aspect-video overflow-hidden rounded-lg", children: _jsx("img", { src: src, alt: `Sample product ${index + 1}`, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) }, index))) }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: postData.hashtags.map((tag, index) => (_jsx("span", { className: "text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium", children: tag }, index))) }), _jsxs("div", { className: "flex items-center justify-between py-2 border-t border-gray-100", children: [_jsx("span", { className: "text-xl font-bold text-gray-900", children: postData.price }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("button", { className: "flex items-center px-4 py-2 border border-gray-300 rounded-lg text-pink-600 hover:bg-gray-50 transition duration-150 space-x-2", children: [_jsx(FiShoppingCart, { className: "w-5 h-5" }), _jsx("span", { className: "font-semibold text-sm", children: "Cart" })] }), _jsx("button", { onClick: () => navigate(`/feed/messages/${postData.id}`), className: "px-4 py-2 border border-pink-600 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition duration-150", children: "Message" }), _jsx("button", { onClick: () => onBuyNow?.({
                                        title: postData.title,
                                        price: postData.price,
                                        imageUrls: postData.imageUrls,
                                        description: postData.description,
                                    }), className: "px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-150", children: "Buy Now" })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100 mt-2", children: [_jsxs("div", { className: "flex items-center space-x-4 text-gray-500 text-sm font-medium", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(FaRegHeart, { className: "w-5 h-5 hover:text-pink-500 cursor-pointer" }), _jsx("span", { children: postData.stats.likes })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(FaRegComment, { className: "w-5 h-5" }), _jsx("span", { children: postData.stats.comments })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(IoShareOutline, { className: "w-5 h-5 transform rotate-90" }), _jsx("span", { children: postData.stats.views })] })] }), _jsx(FaRegBookmark, { className: "w-5 h-5 text-gray-500 hover:text-pink-500 cursor-pointer" })] }), _jsxs("div", { className: "flex items-center space-x-3 pt-4 border-t border-gray-100", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0", children: _jsx("img", { src: postData.currentUserImageUrl, alt: "User profile", className: "w-full h-full object-cover" }) }), _jsx("div", { className: "flex flex-1 items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-pink-500", children: _jsx("input", { type: "text", placeholder: "Write a comment", className: "flex-1 bg-white focus:outline-none text-sm" }) }), _jsx("button", { className: "p-2 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition duration-150", children: _jsx(IoSend, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "mt-4 space-y-2", children: postData.comments.map((comment) => (_jsxs("div", { className: "flex items-start space-x-3 py-3 border-b border-gray-50 last:border-b-0", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mt-1", children: _jsx("img", { src: comment.imageUrl, alt: `${comment.user} profile`, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "bg-gray-50 p-2 rounded-xl", children: [_jsx("span", { className: "text-sm font-semibold text-gray-800", children: comment.user }), _jsx("p", { className: "text-sm text-gray-700", children: comment.text })] }), _jsxs("div", { className: "flex items-center space-x-4 mt-1 ml-2 text-xs text-gray-500", children: [_jsx("span", { children: comment.time }), _jsx("button", { className: "font-semibold hover:text-pink-600 transition-colors", children: "Like" }), _jsx("button", { className: "font-semibold hover:text-pink-600 transition-colors", children: "Reply" })] })] }), _jsx(BsThreeDots, { className: "w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" })] }, comment.id))) })] }) }));
};
export default FeaturedPost;
