import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Homepage } from "../shared/pages/Homepage";
import { MovieDetails } from "../shared/pages/MovieDetails";
export const App = () => {
    const queryClient = new QueryClient();
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx("main", { className: "flex flex-col", children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Homepage, {}) }), _jsx(Route, { path: "/movie/:id", element: _jsx(MovieDetails, {}) })] }) }) }) }));
};
