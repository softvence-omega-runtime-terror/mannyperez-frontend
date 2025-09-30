import { jsx as _jsx } from "react/jsx-runtime";
// src/App.tsx
import { Outlet } from "react-router-dom";
function App() {
    return (_jsx("div", { className: "app", children: _jsx(Outlet, {}) }));
}
export default App;
