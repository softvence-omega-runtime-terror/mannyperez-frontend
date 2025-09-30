import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import Wrapper from "./Wrapper";
import SearchInput from "../landing/SectionComponents/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";
const Navbar = () => {
    return (_jsx("nav", { className: "w-full py-4 bg-white shadow-md", children: _jsx(Wrapper, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx(NavLink, { to: "/", className: "text-2xl font-bold", children: _jsx("img", { src: "/public/DTFdestash.png", className: "size-20", alt: "" }) }), _jsxs("div", { className: "flex space-x-6", children: [_jsx(NavLink, { to: "/", className: ({ isActive }) => isActive ? "text-accent font-semibold" : "", children: "Home" }), _jsx(NavLink, { to: "/seller", className: ({ isActive }) => isActive ? "text-accent font-semibold" : "", children: "Sellers" }), _jsx(NavLink, { to: "/live", className: ({ isActive }) => isActive ? "text-accent font-semibold" : "", children: "Live" })] })] }), _jsxs("div", { className: "flex items-center justify-center gap-5", children: [_jsx(SearchInput, { placeholder: "Search listigs,sellers...", onSearch: (e) => console.log(e) }), _jsx(PrimaryButton, { type: "Outline", title: "Log In", className: "hover:text-primary-foreground" }), _jsx(PrimaryButton, { type: "Primary", title: "Sign Up", className: "" })] })] }) }) }));
};
export default Navbar;
