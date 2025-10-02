import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
export default function WorkSteps() {
    const steps = [
        {
            number: 1,
            title: "Browse & Discover",
            description: "Explore thousands of DTF transfers, vinyl, fabric, and craft supplies from verified sellers.",
            color: "bg-pink-600",
            position: "left"
        },
        {
            number: 2,
            title: "Join Live Events",
            description: "Participate in live shopping events for exclusive deals and real-time interaction with sellers.",
            color: "bg-yellow-500",
            position: "right"
        },
        {
            number: 3,
            title: "Buy with Confidence",
            description: "Purchase from proof-verified sellers with secure payments and buyer protection.",
            color: "bg-cyan-500",
            position: "left"
        }
    ];
    return (_jsx("div", { className: "min-h-screen px-4", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-accent-foreground transform -translate-x-1/2 shadow-lg" }), _jsx("div", { className: "hidden md:block absolute size-6 bg-accent-foreground rounded-full  transform -translate-x-1/2 left-1/2" }), _jsx("div", { className: "hidden md:block absolute size-6 bg-accent-foreground rounded-full bottom-0 transform -translate-x-1/2 left-1/2" }), _jsx("div", { className: "space-y-12 md:space-y-24", children: steps.map((step) => (_jsx("div", { className: "relative", children: _jsxs("div", { className: `flex flex-col md:flex-row items-center gap-8 ${step.position === "right" ? "md:flex-row-reverse" : ""}`, children: [_jsx("div", { className: `w-full md:w-[calc(50%-3rem)] ${step.position === "left" ? "md:text-right" : "md:text-left"}`, children: _jsxs(Card, { className: "p-8 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: step.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: step.description })] }) }), _jsx("div", { className: "relative z-10 flex-shrink-0", children: _jsx("div", { className: `w-16 h-16 rounded-full ${step.color} flex items-center justify-center  inset-shadow-2xl  border-6 border-accent-foreground`, children: _jsx("span", { className: "text-white text-2xl font-bold", children: step.number }) }) }), _jsx("div", { className: "hidden md:block w-[calc(50%-3rem)]" })] }) }, step.number))) })] }) }) }));
}
