import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Modals/AccessLiveSaleModal.tsx
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
// Data for Access Options
const ACCESS_OPTIONS = [
    { id: 1, name: "Access Pass", details: "5-7 business days\nTracking included", price: "$5.00" },
    { id: 2, name: "Refundable Deposit", details: "Applied to your order or refunded if unused.\n100% Refundable", price: "$25.00" },
];
// Data for Payment Methods
const PAYMENT_METHODS = [
    { id: 1, name: "Credit/Debit Card" },
    { id: 2, name: "PayPal" },
];
const AccessLiveSaleModal = ({ isOpen, onClose }) => {
    const [selectedAccessOption, setSelectedAccessOption] = useState(ACCESS_OPTIONS[0].id);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHODS[0].id);
    if (!isOpen)
        return null;
    const handlePayAndJoin = () => {
        console.log("Access Option:", selectedAccessOption);
        console.log("Payment Method:", selectedPaymentMethod);
        onClose();
    };
    const optionClass = (isSelected) => `flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
     ${isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300 bg-white"}`;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto overflow-hidden", children: [_jsxs("div", { className: "relative p-6 text-center border-b border-gray-100", children: [_jsx("h2", { className: "text-3xl font-bold text-pink-600", children: "Access Required to Join Live Sale" }), _jsx("p", { className: "text-md text-gray-600 mt-2", children: "To enter this live event, please purchase an Access Pass or make a Refundable Deposit." }), _jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition", children: _jsx(AiOutlineClose, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "p-8 space-y-8", children: [_jsx("div", { className: "space-y-4", children: ACCESS_OPTIONS.map((option) => (_jsxs("label", { className: optionClass(selectedAccessOption === option.id), children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("input", { type: "radio", name: "accessOption", checked: selectedAccessOption === option.id, onChange: () => setSelectedAccessOption(option.id), className: "w-5 h-5 mt-0.5 text-pink-600 border-gray-300 focus:ring-pink-500 checked:ring-2 checked:ring-offset-2 checked:ring-pink-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-gray-800", children: option.name }), _jsx("p", { className: "text-sm text-gray-500 whitespace-pre-line", children: option.details })] })] }), _jsx("span", { className: "text-xl font-bold text-gray-800", children: option.price })] }, option.id))) }), _jsxs("div", { className: "pt-4 border-t border-gray-100", children: [_jsx("h3", { className: "text-xl font-bold text-gray-800 mb-4", children: "Payment Method" }), _jsx("div", { className: "space-y-4", children: PAYMENT_METHODS.map((method) => (_jsx("label", { className: optionClass(selectedPaymentMethod === method.id), children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("input", { type: "radio", name: "paymentMethod", checked: selectedPaymentMethod === method.id, onChange: () => setSelectedPaymentMethod(method.id), className: "w-5 h-5 text-pink-600 border-gray-300 focus:ring-pink-500 checked:ring-2 checked:ring-offset-2 checked:ring-pink-500" }), _jsx("p", { className: "text-lg font-semibold text-gray-800", children: method.name })] }) }, method.id))) })] })] }), _jsx("div", { className: "p-8 pt-0", children: _jsx("button", { onClick: handlePayAndJoin, className: "w-full py-4 bg-pink-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-pink-700 transition", children: "Pay & Join Live Sale" }) })] }) }));
};
export default AccessLiveSaleModal;
