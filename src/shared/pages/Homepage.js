import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Chat } from "../../features/chat/components/Chat";
import { SearchBar } from "../../features/search/components/SearchBar";
import { MovieGrid } from "../../shared/components/MovieGrid";
import { useGlobal } from "../../app/hooks/useGlobal";
import { CloseIcon, OpenIcon } from "./Homepage.styles";
export const Homepage = () => {
    const { toggleChat, isChatOpen, displayFeeling } = useGlobal();
    const handleToggleChat = () => toggleChat();
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(SearchBar, {}), _jsx("button", { onClick: handleToggleChat, className: "fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-[#ec2a1c] hover:bg-[#af0c00] text-white rounded-full shadow-lg transition-all z-40", "aria-label": `${isChatOpen ? "Close" : "Open"} chat`, children: isChatOpen ? _jsx(CloseIcon, {}) : _jsx(OpenIcon, {}) }), isChatOpen && _jsx(Chat, {}), _jsx(MovieGrid, { term: displayFeeling }), _jsx(Footer, {})] }));
};
