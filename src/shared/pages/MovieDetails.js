import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import { Loading } from "../components/Loading";
import { formatDate } from "../utils/formatDate";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GradientOverlay, UserScoreRing } from "./MovieDetails.styles";
export const MovieDetails = () => {
    const { id: movieId } = useParams();
    const { data: movie, isLoading, error } = useMovie(movieId);
    const navigate = useNavigate();
    if (isLoading)
        return _jsx(Loading, {});
    if (error)
        return (_jsxs("div", { role: "alert", className: "text-center p-4", children: ["Error: ", error.message] }));
    if (!movie)
        return _jsx("div", { children: "No movie found" });
    const userScore = Math.round(movie.vote_average * 10);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("section", { className: "bg-[#1a1a1a]", children: _jsxs("div", { className: "relative", children: [_jsx(GradientOverlay, {}), _jsx("img", { src: movie.poster_path
                                ? `${import.meta.env.VITE_IMAGE_POSTER}${movie.poster_path}`
                                : "https://picsum.photos/300/450", alt: "", className: "w-full h-[100vh] object-cover opacity-40", "aria-hidden": "true" }), _jsx("div", { className: "absolute inset-0 z-20", children: _jsxs("div", { className: "container mx-auto px-4 md:px-8 h-full", children: [_jsxs("button", { onClick: () => navigate(-1), className: "inline-flex items-center gap-2 px-4 py-2 mt-8 mb-4\n\t\t\t\t\t\tbg-black/30 hover:bg-black/50 backdrop-blur-sm\n\t\t\t\t\t\ttext-white rounded-full transition-all duration-300\n\t\t\t\t\t\tborder border-white/10 hover:border-white/20\n\t\t\t\t\t\tshadow-lg hover:shadow-xl", "aria-label": "Back to home", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z", clipRule: "evenodd" }) }), _jsx("span", { className: "hidden sm:inline", children: "Back to home" })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start pt-[2vh]", children: [_jsx("div", { className: "shrink-0 w-full md:w-[300px] relative z-10", children: _jsx("img", { src: movie.poster_path
                                                        ? `${import.meta.env.VITE_IMAGE_COVER}${movie.poster_path}`
                                                        : "https://picsum.photos/300/450", alt: `Movie poster of ${movie.title}`, className: "w-full rounded-lg shadow-2xl ring-1 ring-white/10 hover:ring-white/30 transition-all" }) }), _jsx("div", { className: "flex-1 text-white", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-3xl md:text-5xl font-bold flex flex-wrap items-baseline gap-3", children: [movie.title, _jsxs("span", { className: "text-2xl md:text-3xl text-gray-400", children: ["(", new Date(movie.release_date).getFullYear(), ")"] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300 text-sm md:text-base", children: [_jsx("span", { children: formatDate(movie.release_date) }), _jsx("span", { className: "hidden md:inline", children: "\u2022" }), _jsx("span", { children: movie.original_language.toUpperCase() }), movie.adult && (_jsxs(_Fragment, { children: [_jsx("span", { className: "hidden md:inline", children: "\u2022" }), _jsx("span", { className: "px-2 py-1 bg-red-600 rounded-md text-xs", children: "+18" })] }))] }), _jsx("div", { className: "flex items-center gap-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "w-[60px] h-[60px] rounded-full bg-[#081c22] flex items-center justify-center", children: _jsx(UserScoreRing, { "$score": userScore, className: "w-[54px] h-[54px] rounded-full flex items-center justify-center", children: _jsxs("span", { className: "text-white font-bold text-sm", children: [userScore, "%"] }) }) }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: "Score" }), _jsx("span", { className: "text-sm text-gray-400", children: "from users" })] })] }) }), _jsxs("div", { className: "mt-8 space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Overview" }), _jsx("p", { className: "text-gray-300 max-w-3xl leading-relaxed", children: movie.overview })] })] }) })] })] }) })] }) }), _jsx(Footer, {})] }));
};
