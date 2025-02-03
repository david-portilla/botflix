import { Message } from "@landbot/core/dist/src/types";
import { ChatMessage } from "../types/chatTypes";

/**
 * Parses a raw message into the internal ChatMessage format
 * @param {Message} data - Raw message data from the bot
 * @returns {ChatMessage} Formatted chat message
 */
export function parseMessage(data: Message): ChatMessage {
	return {
		key: data.key,
		text: data.title || data.message,
		author: data.samurai !== undefined ? "bot" : "user",
		timestamp: data.timestamp,
		type: data.type,
	};
}

/**
 * Converts an object of messages into the internal format
 * @param {Record<string, Message>} messages - Object containing messages
 * @returns {Record<string, ChatMessage>} Formatted messages object
 */
export function parseMessages(
	messages: Record<string, Message>
): Record<string, ChatMessage> {
	return Object.values(messages).reduce(
		(obj, next) => {
			obj[next.key] = parseMessage(next);
			return obj;
		},
		{} as Record<string, ChatMessage>
	);
}

/**
 * Filters messages based on supported types
 * @param {ChatMessage} data - Message to filter
 * @returns {boolean} Whether the message should be displayed
 */
export function messagesFilter(data: ChatMessage) {
	/** Support for basic message types */
	return ["text", "dialog"].includes(data.type);
}

/**
 * Scrolls a container to the bottom
 * @param {HTMLElement | null} container - Container element to scroll
 */
export function scrollBottom(container: HTMLElement | null) {
	if (container) {
		container.scrollTo({
			top: container.scrollHeight,
			behavior: "smooth",
		});
	}
}
