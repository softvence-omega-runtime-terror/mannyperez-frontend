import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    description: "Specializing in premium DTF transfers, UV prints, and custom designs. Fast shipping and excellent customer service.",
    profileImageUrl: userA, // use imported profile image
    sampleImages: [spotlightA, spotlightB, spotlightC], // use imported spotlight images
};
const FeedSpotlight = () => {
    return (_jsx("div", { className: "max-w-6xl mx-auto p-6", children: _jsxs("div", { className: "bg-[#FFFBEB] border-2 border-yellow-200 rounded-2xl p-8 relative", children: [_jsxs("div", { className: "absolute top-6 left-6 flex items-center gap-2 bg-[#FACC15] p-1.5 px-2 rounded-xl", children: [_jsx(FaStar, { className: "text-white w-5 h-5" }), _jsx("span", { className: "text-sm font-semibold text-black", children: "Spotlight" })] }), _jsxs("div", { className: "flex items-center gap-4 mb-6 mt-10", children: [_jsx("div", { className: "w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0", children: _jsx("img", { src: sellerData.profileImageUrl, alt: `${sellerData.name} profile`, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: sellerData.name }), _jsxs("span", { className: "flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-md", children: [_jsx(FaCrown, {}), " ", sellerData.status] }), _jsx("button", { className: "text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors", children: "+ Follow" })] }), sellerData.sellerOfTheMonth && (_jsx("p", { className: "text-gray-600 text-sm mt-1", children: "Seller of the Month" }))] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [sellerData.listings, " Listings \u2022 ", sellerData.sales, " Sales"] }), _jsx("p", { className: "mt-2 text-gray-700", children: sellerData.description })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6", children: sellerData.sampleImages.map((src, index) => (_jsx("div", { className: "aspect-video rounded-lg overflow-hidden", children: _jsx("img", { src: src, alt: `Sample ${index + 1}`, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) }, index))) }), _jsx(Button, { className: "bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg", children: "View Profile" })] }) }));
};
export default FeedSpotlight;
