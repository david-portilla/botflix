import { createContext } from "react";
/**
 * Global context for managing chat state and user information
 */
export const GlobalContext = createContext({
    isChatOpen: false,
    displayFeeling: { id: 0, label: "" },
    displayChatInput: "",
    toggleChat: () => { },
    setChatInput: () => { },
    setFeelingName: () => { },
});
