import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { MovieArticle, RatingBadge } from "./MovieCard.styles";
import { formatDate } from "../utils/formatDate";
export const MovieCard = ({ movie }) => {
    const IMG_ENV = import.meta.env.VITE_IMAGE_COVER;
    const imageUrl = movie.poster_path
        ? `${IMG_ENV}${movie.poster_path}`
        : "https://picsum.photos/200/300";
    return (_jsx(MovieArticle, { role: "listitem", children: _jsxs(Link, { to: `/movie/${movie.id}`, className: "block h-full", "aria-label": `View details for ${movie.title}`, children: [_jsxs("div", { className: "relative aspect-[2/3] bg-gray-900", children: [_jsx("img", { src: imageUrl, alt: `Movie poster for ${movie.title}`, className: "w-full h-full object-cover", loading: "lazy" }), _jsxs(RatingBadge, { "$score": movie.vote_average * 10, className: "absolute -bottom-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg", "aria-label": `Rating: ${movie.vote_average * 10}%`, children: [Math.round(movie.vote_average * 10), "%"] })] }), _jsxs("div", { className: "p-4 pt-6", children: [_jsx("h2", { className: "font-semibold text-white mb-1 line-clamp-1", children: movie.title }), _jsx("time", { dateTime: movie.release_date, className: "text-sm text-gray-400", "aria-label": `Release date: ${formatDate(movie.release_date)}`, children: formatDate(movie.release_date) })] })] }) }, movie.id));
};
