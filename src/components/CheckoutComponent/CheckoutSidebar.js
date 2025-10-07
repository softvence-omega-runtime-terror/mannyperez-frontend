import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SafeAndSecureCard from './SafeAndSecureCard';
import OrderTotalCard from './OrderTotalCard';
// Dummy data for example usage
const DUMMY_ORDER_TOTALS = {
    subtotal: 15.00,
    shipping: 5.00,
    platformFee: 1.00,
};
const CheckoutSidebar = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(OrderTotalCard, { subtotal: DUMMY_ORDER_TOTALS.subtotal, shipping: DUMMY_ORDER_TOTALS.shipping, platformFee: DUMMY_ORDER_TOTALS.platformFee }), _jsx(SafeAndSecureCard, {})] }));
};
export default CheckoutSidebar;
