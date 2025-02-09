import React, { useCallback, useEffect, useRef, useState } from "react";
import Core from "@landbot/core";
import {
	ConfigProperties,
	InitializationData,
} from "@landbot/core/dist/src/types";
import { useGlobal } from "../../../app/hooks/useGlobal";
import { UI_Message, ChatButton, LiveChatMessage } from "../types/chatTypes";
import {
	parseMessage,
	parseMessages,
	messagesFilter,
	scrollBottom,
} from "../utils/messageUtils";
import { getGenreFromEmotion } from "../utils/genreMap";

import {
	ChatContainer,
	ChatWrapper,
	ChatHeader,
	MessagesContainer,
	MessageBubble,
	MessageContent,
	InputContainer,
	Input,
	SendButton,
	ButtonsContainer,
	OptionButton,
} from "./Chat.styles";

/**
 * Chat component that handles the interaction with Landbot
 *
 * @component
 * @description
 * A React component that provides a complete chat interface with the following features:
 * - Real-time message display and history management
 * - User input handling with text and button interactions
 * - Integration with Landbot Core for bot communication
 * - Automatic message parsing and formatting
 * - Auto-scrolling message container
 * - Support for text, rich text, and image messages
 * - Button-based interaction options
 *
 * @example
 * ```tsx
 * <Chat />
 * ```
 */
export const Chat = React.memo(() => {
	const BOT_URL = import.meta.env.VITE_LANDBOT_URL;
	const [messages, setMessages] = useState<Record<string, UI_Message>>({});
	const [input, setInput] = useState("");
	const [config, setConfig] = useState<ConfigProperties | undefined>(undefined);
	const [buttons, setButtons] = useState<ChatButton[]>([]);
	const core = useRef<Core | null>(null);
	const { toggleChat, setFeelingName, setChatInput } = useGlobal();

	/**
	 * Destroys the bot and resets the state
	 * @memoized
	 */
	const destroyBot = useCallback(() => {
		setMessages({});
		setButtons([]);
		setInput("");
		if (core.current) {
			core.current.destroy();
			core.current = null;
		}
	}, []);

	/**
	 * Subscribes to bot message pipeline and handles incoming messages
	 * @memoized
	 */
	const subscribeToPipeline = useCallback(() => {
		if (core.current) {
			core.current.pipelines.$readableSequence.subscribe(
				(data: LiveChatMessage) => {
					setMessages((messages) => ({
						...messages,
						[data.key]: parseMessage(data),
					}));

					// Handle button options if present
					if ("buttons" in data && Array.isArray(data.buttons)) {
						const buttonData: ChatButton[] = data.buttons.map(
							(text: string, index: number) => ({
								id: `btn-${index}-${data.key}`,
								text,
								payload: data.payloads?.[index] || "",
								link: data.urls?.[index] || "",
								timestamp: data.timestamp,
							})
						);
						setButtons(buttonData);
					}

					// Handle finish action
					if (
						data.type === "hidden" &&
						"action" in data &&
						data.action === "finish"
					) {
						toggleChat();
						destroyBot();
					}
				}
			);
		}
	}, [toggleChat, destroyBot]);

	/**
	 * Initializes the bot and sets up message handling
	 * @memoized
	 */
	const initBot = useCallback(async () => {
		if (config) core.current = new Core(config);

		if (core.current) {
			try {
				const data: InitializationData = await core.current.init();
				setMessages(parseMessages(data.messages));
				subscribeToPipeline();
			} catch (error) {
				console.error("Error initializing core:", error);
			}
		}
	}, [config, subscribeToPipeline]);

	/**
	 * Fetches the bot configuration
	 * @memoized
	 */
	const fetchConfig = useCallback(async (url: string) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setConfig(data);
		} catch (error) {
			console.error("Error fetching config:", error);
		}
	}, []);

	useEffect(() => {
		fetchConfig(BOT_URL);
	}, [fetchConfig]);

	useEffect(() => {
		initBot();
		return () => destroyBot();
	}, [initBot, destroyBot]);

	useEffect(() => {
		const container = document.getElementById("landbot-messages-container");
		scrollBottom(container);
	}, [messages]);

	/**
	 * Submits user input to the bot
	 * @memoized
	 *
	 * @description
	 * Sends the current input value to the bot if it's not empty and a bot instance exists.
	 * Clears the input field after submission.
	 *
	 * @requires core - Active Landbot Core instance
	 * @requires input - Non-empty input string
	 */
	const submit = useCallback(() => {
		if (input !== "" && core.current) {
			core.current.sendMessage({ message: input });
			setInput("");

			//! TODO: Remove this after testing
			// generataFakeChat();
		}
	}, [input]);

	/**
	 * Generates a fake chat for local development
	 * @memoized
	 */
	// @ts-ignore
	const generataFakeChat = useCallback(async () => {
		if (core.current) {
			const currentUserMessage: UI_Message = {
				key: `user-${Date.now()}`,
				text: input,
				author_type: "user",
				timestamp: Date.now(),
				type: "text",
			};

			setMessages((messages) => ({
				...messages,
				[currentUserMessage.key]: currentUserMessage,
			}));

			const delay = (ms: number) =>
				new Promise((resolve) => setTimeout(resolve, ms));

			await delay(2000);
			setFeelingName(14, "Happy");
			setChatInput("Happy");

			if (currentUserMessage) {
				await delay(4000);
				toggleChat();
				destroyBot();
			}
		}
	}, [input]);

	/**
	 * Processes button click interactions
	 *
	 * @param {ChatButton} button - The button object that was clicked
	 * @description
	 * Handles button click events by sending a button message to the bot.
	 * Updates the message history with the user's click action.
	 */
	const handleClick = (button: ChatButton) => {
		const { text, payload, link } = button;

		if (core.current) {
			const currentUserMessage: UI_Message = {
				key: `user-${Date.now()}`,
				text: text,
				author_type: "user",
				timestamp: Date.now(),
				type: "text",
			};

			setMessages((messages) => ({
				...messages,
				[currentUserMessage.key]: currentUserMessage,
			}));

			core.current.sendMessage({
				type: "button",
				message: currentUserMessage.text,
				payload: payload,
				custom_data: {},
			});

			text && getMoodies(text);
			link && talkToAgent(link);
			setButtons([]);
		}
	};

	/**
	 * Fetches moodies from the API
	 * @param {string} genre - The genre/emotion to get recommendations for
	 *
	 * @description
	 * Maps the provided genre to a mood and updates the global state
	 * with the corresponding feeling after a delay.
	 */
	const getMoodies = async (genre: string) => {
		const moodie = getGenreFromEmotion(genre);
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		if (moodie) {
			await delay(4000);
			setFeelingName(moodie.id, moodie.label);
			setChatInput(moodie?.label || "");
		}
	};

	/**
	 * Opens a new window to the agent
	 * @param {string} link - Link to the agent
	 *
	 * @description
	 * Opens a new window to the provided link if it includes "wa.me"
	 */
	const talkToAgent = (link: string) => {
		if (link?.includes("wa.me"))
			window.open(link, "_blank noopener noreferrer");
	};

	return (
		<ChatContainer aria-label="Chat section" role="complementary">
			<ChatWrapper>
				<ChatHeader>
					<h1 className="subtitle">Movie AI Consultant</h1>
				</ChatHeader>

				<MessagesContainer
					id="landbot-messages-container"
					aria-label="Chat messages"
					role="log"
					aria-live="polite"
				>
					{Object.values(messages)
						.filter(messagesFilter)
						.sort((a, b) => a.timestamp - b.timestamp)
						.map((message) => (
							<MessageBubble
								data-author={message.author_type}
								$isUser={message.author_type === "user"}
								key={message.key}
								role="article"
								aria-label={`Message from ${message.author_type}`}
							>
								<figure className="media-left landbot-message-avatar">
									<p className="image is-64x64">
										<img
											alt="avatar image"
											className="is-rounded"
											src={
												message.author_type === "user"
													? "https://avatar.iran.liara.run/public/20"
													: "https://avatar.iran.liara.run/public/job/operator/male"
											}
										/>
									</p>
								</figure>
								<MessageContent $isUser={message.author_type === "user"}>
									{message.type === "image" && message.url ? (
										<img
											src={message.url}
											alt={message.text || "Chat image"}
											style={{ maxWidth: "100%" }}
										/>
									) : message.rich_text ? (
										<div
											className="rich-text"
											dangerouslySetInnerHTML={{ __html: message.rich_text }}
											role="textbox"
											aria-readonly="true"
										/>
									) : (
										<p>{message.text}</p>
									)}
								</MessageContent>
							</MessageBubble>
						))}

					{buttons.length > 0 && (
						<ButtonsContainer aria-label="Chat buttons" role="group">
							{buttons.map((button) => (
								<OptionButton
									key={button.id}
									className="landbot-option-button"
									onClick={() => handleClick(button)}
									aria-label={`Button: ${button.text}`}
								>
									{button.text}
								</OptionButton>
							))}
						</ButtonsContainer>
					)}
				</MessagesContainer>

				<InputContainer>
					<div className="field">
						<div className="control">
							<Input
								className="landbot-input"
								onChange={(e) => setInput(e.target.value)}
								onKeyUp={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										submit();
									}
								}}
								placeholder="Type here..."
								type="text"
								value={input}
								aria-label="Chat message input"
								role="textbox"
							/>
							<SendButton
								disabled={input === ""}
								onClick={submit}
								type="button"
								aria-label="Send message"
							>
								<span className="icon is-large text-2xl" aria-label="Send icon">
									➤
								</span>
							</SendButton>
						</div>
					</div>
				</InputContainer>
			</ChatWrapper>
		</ChatContainer>
	);
});
