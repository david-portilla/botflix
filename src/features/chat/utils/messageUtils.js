/**
 * Parses a raw message into the internal ChatMessage format
 * @param {LiveChatMessage} data - Raw message data from the bot
 * @returns {UI_Message} Formatted chat message
 */
export function parseMessage(data) {
    return {
        key: data.key,
        text: data.message || "",
        rich_text: "rich_text" in data ? data.rich_text : undefined,
        url: "url" in data ? data.url : undefined,
        author_type: data.author_type || "bot",
        timestamp: data.timestamp,
        type: data.type,
    };
}
/**
 * Converts an object of messages into the internal format
 * @param {Record<string, LiveChatMessage>} messages - Object containing messages
 * @returns {Record<string, UI_Message>} Formatted messages object
 */
export function parseMessages(messages) {
    return Object.entries(messages).reduce((obj, [key, message]) => ({
        ...obj,
        [key]: parseMessage(message),
    }), {});
}
/**
 * Filters messages based on supported types
 * @param {UI_Message} data - Message to filter
 * @returns {boolean} Whether the message should be displayed
 */
export function messagesFilter(data) {
    return ["text", "dialog", "image"].includes(data.type);
}
/**
 * Scrolls a container to the bottom
 * @param {HTMLElement | null} container - Container element to scroll
 */
export function scrollBottom(container) {
    if (container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }
}
