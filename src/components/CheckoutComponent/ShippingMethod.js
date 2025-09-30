import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/CheckoutComponent/ShippingMethod.tsx
import { useState } from "react";
// --- Dummy Data ---
const DUMMY_SHIPPING_OPTIONS = [
    { id: 1, name: "Standard Shipping", price: "$5.00", estimatedTime: "3-5 business days" },
    { id: 2, name: "Express Shipping", price: "$15.00", estimatedTime: "1-2 business days" },
    { id: 3, name: "Overnight Shipping", price: "$25.00", estimatedTime: "1 business day" },
];
// --- Component ---
const ShippingMethod = ({ initialSelectionId = DUMMY_SHIPPING_OPTIONS[0].id, onShippingSelect }) => {
    // Use the initialSelectionId prop or the first item's ID as the default
    const [selectedOptionId, setSelectedOptionId] = useState(initialSelectionId);
    const handleSelectionChange = (id) => {
        setSelectedOptionId(id);
        onShippingSelect(id); // Call the prop function to pass the selected ID back to the parent
    };
    return (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow-lg border border-gray-100", children: [_jsx("h3", { className: "text-2xl font-semibold text-gray-800 mb-5", children: "Shipping Method" }), _jsx("div", { className: "space-y-4", children: DUMMY_SHIPPING_OPTIONS.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    return (_jsxs("label", { 
                        // Conditional styling for the selected option 
                        className: `
                flex items-center justify-between p-4 rounded-xl cursor-pointer transition duration-200
                ${isSelected
                            ? "border-2 border-pink-500 bg-pink-50 shadow-md"
                            : "border border-gray-200 hover:border-pink-300"}
              `, onClick: () => handleSelectionChange(option.id), children: [_jsxs("div", { children: [_jsx("p", { className: `text-lg font-bold ${isSelected ? "text-pink-700" : "text-gray-900"}`, children: option.name }), _jsx("p", { className: "text-sm text-gray-500", children: option.estimatedTime })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `text-lg font-extrabold ${isSelected ? "text-pink-600" : "text-gray-700"}`, children: option.price }), _jsx("input", { type: "radio", name: "shippingMethod", checked: isSelected, 
                                        // We use the onClick on the label, but we must update the input's change handler to be correct for accessibility/form submission 
                                        onChange: () => handleSelectionChange(option.id), className: "w-5 h-5 text-pink-600 border-gray-300 focus:ring-pink-500 checked:ring-2 checked:ring-offset-2 checked:ring-pink-500" })] })] }, option.id));
                }) })] }));
};
export default ShippingMethod;
