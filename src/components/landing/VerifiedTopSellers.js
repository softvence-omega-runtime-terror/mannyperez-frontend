import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SellerCard from '@/reuseableComponents/SellerCard';
import Wrapper from '../layout/Wrapper';
import SellerData from "@/utils/Data/SellerData.json";
const VerifiedTopSellers = () => {
    return (_jsx("div", { className: "py-20 bg-accent-foreground", children: _jsx(Wrapper, { children: _jsxs("div", { className: "space-y-12 ", children: [_jsxs("div", { className: "border-b border-b-[#D9E5E9 ]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("img", { src: "/public/StarSVG.svg", alt: "" }), _jsxs("h2", { children: [_jsx("span", { className: "text-accent", children: "Verified" }), "Top Sellers"] })] }), _jsx("p", { className: "py-4", children: "Meet our trusted sellers with badges and top listings." })] }), _jsx("div", { className: "grid grid-cols-3 gap-6", children: SellerData.map((item) => (_jsx(SellerCard, { item: { ...item, tier: item.tier } }))) })] }) }) }));
};
export default VerifiedTopSellers;
