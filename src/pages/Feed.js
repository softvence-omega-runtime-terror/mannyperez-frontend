import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Feed.tsx
import { useState } from "react";
import DestashAdmin from "@/components/FeedComponents/DestashAdmin";
import DiamondPost from "@/components/FeedComponents/DiamondPost";
import FeaturedPost from "@/components/FeedComponents/FeaturedPost";
import FeedSidbar from "@/components/FeedComponents/FeedSidebar";
import FeedSpotlight from "@/components/FeedComponents/FeedSpotlight";
import GoldPost from "@/components/FeedComponents/GoldPost";
import LiveStream from "@/components/FeedComponents/LiveStream";
function Feed() {
    const [checkoutProduct, setCheckoutProduct] = useState(null);
    // Handler for Buy Now
    const handleBuyNow = (product) => {
        setCheckoutProduct(product);
    };
    // Close checkout
    const handleBackToFeed = () => {
        setCheckoutProduct(null);
    };
    // If user clicked Buy Now → show Payment Layout
    if (checkoutProduct) {
        return (_jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [_jsxs("div", { className: "lg:col-span-9 bg-white p-6 rounded-xl shadow", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: checkoutProduct.title }), _jsx("p", { className: "mb-4", children: checkoutProduct.description }), _jsx("div", { className: "grid grid-cols-2 gap-2 mb-4", children: checkoutProduct.imageUrls.map((img, idx) => (_jsx("img", { src: img, alt: `product-${idx}`, className: "w-full rounded-lg" }, idx))) }), _jsx("p", { className: "text-xl font-bold mb-4", children: checkoutProduct.price }), _jsx("button", { className: "px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition", children: "Complete Payment" }), _jsx("button", { onClick: handleBackToFeed, className: "ml-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition", children: "Back" })] }), _jsx("div", { className: "lg:col-span-3", children: _jsx(FeedSidbar, {}) })] }) }));
    }
    // Default feed view
    return (_jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [_jsxs("div", { className: "lg:col-span-9", children: [_jsx(DestashAdmin, {}), _jsx(FeedSpotlight, {}), _jsx(LiveStream, {}), _jsx(FeaturedPost, { onBuyNow: handleBuyNow }), _jsx(DiamondPost, { onBuyNow: handleBuyNow }), _jsx(GoldPost, { onBuyNow: handleBuyNow })] }), _jsx("div", { className: "lg:col-span-3", children: _jsx(FeedSidbar, {}) })] }) }));
}
export default Feed;
