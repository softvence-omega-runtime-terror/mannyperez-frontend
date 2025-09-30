import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
const PrimaryButton = ({ title, leftIcon, rightIcon, onClick, type, className = "", }) => {
    return (_jsxs(Button, { onClick: onClick, className: `flex items-center justify-center gap-1 px-5 py-6 font-medium  capitalize rounded-xl focus:outline-none text-lg cursor-pointer ${type === "Primary"
            ? "bg-accent text-card"
            : type === "Outline"
                ? "text-accent bg-accent-foreground border border-accent"
                : type === "Badge"
                    ? "text-dark-Blue bg-light-Gray text-sm  px-4 py-1 rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full"
                    : type === "Icon"
                        ? " text-light-Gray size-12 rounded-full border border-light-Gray p-3"
                        : ""}  ${className}`, children: [leftIcon && _jsx("span", { className: "flex items-center", children: leftIcon }), title && _jsx("span", { children: title }), rightIcon && _jsx("span", { className: "flex items-center", children: rightIcon })] }));
};
export default PrimaryButton;
