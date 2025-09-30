import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "../layout/Wrapper";
import WorkSteps from "./SectionComponents/WorkSteps";
const ProcessOfWork = () => {
    return (_jsx("div", { className: "py-20", children: _jsx(Wrapper, { children: _jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex items-center justify-center gap-1", children: _jsxs("h2", { children: ["Process", _jsx("span", { className: "text-accent", children: "Of Works" })] }) }), _jsx("p", { className: "py-4", children: "Get started in just a few simple steps." })] }), _jsx("div", { className: "", children: _jsx(WorkSteps, {}) })] }) }) }));
};
export default ProcessOfWork;
