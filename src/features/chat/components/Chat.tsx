import React, { useCallback, useEffect, useRef, useState } from "react";
import Core from "@landbot/core";
import { InitializationData } from "@landbot/core/dist/src/types";
import { useGlobal } from "../../../app/hooks/useGlobal";
import { ChatMessage, ChatButton, LiveChatMessage } from "../types/chatTypes";
import {
	parseMessage,
	parseMessages,
	messagesFilter,
	scrollBottom,
} from "../utils/messageUtils";

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
	const [messages, setMessages] = useState<Record<string, ChatMessage>>({});
	const [input, setInput] = useState("");
	const [config, setConfig] = useState(null);
	const [buttons, setButtons] = useState<ChatButton[]>([]);
	const core = useRef<Core | null>(null);
	const { closeChat, setFeelingName, setChatInput } = useGlobal();

	const initializeCore = useCallback(() => {
		if (config && !core.current) {
			core.current = new Core(config);
		}
	}, [config]);

	const destroyBot = useCallback(() => {
		if (core.current) {
			setMessages({});
			setButtons([]);
			core.current.destroy();
			core.current = null;
		}
	}, []);

	/**
	 * Handles successful bot initialization
	 * @param {InitializationData} data - Initial data from the bot
	 * @memoized
	 */
	const handleCoreInitSuccess = useCallback((data: InitializationData) => {
		setMessages(parseMessages(data.messages));
	}, []);

	/**
	 * Handles bot initialization errors
	 * @param {Error} error - Error object from initialization
	 * @memoized
	 */
	const handleCoreInitError = useCallback(
		(error: Error) => {
			console.error("Error initializing core:", error);
			destroyBot();
		},
		[destroyBot]
	);

	/**
	 * Subscribes to bot message pipeline and handles incoming messages
	 * @memoized
	 */
	const subscribeToPipeline = useCallback(() => {
		if (core.current) {
			core.current.pipelines.$readableSequence.subscribe(
				(data: LiveChatMessage) => {
					// ! TODO: remove this console.log before production
					console.log(
						data.author_type
							? `${data.author_type} response:`
							: "samurai response:",
						data
					);

					setMessages((messages) => ({
						...messages,
						[data.key]: parseMessage(data),
					}));

					// Handle button options if present
					if (Array.isArray(data.buttons) && Array.isArray(data.payloads)) {
						const buttonData: ChatButton[] = data.buttons.map(
							(text: string, index: number) => ({
								id: `btn-${index}-${data.key}`,
								text,
								payload: data.payloads?.[index] || "",
							})
						);
						setButtons(buttonData);
					}

					// Handle chat completion
					if (data.action === "finish" && data.author_type === "bot") {
						closeChat();
						destroyBot();
					}
				}
			);
		}
	}, [closeChat, destroyBot]);

	/**
	 * Initializes the bot and sets up message handling
	 * @memoized
	 */
	const initBot = useCallback(async () => {
		initializeCore();

		if (core.current) {
			try {
				const data = await core.current.init();
				handleCoreInitSuccess(data);
				subscribeToPipeline();
			} catch (error) {
				if (error instanceof Error) {
					handleCoreInitError(error);
				} else {
					console.error("Unknown error initializing core:", error);
				}
			}
		}
	}, [
		initializeCore,
		handleCoreInitSuccess,
		handleCoreInitError,
		subscribeToPipeline,
	]);

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
			setFeelingName(input);
			core.current.sendMessage({ message: input });
			setInput(input);
			setChatInput(input);
		}
	}, [input, setFeelingName]);

	/**
	 * Handles button click events
	 * @param {string} buttonValue - Text of the clicked button
	 * @param {string} payload - Action payload for the button
	 */
	const handleClick = (buttonValue: string, payload: string) => {
		if (core.current) {
			const currentUserMessage: ChatMessage = {
				key: `user-${Date.now()}`,
				text: buttonValue,
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

			setButtons([]);
		}
	};

	return (
		<ChatContainer>
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
							>
								{/* ! TODO: remove this avatar */}
								<figure className="media-left landbot-message-avatar">
									<p className="image is-64x64">
										<img
											alt=""
											className="is-rounded"
											src="http://i.pravatar.cc/100"
										/>
									</p>
								</figure>
								<MessageContent $isUser={message.author === "user"}>
									<div className="content">
										<p>{message.text}</p>
									</div>
								</MessageContent>
							</MessageBubble>
						))}

					{buttons.length > 0 && (
						<ButtonsContainer>
							{buttons.map((button) => (
								<OptionButton
									key={button.id}
									className="landbot-option-button"
									onClick={() => handleClick(button.text, button.payload)}
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
