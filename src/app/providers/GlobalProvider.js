import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { GlobalContext } from "../providers/GlobalContext";
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
export const GlobalProvider = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [displayFeeling, setDisplayFeeling] = useState({
        id: 0,
        label: "",
    });
    const [displayChatInput, setDisplayChatInput] = useState("");
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
    const setFeelingName = useCallback((id, label) => {
        setDisplayFeeling({ id, label });
    }, []);
    /**
     * Updates the chat input value in both ref and state
     * @param {string} input - The new chat input value to set
     * @memoized
     */
    const setChatInput = useCallback((input) => {
        setDisplayChatInput(input);
    }, []);
    return (_jsx(GlobalContext.Provider, { value: {
            isChatOpen,
            toggleChat,
            displayFeeling,
            setFeelingName,
            displayChatInput,
            setChatInput,
        }, children: children }));
};
