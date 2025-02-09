import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGlobal } from "../../../app/hooks/useGlobal";
import { SearchForm, SearchIcon, SearchInput, SearchMessage, SearchSection, } from "./SearchBar.styles";
export const SearchBar = () => {
    const { setFeelingName, displayChatInput, setChatInput } = useGlobal();
    const handleChange = (e) => {
        const value = e.target.value;
        setChatInput(value);
        if (!value.trim()) {
            setFeelingName(0, "");
            return;
        }
        // For direct search, we use 0 as ID to indicate it's a text search
        setFeelingName(0, value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (_jsx(SearchSection, { children: _jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("label", { htmlFor: "movie-search", className: "sr-only", children: "Search for movies" }), _jsxs(SearchForm, { onSubmit: handleSubmit, role: "search", "aria-label": "Search for movies", children: [_jsx(SearchInput, { id: "movie-search", type: "search", placeholder: "Search for movies...", value: displayChatInput, onChange: handleChange, "aria-label": "Search movies", autoComplete: "off", spellCheck: "false", minLength: 3, required: true, "aria-required": "true" }), _jsx(SearchIcon, { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", role: "img", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), displayChatInput.trim().length === 0 ? (_jsx(SearchMessage, { role: "status", "aria-live": "polite", children: "Type to search for your favorite movies" })) : displayChatInput.trim().length < 3 ? (_jsx(SearchMessage, { role: "status", "aria-live": "polite", children: "Please enter at least 3 characters" })) : null] }) }) }));
};
