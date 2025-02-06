import { createContext } from "react";

/**
 * Interface that defines the shape of our global context
 */
export interface GlobalContextType {
	isChatOpen: boolean;
	displayFeeling: string;
	displayChatInput: string;
	openChat: () => void;
	closeChat: () => void;
	setChatInput: (input: string) => void;
	setFeelingName: (name: string) => void;
}

/**
 * Global context for managing chat state and user information
 */
export const GlobalContext = createContext<GlobalContextType>({
	isChatOpen: false,
	displayFeeling: "",
	displayChatInput: "",
	openChat: () => {},
	closeChat: () => {},
	setChatInput: () => {},
	setFeelingName: () => {},
});
