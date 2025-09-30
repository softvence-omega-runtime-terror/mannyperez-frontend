import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TrendingProductCard from "@/reuseableComponents/TrendingProductCard";
import Wrapper from "../layout/Wrapper";
import TrendingProducts from "@/utils/Data/TrendingProducts.json";
const TrendingListing = () => {
    return (_jsx("div", { className: "py-20 bg-accent-foreground", children: _jsx(Wrapper, { children: _jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "border-b border-b-[#D9E5E9]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("img", { src: "/public/FireSVG.svg", alt: "" }), _jsxs("h2", { children: ["Trending", _jsx("span", { className: "text-accent", children: "Listing" })] })] }), _jsx("p", { className: "py-4", children: "Most popular items right now from verified sellers." })] }), _jsx("div", { className: "grid grid-cols-4 gap-6", children: TrendingProducts.map((product) => (_jsx(TrendingProductCard, { item: product }))) })] }) }) }));
};
export default TrendingListing;
