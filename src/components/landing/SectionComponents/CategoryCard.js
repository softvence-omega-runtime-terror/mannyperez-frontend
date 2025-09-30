import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CategoryCard = (props) => {
    const { img, label } = props.item;
    return (_jsxs("div", { className: 'border-2 rounded-xl grid place-content-center place-items-center gap-4 w-full h-full py-8', children: [_jsx("div", { className: "size-12 bg-primary-foreground grid place-content-center rounded-full", children: _jsx("img", { src: img, alt: "", className: 'size-6' }) }), _jsx("h5", { className: 'font-semibold', children: label })] }));
};
export default CategoryCard;
