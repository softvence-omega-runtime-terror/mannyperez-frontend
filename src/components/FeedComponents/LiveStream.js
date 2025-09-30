import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoIosNotificationsOutline } from "react-icons/io"; // Bell icon
import { GrPowerReset } from "react-icons/gr"; // Refresh icon
import { BsPersonCircle } from "react-icons/bs"; // Placeholder if profile image is missing
import userA from "../../assets/feedImg/usermale1.jpg";
import streamA from "../../assets/feedImg/liveStream1.png";
// Mock data for the Live Stream card
const streamData = {
    sellerName: "CraftyCreations",
    profileImageUrl: userA, // replaced with imported image
    timeUntilStart: "2h 15m",
    title: "Glitter DTF Transfers – A4 Sheets Premium Quality",
    description: "High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!",
    coverImageUrl: streamA, // replaced with imported cover image
    hashtags: ["#fabricdestash", "#cottonrolls", "#livesale"],
};
const LiveStream = () => {
    return (_jsx("div", { className: "max-w-7xl mx-auto p-6", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between p-6 pb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [streamData.profileImageUrl ? (_jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0", children: _jsx("img", { src: streamData.profileImageUrl, alt: `${streamData.sellerName} profile`, className: "w-full h-full object-cover" }) })) : (_jsx(BsPersonCircle, { className: "w-10 h-10 text-gray-400" })), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-base font-semibold text-gray-800", children: streamData.sellerName }), _jsx("button", { className: "text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors", children: "Unfollow" })] }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Starts in ", streamData.timeUntilStart] })] })] }), _jsxs("div", { className: "flex items-center px-3 py-1 bg-pink-600 rounded-sm", children: [_jsx("div", { className: "w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse" }), _jsx("span", { className: "text-sm font-semibold text-white", children: "Live Now" })] })] }), _jsx("div", { className: "aspect-video w-full overflow-hidden", children: _jsx("img", { src: streamData.coverImageUrl, alt: streamData.title, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900 mb-2", children: streamData.title }), _jsx("p", { className: "text-sm text-gray-700 mb-3", children: streamData.description }), _jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: streamData.hashtags.map((tag, index) => (_jsx("span", { className: "text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium", children: tag }, index))) }), _jsxs("div", { className: "flex justify-between items-center pt-2", children: [_jsxs("button", { className: "flex items-center px-5 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-150 space-x-2", children: [_jsx("div", { className: "w-2.5 h-2.5 bg-white rounded-full" }), _jsx("span", { children: "Join Live Sale Stream" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { className: "p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition duration-150", children: _jsx(IoIosNotificationsOutline, { className: "w-5 h-5" }) }), _jsx("button", { className: "p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition duration-150", children: _jsx(GrPowerReset, { className: "w-5 h-5" }) })] })] })] })] }) }));
};
export default LiveStream;
