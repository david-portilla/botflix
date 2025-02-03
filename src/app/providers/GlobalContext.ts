import { createContext } from "react";

/**
 * Interface that defines the shape of our global context
 */
export interface GlobalContextType {
	isChatOpen: boolean;
	openChat: () => void;
	closeChat: () => void;
	userNameRef: React.MutableRefObject<string>;
	setUserName: (name: string) => void;
	displayName: string;
}

/**
 * Global context for managing chat state and user information
 */
export const GlobalContext = createContext<GlobalContextType>({
	isChatOpen: false,
	openChat: () => {},
	closeChat: () => {},
	userNameRef: { current: "" },
	setUserName: () => {},
	displayName: "",
});
