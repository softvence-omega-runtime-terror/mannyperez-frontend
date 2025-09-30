import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "../layout/Wrapper";
import CategoryCard from "./SectionComponents/CategoryCard";
const categories = [
    { id: "dtf-transfers", img: "/public/CategoryCard/tshirts.png", label: "DTF Transfers" },
    { id: "vinyl-sheets", img: "/public/CategoryCard/sheets.png", label: "Vinyl Sheets" },
    { id: "fabrics", img: "/public/CategoryCard/fabrics.svg", label: "Fabrics" },
    { id: "craft-supplies", img: "/public/CategoryCard/supplies.png", label: "Craft Supplies" },
    { id: "equipment", img: "/public/CategoryCard/equipment.png", label: "Equipment" },
    { id: "specialty-items", img: "/public/CategoryCard/star.svg", label: "Specialty Items" },
];
const ShopByCategory = () => {
    return (_jsx("div", { className: "py-10", children: _jsxs(Wrapper, { children: [_jsxs("div", { className: "border-b-[#D9E5E9 ]", children: [_jsxs("h2", { children: ["Shop by", _jsx("span", { className: "text-accent", children: "Category" })] }), _jsx("p", { className: "py-4", children: "Discover products in your favorite crafting categories." })] }), _jsx("div", { className: "grid grid-cols-6 gap-6 pt-12", children: categories.map((category) => (_jsx(CategoryCard, { item: category }))) })] }) }));
};
export default ShopByCategory;
