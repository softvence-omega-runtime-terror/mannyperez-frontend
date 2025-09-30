import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from '@/reuseableComponents/ProductCard';
import ProductData from "@/utils/Data/ProductData.json";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Wrapper from '../layout/Wrapper';
const SalesEvent = () => {
    return (_jsx("div", { className: " py-10", children: _jsx(Wrapper, { children: _jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "border-b border-b-[#D9E5E9] flex items-center justify-between", children: [_jsxs("div", { className: "", children: [_jsxs("h2", { children: [_jsx("span", { className: 'text-accent', children: "Live" }), " Sales Event"] }), _jsx("p", { className: 'py-4', children: "Join live shopping events with exclusive deals" })] }), _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx("p", { children: "View All" }), _jsx(IoIosArrowDroprightCircle, { className: 'size-6' })] })] }), _jsx("div", { className: "grid grid-cols-3 gap-10", children: ProductData.map((item) => (_jsx(ProductCard, { item: item }))) })] }) }) }));
};
export default SalesEvent;
