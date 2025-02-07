import { Message } from "@landbot/core/dist/src/types";

/**
 * Interface for chat message structure
 */
export interface ChatMessage {
	key: string;
	text?: string;
	richText?: string;
	url?: string;
	author: "bot" | "user";
	timestamp: number;
	type: string;
	payload?: string;
}

/**
 * Interface for live chat messages from the bot
 */
export interface LiveChatMessage extends Message {
	author_type: "bot" | "user";
	buttons?: string[];
	payloads?: string[];
}

/**
 * Interface for button structure
 */
export interface ChatButton {
	id: string;
	text: string;
	payload: string;
}
