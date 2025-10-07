import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import SearchInput from "../landing/SectionComponents/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { HiMenu, HiX } from "react-icons/hi";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Sellers", path: "/seller" },
        { name: "Live", path: "/live" },
        { name: "Feed", path: "/feed" },
    ];
    return (_jsxs("nav", { className: "w-full bg-white shadow-md", children: [_jsx(Wrapper, { children: _jsxs("div", { className: "flex items-center justify-between py-4", children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx(NavLink, { to: "/", className: "flex items-center", children: _jsx("img", { src: "/public/DTFdestash.png", alt: "DTFdestash", className: "h-10 w-auto" }) }), _jsx("div", { className: "hidden md:flex space-x-6", children: navLinks.map((link) => (_jsx(NavLink, { to: link.path, className: ({ isActive }) => isActive
                                            ? "text-accent font-semibold"
                                            : "text-gray-700 hover:text-accent transition", children: link.name }, link.path))) })] }), _jsxs("div", { className: "hidden md:flex items-center gap-5", children: [_jsx(SearchInput, { placeholder: "Search listings, sellers...", onSearch: (e) => console.log(e) }), _jsx(PrimaryButton, { type: "Outline", title: "Log In", onClick: () => navigate("/login") }), _jsx(PrimaryButton, { type: "Primary", title: "Sign Up", onClick: () => navigate("/sign-up") })] }), _jsx("div", { className: "md:hidden flex items-center", children: _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-gray-700 focus:outline-none", children: isOpen ? _jsx(HiX, { size: 28 }) : _jsx(HiMenu, { size: 28 }) }) })] }) }), isOpen && (_jsxs("div", { className: "md:hidden bg-white border-t border-gray-100 p-4 space-y-4", children: [navLinks.map((link) => (_jsx(NavLink, { to: link.path, className: ({ isActive }) => isActive
                            ? "block text-accent font-semibold"
                            : "block text-gray-700 hover:text-accent transition", onClick: () => setIsOpen(false), children: link.name }, link.path))), _jsx(SearchInput, { placeholder: "Search listings, sellers...", onSearch: (e) => console.log(e) }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(PrimaryButton, { type: "Outline", title: "Log In", onClick: () => {
                                    navigate("/login");
                                    setIsOpen(false);
                                } }), _jsx(PrimaryButton, { type: "Primary", title: "Sign Up", onClick: () => {
                                    navigate("/sign-up");
                                    setIsOpen(false);
                                } })] })] }))] }));
};
export default Navbar;
