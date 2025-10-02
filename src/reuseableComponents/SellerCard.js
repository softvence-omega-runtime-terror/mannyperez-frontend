import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
const tierColors = {
    Gold: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Platinum: "bg-purple-100 text-purple-700 border-purple-300",
    Diamond: "bg-cyan-100 text-cyan-700 border-cyan-300",
};
const tierIcons = {
    Gold: "⭐",
    Platinum: "💎",
    Diamond: "💠",
};
const SellerCard = (props) => {
    const { username, avatar, tier, listingCount } = props.item;
    return (_jsx(Card, { className: "flex items-center justify-between p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow ", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 ", children: [_jsxs(Avatar, { className: "h-12 w-12 rounded-2xl", children: [_jsx(AvatarImage, { src: avatar || "/placeholder.svg", alt: username }), _jsx(AvatarFallback, { children: username.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm", children: username }), _jsxs(Badge, { variant: "outline", className: `text-xs ${tierColors[tier]}`, children: [tierIcons[tier], " ", tier] })] }), _jsxs("p", { className: "text-sm text-blue-600 font-medium", children: [listingCount, "+ Listings"] })] })] }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-2 bg-transparent", children: "View" })] }) }));
};
export default SellerCard;
