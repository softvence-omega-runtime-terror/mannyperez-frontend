import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PrimaryButton from '@/reuseableComponents/PrimaryButton';
import Wrapper from '../layout/Wrapper';
const StayUpdated = () => {
    return (_jsx("div", { className: "py-10", children: _jsx(Wrapper, { children: _jsx("div", { className: 'bg-background-secondary h-[500px] grid place-content-center rounded-xl border-2 border-accent-foreground', children: _jsxs("div", { className: "space-y-5", children: [_jsxs("h2", { children: ["Stay Updated with ", _jsx("span", { className: 'text-accent', children: "DTF Destash" })] }), _jsx("p", { children: "Get notified about new live events, trending products, and exclusive deal" }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("input", { type: "text", placeholder: 'Enter your email here', className: 'bg-primary-foreground w-96  py-3 px-6 rounded-xl border' }), _jsx(PrimaryButton, { type: 'Primary', title: 'Subscribe', className: 'py-6' })] })] }) }) }) }));
};
export default StayUpdated;
