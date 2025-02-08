/**
 * Base message interface with common properties
 */
interface BaseMessage {
	id: string;
	key: string;
	uuid: string;
	type: string;
	timestamp: number;
	channel: number;
	chat: number;
	author_type: "bot" | "user";
	author_uuid: string;
	message: string;
	read: boolean;
	ui_key: string | null;
	extra: Record<string, any>;
}

/**
 * Bot specific message properties
 */
interface BotMessage extends BaseMessage {
	author_type: "bot";
	rich_text?: string;
	samurai: number;
	buttons?: string[];
	payloads?: string[];
	urls?: string[];
	url?: string;
	action?: string;
}

/**
 * User specific message properties
 */
interface UserMessage extends BaseMessage {
	author_type: "user";
	readed_at: number;
}

/**
 * Union type for all possible message types
 */
export type LiveChatMessage = BotMessage | UserMessage;

/**
 * Interface for UI representation of messages
 */
export interface UI_Message {
	key: string;
	text: string;
	rich_text?: string;
	url?: string;
	author: "bot" | "user";
	timestamp: number;
	type: string;
	payload?: string;
}

/**
 * Interface for button structure
 */
export interface ChatButton {
	id: string;
	text: string;
	payload: string;
	link?: string;
	timestamp: number;
}
