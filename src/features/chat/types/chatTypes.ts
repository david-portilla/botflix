import { Message } from "@landbot/core/dist/src/types";

export interface ExtendedMessage extends Message {
	rich_text?: string;
	title?: string;
	samurai?: string | number;
	author_type?: string;
	buttons?: string[];
	payloads?: string[];
	url?: string;
}

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
