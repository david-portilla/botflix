import { useMemo } from "react";
import { Chat } from "../features/chat";
import { useGlobal } from "./hooks/useGlobal";
import "./app.css";

export const App = () => {
	const { openChat, closeChat, isChatOpen, displayName } = useGlobal();
	const handleToggleChat = () => (isChatOpen ? closeChat() : openChat());
	const chatComponent = useMemo(() => isChatOpen && <Chat />, [isChatOpen]);

	console.log("App");

	return (
		<main>
			<div>
				<h1 className="text-2xl font-bold">Botflix Movie App</h1>
				<h2 className="text-md">Movie search: {displayName || ""}</h2>
				<a href="#" target="_blank" rel="noopener noreferrer">
					Link
				</a>
				<p className="text-base">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quos.
				</p>
				<button
					onClick={handleToggleChat}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					aria-label={`${isChatOpen ? "Close" : "Open"} chat`}
				>
					{`${isChatOpen ? "Close" : "Open"} Chat`}
				</button>
				{chatComponent}
			</div>
		</main>
	);
};
