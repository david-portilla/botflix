import { createContext } from "react";

/**
 * Interface that defines the shape of our global context
 */
export interface GlobalContextType {
	isChatOpen: boolean;
	displayFeeling: {
		id: number;
		label: string;
	};
	displayChatInput: string;
	toggleChat: () => void;
	setFeelingName: (id: number, label: string) => void;
	setChatInput: (input: string) => void;
}

/**
 * Global context for managing chat state and user information
 */
export const GlobalContext = createContext<GlobalContextType>({
	isChatOpen: false,
	displayFeeling: { id: 0, label: "" },
	displayChatInput: "",
	toggleChat: () => {},
	setChatInput: () => {},
	setFeelingName: () => {},
});
