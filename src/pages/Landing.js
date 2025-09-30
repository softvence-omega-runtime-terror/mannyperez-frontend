import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '@/components/landing/Hero';
import ProcessOfWork from '@/components/landing/ProcessOfWork';
import SalesEvent from '@/components/landing/SalesEvent';
import ShopByCategory from '@/components/landing/ShopByCategory';
import StayUpdated from '@/components/landing/StayUpdated';
import { TestimonialsSlider } from '@/components/landing/TestimonialsSlider';
import TrendingListing from '@/components/landing/TrendingListing';
import VerifiedTopSellers from '@/components/landing/VerifiedTopSellers';
import Navbar from '@/components/layout/Navbar';
function Landing() {
    return (_jsxs("div", { className: '', children: [_jsx("div", { className: "sticky top-0 z-99", children: _jsx(Navbar, {}) }), _jsx(Hero, {}), _jsx(SalesEvent, {}), _jsx(TrendingListing, {}), _jsx(ShopByCategory, {}), _jsx(VerifiedTopSellers, {}), _jsx(ProcessOfWork, {}), _jsx(TestimonialsSlider, {}), _jsx(StayUpdated, {})] }));
}
export default Landing;
