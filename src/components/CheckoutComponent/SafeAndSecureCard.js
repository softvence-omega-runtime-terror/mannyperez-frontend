import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheckIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/solid';
const SafeAndSecureCard = () => {
    // Utility component for a secure badge
    const SecurityBadge = ({ icon, title, subtitle }) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-green-600 flex-shrink-0", children: icon }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-800", children: title }), _jsx("p", { className: "text-xs text-gray-500", children: subtitle })] })] }));
    return (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow-lg mt-6 border border-gray-100", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Safe & Secure" }), _jsxs("div", { className: "space-y-5", children: [_jsx(SecurityBadge, { icon: _jsx(CreditCardIcon, { className: "w-6 h-6" }), title: "Stripe Secure", subtitle: "Bank-level security" }), _jsx(SecurityBadge, { icon: _jsx(ShieldCheckIcon, { className: "w-6 h-6" }), title: "PayPal Protected", subtitle: "Buyer protection included" }), _jsx(SecurityBadge, { icon: _jsx(LockClosedIcon, { className: "w-6 h-6" }), title: "SSL Secured", subtitle: "256-bit encryption" })] }), _jsx("p", { className: "text-xs text-green-600 mt-4 cursor-pointer hover:underline", children: "Money-Back Guarantee" })] }));
};
export default SafeAndSecureCard;
