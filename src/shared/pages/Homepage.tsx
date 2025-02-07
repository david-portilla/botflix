import { useMemo } from "react";
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
	const chatComponent = useMemo(() => isChatOpen && <Chat />, [isChatOpen]);

	return (
		<>
			<Header />
			<SearchBar />
			<button
				onClick={handleToggleChat}
				className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-[#ec2a1c] hover:bg-[#af0c00] text-white rounded-full shadow-lg transition-all z-40"
				aria-label={`${isChatOpen ? "Close" : "Open"} chat`}
			>
				{isChatOpen ? <CloseIcon /> : <OpenIcon />}
			</button>
			{chatComponent}
			<MovieGrid term={displayFeeling} />
			<Footer />
		</>
	);
};
