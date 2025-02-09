import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Loader } from "./Loading.styles";
export const Loading = () => {
    return (_jsx(Loader, { children: _jsxs("div", { className: "flex items-center justify-center loading show", children: [_jsxs("p", { className: "w-26 mt-12 text-sm text-white absolute text-center", children: [" ", "Loading movies", " "] }), _jsx("div", { className: "ball" }), _jsx("div", { className: "ball" }), _jsx("div", { className: "ball" })] }) }));
};
