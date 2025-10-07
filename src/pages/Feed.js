import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/Feed.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DestashAdmin from "@/components/FeedComponents/DestashAdmin";
import DiamondPost from "@/components/FeedComponents/DiamondPost";
import FeaturedPost from "@/components/FeedComponents/FeaturedPost";
import FeedSidbar from "@/components/FeedComponents/FeedSidebar";
import FeedSpotlight from "@/components/FeedComponents/FeedSpotlight";
import GoldPost from "@/components/FeedComponents/GoldPost";
import LiveStream from "@/components/FeedComponents/LiveStream";
import CheckoutSidebar from "@/components/CheckoutComponent/CheckoutSidebar";
import OrderSummary from "@/components/CheckoutComponent/OrderSummary";
import BuyerInformation from "@/components/CheckoutComponent/BuyerInformation";
import ShippingAddress from "@/components/CheckoutComponent/ShippingAdress";
import ShippingMethod from "@/components/CheckoutComponent/ShippingMethod";
import PaymentMethod from "@/components/CheckoutComponent/PaymentMethod";
import UserNavbar from "@/components/layout/UserNavbar";
// --- Placeholder Components ---
const MessageListSidebar = () => (_jsxs("div", { className: "bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Messages" }), _jsx("p", { className: "text-gray-500", children: "Message list container..." })] }));
const MessageRightSidebar = () => (_jsxs("div", { className: "bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Seller Info" }), _jsx("p", { className: "text-gray-500", children: "Seller profile info..." })] }));
const CurrentPackage = () => (_jsxs("div", { className: "bg-white p-4 flex justify-between items-center shadow rounded-xl border border-gray-100 mb-6", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: "/dummy/holographic.png", alt: "Product", className: "w-12 h-12 object-cover rounded mr-4" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold", children: "Glitter DTF Transfers - Custom Design" }), _jsx("p", { className: "text-sm text-gray-500", children: "Premium holographic vinyl transfers" }), _jsx("p", { className: "text-md font-bold text-pink-600", children: "$15.00" })] })] }), _jsx("button", { className: "bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition", children: "Buy Now" })] }));
const DUMMY_PRODUCT = {
    title: "Glitter DTF Transfers – A4 Sheets",
    price: "$15.00",
    imageUrls: ["/dummy/image_d19c84.png"],
    description: "High-quality glitter DTF transfers on A4 sheets.",
};
function Feed() {
    const [checkoutProduct, setCheckoutProduct] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedShipping, setSelectedShipping] = useState(null);
    const location = useLocation();
    const isMessagesRoute = location.pathname.startsWith("/feed/messages");
    const handleBuyNow = (product) => {
        setCheckoutProduct(product || DUMMY_PRODUCT);
    };
    // --- Checkout Layout ---
    if (checkoutProduct) {
        return (_jsx("div", { className: "container mx-auto px-4 py-6 min-h-screen", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [_jsxs("div", { className: "lg:col-span-9 space-y-6", children: [_jsx(OrderSummary, { product: checkoutProduct }), _jsx(BuyerInformation, {}), _jsx(ShippingAddress, {}), _jsx(ShippingMethod, { onShippingSelect: (id) => setSelectedShipping(id) }), _jsx(PaymentMethod, {})] }), _jsx("div", { className: "lg:col-span-3", children: _jsx(CheckoutSidebar, {}) })] }) }));
    }
    // --- Feed / Messages Layout ---
    return (_jsxs(_Fragment, { children: [_jsx(UserNavbar, {}), _jsx("div", { className: "container mx-auto px-4 py-6", children: _jsx("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12", children: isMessagesRoute ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "lg:col-span-3", children: _jsx(MessageListSidebar, {}) }), _jsxs("div", { className: "lg:col-span-6", children: [_jsx(CurrentPackage, {}), _jsx("div", { className: "bg-white p-4 shadow min-h-[calc(100vh-220px)] rounded-xl border border-gray-100", children: _jsx(Outlet, {}) })] }), _jsx("div", { className: "lg:col-span-3", children: _jsx(MessageRightSidebar, {}) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "lg:col-span-9 space-y-6", children: [_jsx(DestashAdmin, {}), _jsx(FeedSpotlight, {}), _jsx(LiveStream, {}), _jsx(FeaturedPost, { onBuyNow: handleBuyNow }), _jsx(DiamondPost, { onBuyNow: handleBuyNow }), _jsx(GoldPost, { onBuyNow: handleBuyNow })] }), _jsx("div", { className: "lg:col-span-3 relative", children: _jsx("div", { className: "sticky top-6", children: _jsx(FeedSidbar, {}) }) })] })) }) })] }));
}
export default Feed;
