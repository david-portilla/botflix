import { useState, useRef, ReactNode, useCallback } from "react";
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
	const [displayName, setDisplayName] = useState<string>("");
	const userNameRef = useRef<string>("");

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
			userNameRef.current = "";
			setDisplayName("");
		}
	}, [isChatOpen]);

	/**
	 * Updates the user name in both ref and state
	 * @param {string} name - The new user name to set
	 * @memoized
	 */
	const setUserName = useCallback((name: string) => {
		if (typeof name === "string" && name.trim() !== "") {
			userNameRef.current = name.trim();
			setDisplayName(name.trim());
		}
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isChatOpen,
				openChat,
				closeChat,
				userNameRef,
				setUserName,
				displayName,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
