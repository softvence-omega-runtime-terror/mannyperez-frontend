import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { CiShop } from "react-icons/ci";
import statsData from "@/utils/Data/StatsData.json";
import BannerImg from "../../../public/bannerimg.png";
import Wrapper from "../layout/Wrapper";
const statsColor = [
    "text-[#00506B]",
    "text-[#00A63E]",
    "text-[#229ECF]",
    "text-[#D82479]",
];
function Hero() {
    return (_jsx(Wrapper, { children: _jsxs("div", { className: "bg-background-secondary grid grid-cols-2 min-h-[600px] my-12 rounded-xl border-2 border-white px-10", children: [_jsx("div", { className: "", children: _jsx("img", { src: BannerImg, alt: "" }) }), _jsxs("div", { className: "grid  place-items-end", children: [_jsxs("div", { className: "place-items-end space-y-4", children: [_jsxs("h1", { className: "text-foreground", children: ["DTF Destash ", _jsx("span", { className: "text-accent", children: "Marketplace" })] }), _jsx("h5", { children: "Buy and sell DTF vinyl, fabric, and craft supplies in live events with verified sellers" }), _jsxs("div", { className: "flex items-center gap-4 pt-8", children: [_jsx(PrimaryButton, { type: "Outline", title: "Browse Products", className: "rounded-full px-6 bg-transparent" }), _jsx(PrimaryButton, { type: "Primary", title: "Join As A Seller", className: "rounded-full pl-2  pr-5 gap-2.5", leftIcon: _jsx(CiShop, { className: "size-8 text-accent bg-accent-foreground rounded-full p-1" }) })] })] }), _jsx("div", { className: "grid grid-cols-4 items-center w-full mb-8", children: statsData.map((item, index) => (_jsxs("div", { className: "w-full py-8 grid place-items-center border border-white first:rounded-l-xl last:rounded-r-xl bg-white/40", children: [_jsx("h5", { className: ` ${statsColor[index]} font-semibold`, children: item.value }), _jsx("p", { className: "text-lg", children: item.label })] }, index))) })] })] }) }));
}
export default Hero;
