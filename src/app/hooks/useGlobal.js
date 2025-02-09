import { useContext } from "react";
import { GlobalContext } from "../providers/index";
/**
 * Custom hook to access the global chat context
 * @throws {Error} If used outside of GlobalProvider
 * @returns {GlobalContextType} The global context value
 */
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};
