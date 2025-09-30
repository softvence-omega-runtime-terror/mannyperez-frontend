import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '@/components/landing/Hero';
import SalesEvent from '@/components/landing/SalesEvent';
import ShopByCategory from '@/components/landing/ShopByCategory';
import StayUpdated from '@/components/landing/StayUpdated';
import TrendingListing from '@/components/landing/TrendingListing';
import Navbar from '@/components/layout/Navbar';
function Landing() {
    return (_jsxs("div", { className: '', children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(SalesEvent, {}), _jsx(TrendingListing, {}), _jsx(ShopByCategory, {}), _jsx(StayUpdated, {})] }));
}
export default Landing;
