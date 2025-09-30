import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DUMMY_BUYER_EMAIL = "john.smith@email.com";
const DUMMY_BUYER_PHONE = "+1 (555) 123-4567";
const BuyerInformation = () => {
    return (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow border border-gray-100", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Buyer Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Email Address" }), _jsx("p", { className: "mt-1 block w-full border rounded-sm px-2 border-gray-300 py-2 text-gray-900 sm:text-sm", children: DUMMY_BUYER_EMAIL })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Phone Number" }), _jsx("p", { className: "mt-1 block w-full border rounded-sm px-2 border-gray-300 py-2  text-gray-900 sm:text-sm", children: DUMMY_BUYER_PHONE })] })] })] }));
};
export default BuyerInformation;
