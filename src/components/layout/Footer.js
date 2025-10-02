import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
export default function Footer() {
    const quickLinks = [
        { label: "About", href: "#" },
        { label: "Seller Guide", href: "#" },
        { label: "Rules", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Contact", href: "#" },
    ];
    const services = [
        { label: "Join our Facebook Group", href: "#" },
        { label: "Discussion Forums", href: "#" },
        { label: "Learning Center", href: "#" },
        { label: "Success Stories", href: "#" },
    ];
    const socialLinks = [
        { icon: FaFacebook, href: "#", label: "Facebook" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
        { icon: FaInstagram, href: "#", label: "Instagram" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    ];
    return (_jsxs("footer", { className: "bg-gray-100 border-t border-gray-200", children: [_jsx("div", { className: "max-w-7xl mx-auto px-6 py-12 md:py-16", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "DTF" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 text-lg", children: "DTF" }), _jsx("p", { className: "text-xs text-pink-600 font-semibold", children: "SUPERMARKET" })] })] }), _jsx("p", { className: "text-gray-600 text-sm leading-relaxed mb-6", children: "The premier destination for buying and selling DTF transfers, vinyl, fabric, and craft supplies through live events and verified sellers." }), _jsx("div", { className: "flex gap-3", children: socialLinks.map(({ icon: Icon, href, label }) => (_jsx("a", { href: href, "aria-label": label, className: "w-10 h-10 rounded-lg bg-pink-600 hover:bg-pink-700 flex items-center justify-center transition-all duration-300 hover:scale-110", children: _jsx(Icon, { className: "w-5 h-5 text-white" }) }, label))) })] }), _jsx(FooterSection, { title: "Quick Links", items: quickLinks }), _jsx(FooterSection, { title: "Services", items: services }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 text-lg mb-4", children: "Contact" }), _jsxs("ul", { className: "space-y-3", children: [_jsx("li", { children: _jsxs("a", { href: "mailto:info@dtfsuperstash.com", className: "flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm group", children: [_jsx(MdEmail, { className: "w-4 h-4 text-gray-400 group-hover:text-pink-600" }), _jsx("span", { children: "info@dtfsuperstash.com" })] }) }), _jsx("li", { children: _jsxs("a", { href: "tel:267-471-5060", className: "flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm group", children: [_jsx(MdPhone, { className: "w-4 h-4 text-gray-400 group-hover:text-pink-600" }), _jsx("span", { children: "267-471-5060" })] }) }), _jsxs("li", { className: "flex items-center gap-2 text-gray-600 text-sm", children: [_jsx(MdLocationOn, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { children: "Flourtown, PA" })] })] })] })] }) }), _jsx("div", { className: "border-t border-gray-200 bg-gray-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsx("p", { className: "text-gray-600 text-sm", children: "\u00A9 2025 ABC. All rights reserved." }), _jsx("div", { className: "flex flex-wrap gap-6 justify-center", children: ["Privacy & Policy", "Terms of Services", "Help & Support"].map((text) => (_jsx("a", { href: "#", className: "text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm", children: text }, text))) })] }) }) })] }));
}
/* Reusable Section Component */
function FooterSection({ title, items }) {
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 text-lg mb-4", children: title }), _jsx("ul", { className: "space-y-3", children: items.map((item) => (_jsx("li", { children: _jsx("a", { href: item.href, className: "text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm", children: item.label }) }, item.label))) })] }));
}
