import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell } from 'lucide-react';
const FeedSidbar = () => {
    const upcomingLives = [
        {
            id: 1,
            name: 'CraftyCreations',
            time: 'Starts in 2h 15m',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CraftyCreations'
        },
        {
            id: 2,
            name: 'VinylVibes',
            time: 'Starts in 3h 45m',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VinylVibes'
        },
        {
            id: 3,
            name: 'DesignDiva',
            time: 'Tomorrow 2:00 PM',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesignDiva'
        }
    ];
    const trendingListings = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            price: '$11',
            title: 'DTF'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
            price: '$17',
            title: 'Vinyl Stick Pack'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop',
            price: '$15',
            title: 'Holographic'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
            price: '$12',
            title: 'Fabric Bundle'
        }
    ];
    return (_jsxs("div", { className: "space-y-4 sm:space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 sm:mb-5", children: [_jsxs("h2", { className: "text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 bg-pink-500 rounded-full" }), _jsx("span", { className: "hidden sm:inline", children: "Upcoming Lives" }), _jsx("span", { className: "sm:hidden", children: "Lives" })] }), _jsx("button", { className: "text-pink-500 text-xs sm:text-sm font-semibold hover:text-pink-600", children: "View All" })] }), _jsx("div", { className: "space-y-3 sm:space-y-4", children: upcomingLives.map((live) => (_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-2 sm:gap-3 min-w-0", children: [_jsx("img", { src: live.avatar, alt: live.name, className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base truncate", children: live.name }), _jsx("p", { className: "text-xs sm:text-sm text-gray-600 truncate", children: live.time })] })] }), _jsxs("button", { className: "px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 flex-shrink-0", children: [_jsx(Bell, { className: "w-3 h-3 sm:w-4 sm:h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Notify Me" }), _jsx("span", { className: "sm:hidden", children: "Notify" })] })] }, live.id))) })] }), _jsxs("div", { className: "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 sm:mb-5", children: [_jsxs("h2", { className: "text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2", children: [_jsx("span", { className: "text-lg sm:text-xl", children: "\uD83D\uDD25" }), _jsx("span", { className: "hidden sm:inline", children: "Trending Listings" }), _jsx("span", { className: "sm:hidden", children: "Trending" })] }), _jsx("button", { className: "text-pink-500 text-xs sm:text-sm font-semibold hover:text-pink-600", children: "View All" })] }), _jsx("div", { className: "grid grid-cols-2 gap-2 sm:gap-3", children: trendingListings.map((listing) => (_jsxs("div", { className: "relative group cursor-pointer", children: [_jsx("div", { className: "aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100", children: _jsx("img", { src: listing.image, alt: listing.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }) }), _jsx("div", { className: "absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 bg-gray-900/80 backdrop-blur-sm text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-semibold", children: listing.price })] }, listing.id))) })] })] }));
};
export default FeedSidbar;
