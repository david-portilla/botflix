import { useState, ReactNode, useCallback } from "react";
import { GlobalContext } from "../providers/GlobalContext";
import { EmotionGenre } from "../../features/chat/utils/genreMap";

interface GlobalProviderProps {
	children: ReactNode;
}

/**
 * Global provider component that manages chat and user input
 *
 * @component
 * @example
 * ```tsx
 * return (
 *   <GlobalProvider>
 *     <App />
 *   </GlobalProvider>
 * )
 * ```
 */
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
	const [displayFeeling, setDisplayFeeling] = useState<EmotionGenre>({
		id: 0,
		label: "",
	});
	const [displayChatInput, setDisplayChatInput] = useState<string>("");

	/**
	 * Toggles the chat modal state
	 * @memoized
	 */
	const toggleChat = useCallback(() => {
		setIsChatOpen((prev) => !prev);
	}, []);

	/**
	 * Updates the user name in both ref and state
	 * @param {string} id - The new user id to set
	 * @param {string} label - The new user label to set
	 * @memoized
	 */
	const setFeelingName = useCallback((id: number, label: string) => {
		setDisplayFeeling({ id, label });
	}, []);

	/**
	 * Updates the chat input value in both ref and state
	 * @param {string} input - The new chat input value to set
	 * @memoized
	 */
	const setChatInput = useCallback((input: string) => {
		setDisplayChatInput(input);
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isChatOpen,
				toggleChat,
				displayFeeling,
				setFeelingName,
				displayChatInput,
				setChatInput,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
