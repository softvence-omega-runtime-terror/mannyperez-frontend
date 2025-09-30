import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
const testimonials = [
    {
        id: "1",
        name: "Michael Torres",
        role: "Craft Enthusiast",
        avatar: "/man.jpg",
        rating: 5.0,
        content: "The live events are amazing! I've found so many unique DTF designs and saved tons of money. The sellers are super responsive too.",
    },
    {
        id: "2",
        name: "Sophia Martinez",
        role: "DTF Seller",
        avatar: "/diverse-woman-portrait.png",
        rating: 5.0,
        content: "As a seller, this platform has been incredible for my business. The verification system builds trust and the live events boost my sales significantly.",
    },
    {
        id: "3",
        name: "Emily Chen",
        role: "Small Business Owner",
        avatar: "/woman-business.jpg",
        rating: 5.0,
        content: "I love the community aspect! I've learned so much from other crafters and discovered new techniques. The quality of products is consistently high.",
    },
    {
        id: "4",
        name: "David Johnson",
        role: "Vinyl Enthusiast",
        avatar: "/man-casual.jpg",
        rating: 5.0,
        content: "Best platform for finding quality vinyl and DTF supplies. The live sales are exciting and I always find great deals. Highly recommend!",
    },
    {
        id: "5",
        name: "Lisa Anderson",
        role: "Craft Store Owner",
        avatar: "/professional-woman.png",
        rating: 5.0,
        content: "This has transformed how I source products for my store. The variety is incredible and the seller verification gives me peace of mind.",
    },
    {
        id: "6",
        name: "James Wilson",
        role: "DIY Creator",
        avatar: "/man-creative.jpg",
        rating: 5.0,
        content: "The community here is so supportive and helpful. I've connected with amazing sellers and learned new crafting techniques. Love it!",
    },
];
export function TestimonialsSlider() {
    // Duplicate testimonials for infinite scroll effect
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    return (_jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900", children: ["Join Our ", _jsx("span", { className: "text-pink-600", children: "Community" })] }), _jsx("p", { className: "mt-3 text-gray-600 text-sm sm:text-base", children: "Connect with fellow crafters and sellers in our vibrant community." })] }), _jsxs("div", { className: "space-y-6 overflow-hidden", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "flex gap-6 animate-scroll-left", children: duplicatedTestimonials.map((testimonial, index) => (_jsx(TestimonialCard, { testimonial: testimonial }, `top-${testimonial.id}-${index}`))) }) }), _jsx("div", { className: "relative", children: _jsx("div", { className: "flex gap-6 animate-scroll-right", children: duplicatedTestimonials.map((testimonial, index) => (_jsx(TestimonialCard, { testimonial: testimonial }, `bottom-${testimonial.id}-${index}`))) }) })] })] }) }));
}
function TestimonialCard({ testimonial }) {
    return (_jsxs(Card, { className: "flex-shrink-0 w-[350px] sm:w-[400px] p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300", children: [_jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsxs(Avatar, { className: "w-12 h-12 flex-shrink-0", children: [_jsx(AvatarImage, { src: testimonial.avatar || "/placeholder.svg", alt: testimonial.name }), _jsx(AvatarFallback, { className: "bg-pink-100 text-pink-600 font-semibold", children: testimonial.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("") })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base truncate", children: testimonial.name }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500 truncate", children: testimonial.role })] }), _jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [_jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: testimonial.rating.toFixed(1) })] })] }), _jsx("p", { className: "text-sm sm:text-base text-gray-600 leading-relaxed", children: testimonial.content })] }));
}
