import React, { useCallback, useEffect, useRef, useState } from "react";
import Core from "@landbot/core";
import { ConfigProperties } from "@landbot/core/dist/src/types";
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
 * This component manages:
 * - Message display and history
 * - User input handling
 * - Bot initialization and cleanup
 * - Message parsing and formatting
 * - Auto-scrolling
 *
 * @component
 * @example
 * ```tsx
 * <Chat />
 * ```
 */
export const Chat = React.memo(() => {
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
		console.log("destroyBot");
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
						console.log("finish!");
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
				const data = await core.current.init();
				const transformedMessages = Object.entries(data.messages).reduce(
					(acc, [key, message]) => ({
						...acc,
						[key]: {
							...message,
							author_type: "bot",
							uuid: message.id,
							channel: 0,
							chat: 0,
							read: false,
							author_uuid: "",
							extra: {},
						} as LiveChatMessage,
					}),
					{} as Record<string, LiveChatMessage>
				);
				setMessages(parseMessages(transformedMessages));
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
		fetchConfig(import.meta.env.VITE_LANDBOT_URL);
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
	 */
	const submit = useCallback(() => {
		if (input !== "" && core.current) {
			core.current.sendMessage({ message: input });
			setInput("");
		}
	}, [input]);

	/**
	 * Handles button click events
	 * @param {string} buttonValue - Text of the clicked button
	 * @param {string} payload - Action payload for the button
	 */
	const handleClick = (button: ChatButton) => {
		const { text, payload, link } = button;

		if (core.current) {
			const currentUserMessage: UI_Message = {
				key: `user-${Date.now()}`,
				text: text,
				author: "user",
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
	 * @param {string} genre - Genre of the moodie
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
	 */
	const talkToAgent = (link: string) => {
		if (link?.includes("wa.me"))
			window.open(link, "_blank noopener noreferrer");
	};

	return (
		<ChatContainer aria-label="Chat section" role="region">
			<ChatWrapper>
				<ChatHeader>
					<h1 className="subtitle">Movie AI Consultant</h1>
				</ChatHeader>

				<MessagesContainer id="landbot-messages-container">
					{Object.values(messages)
						.filter(messagesFilter)
						.sort((a, b) => a.timestamp - b.timestamp)
						.map((message) => (
							<MessageBubble
								data-author={message.author}
								$isUser={message.author === "user"}
								key={message.key}
								role="note"
								aria-label={`Message from ${message.author}`}
							>
								<figure className="media-left landbot-message-avatar">
									<p className="image is-64x64">
										<img
											alt=""
											className="is-rounded"
											src={
												message.author === "user"
													? "https://avatar.iran.liara.run/public/20"
													: "https://avatar.iran.liara.run/public/job/operator/male"
											}
										/>
									</p>
								</figure>
								<MessageContent $isUser={message.author === "user"}>
									{message.type === "image" && message.url ? (
										<img
											src={message.url}
											alt="GIF"
											style={{ maxWidth: "100%" }}
										/>
									) : message.rich_text ? (
										<div
											className="rich-text"
											dangerouslySetInnerHTML={{ __html: message.rich_text }}
										/>
									) : (
										<p>{message.text}</p>
									)}
								</MessageContent>
							</MessageBubble>
						))}

					{buttons.length > 0 && (
						<ButtonsContainer>
							{buttons.map((button) => (
								<OptionButton
									key={button.id}
									className="landbot-option-button"
									onClick={() => handleClick(button)}
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
							/>
							<SendButton
								disabled={input === ""}
								onClick={submit}
								type="button"
							>
								<span className="icon is-large" style={{ fontSize: 25 }}>
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
