import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import PrimaryButton from './PrimaryButton';
const badgeConfig = {
    gold: {
        icon: "⭐",
        label: "Gold",
        color: "text-gold",
    },
    platinum: {
        icon: "💎",
        label: "Platinum",
        color: "text-platinum",
    },
    diamond: {
        icon: "💠",
        label: "Diamond",
        color: "text-diamond",
    },
};
const TrendingProductCard = (props) => {
    const { imageUrl, title, price, unit, seller, badge } = props.item;
    const badgeInfo = badgeConfig[badge];
    return (_jsx("div", { children: _jsxs(Card, { className: "overflow-hidden border  shadow-sm hover:shadow-md transition-shadow py-0 pb-2 ", children: [_jsx("div", { className: "relative aspect-[4/3] w-full overflow-hidden bg-muted", children: _jsx("img", { src: imageUrl || "/placeholder.svg", alt: title, className: "object-cover", sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" }) }), _jsxs(CardContent, { className: " space-y-2", children: [_jsx("h3", { className: "font-medium text-base leading-tight text-foreground line-clamp-2", children: title }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-sm text-foreground", children: seller }), _jsx("span", { className: `text-base ${badgeInfo.color}`, title: badgeInfo.label, children: badgeInfo.icon }), _jsx("span", { className: "text-xs text-muted-foreground", children: badgeInfo.label })] })] }), _jsxs(CardFooter, { className: "p-4 pt-0 grid gap-4", children: [_jsxs("div", { className: "flex items-baseline gap-0.5", children: [_jsxs("span", { className: "text-3xl font-bold text-foreground", children: ["$", price] }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["/", unit] })] }), _jsx(PrimaryButton, { type: 'Outline', title: 'View Details', className: 'rounded-full py-4! bg-transparent hover:text-accent-foreground' })] })] }) }));
};
export default TrendingProductCard;
