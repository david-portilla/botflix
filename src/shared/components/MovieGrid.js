import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMovies } from "../hooks/useMovies";
import { Loading } from "./Loading";
import { MovieCard } from "./MovieCard";
import { MainContainer } from "./MovieGrid.styles";
import { handleURL } from "../utils/handleUrl";
export const MovieGrid = ({ term }) => {
    const { data, error, isLoading } = useMovies(term.id === 0 ? handleURL(term.label) : handleURL(term.id.toString()));
    if (isLoading)
        return _jsx(Loading, {});
    if (error)
        return (_jsxs("div", { role: "alert", className: "text-center p-4", "aria-live": "assertive", children: ["Error: ", error.message] }));
    return (_jsx(MainContainer, { className: "bg-[#1a1a1a] min-h-screen", role: "main", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8", children: data && (_jsxs(_Fragment, { children: [_jsx("header", { className: "mb-8", children: term.label.trim().length === 0 ? (_jsx("h1", { className: "text-3xl font-bold text-white", children: "Popular Movies" })) : !term.id ? (data.results.length > 0 && (_jsxs("h1", { className: "text-3xl font-bold text-white", children: ["Search results for:", " ", _jsx("span", { className: "text-red-500", children: term.label })] }))) : (_jsxs("h1", { className: "text-3xl font-bold text-white", children: ["Showing movies by mood:", " ", _jsx("span", { className: "text-red-500", children: term.label })] })) }), data.results.length === 0 ? (_jsxs("p", { className: "text-xl text-center text-gray-400 mt-12", role: "status", "aria-live": "polite", children: ["No results found for:", " ", _jsx("span", { className: "font-semibold text-red-500", children: term.label })] })) : (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6", role: "list", "aria-label": "Movies grid", children: data.results.map((movie) => (_jsx(MovieCard, { movie: movie }, movie.id))) }))] })) }) }));
};
