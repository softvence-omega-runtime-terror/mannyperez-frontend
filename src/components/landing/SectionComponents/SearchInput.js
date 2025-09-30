import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Search } from "lucide-react";
const SearchInput = ({ placeholder = "Search...", onSearch }) => {
    const [query, setQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "relative w-full max-w-md", children: [_jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: placeholder, className: "w-96 rounded-2xl border border-border bg-primary-foreground py-3 pl-10 pr-4 shadow-sm focus:border-accent  focus:outline-none" }), _jsx("button", { type: "submit", className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent", children: _jsx(Search, { size: 18 }) })] }));
};
export default SearchInput;
