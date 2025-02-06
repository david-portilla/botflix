import { useState, ReactNode, useCallback } from "react";
import { GlobalContext } from "../providers/GlobalContext";

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
	const [displayFeeling, setDisplayFeeling] = useState<string>("");
	const [displayChatInput, setDisplayChatInput] = useState<string>("");

	/**
	 * Opens the chat modal if it's not already open
	 * @memoized
	 */
	const openChat = useCallback(() => {
		if (!isChatOpen) {
			setIsChatOpen(true);
		}
	}, [isChatOpen]);

	/**
	 * Closes the chat modal and resets user information
	 * @memoized
	 */
	const closeChat = useCallback(() => {
		if (isChatOpen) {
			setIsChatOpen(false);
		}
	}, [isChatOpen]);

	/**
	 * Updates the user name in both ref and state
	 * @param {string} name - The new user name to set
	 * @memoized
	 */
	const setFeelingName = useCallback((name: string) => {
		setDisplayFeeling(name.trim());
	}, []);

	/**
	 * Updates the chat input value in both ref and state
	 * @param {string} input - The new chat input value to set
	 * @memoized
	 */
	const setChatInput = useCallback((input: string) => {
		setDisplayChatInput(input.trim());
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isChatOpen,
				openChat,
				closeChat,
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
