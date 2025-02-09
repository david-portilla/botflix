import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import botflixLogo from "../../assets/images/botflix.svg";
import { ApiInfo, HeaderContainer, HeaderContent, Logo, NavLinks, NavLink, } from "./Header.styles";
export const Header = () => {
    return (_jsx(HeaderContainer, { children: _jsxs(HeaderContent, { children: [_jsx(Logo, { to: "/", "aria-label": "Botflix Home", children: _jsx("img", { src: botflixLogo, alt: "Botflix Logo" }) }), _jsxs(NavLinks, { "aria-label": "Main navigation", children: [_jsx(NavLink, { to: "/", "aria-current": "page", children: "Home" }), _jsx(NavLink, { to: "https://developer.themoviedb.org/docs/getting-started/", target: "_blank", rel: "noopener noreferrer", children: "Movie API" }), _jsx(NavLink, { to: "https://davidportilla.com/", target: "_blank", rel: "noopener noreferrer", children: "About" })] }), _jsxs(ApiInfo, { children: ["Powered by", " ", _jsx("strong", { children: _jsx(NavLink, { to: "https://www.themoviedb.org/", target: "_blank", rel: "noopener noreferrer", children: "themoviedb API" }) })] })] }) }));
};
