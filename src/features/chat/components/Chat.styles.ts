import styled from "styled-components";

export const ChatContainer = styled.section`
	position: fixed;
	bottom: 24px;
	right: 84px;
	width: 425px;
	height: calc(70vh - 100px);
	min-height: 400px;
	max-height: 700px;
	z-index: 50;
	filter: drop-shadow(0 0 10px var(--botflix-color-opacity-10));
`;

export const ChatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 16px;
	background-color: var(--background-secondary);
	box-shadow:
		0 0 0 1px var(--botflix-color-opacity-10),
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06),
		0 20px 25px -5px rgba(0, 0, 0, 0.5);
	border: 1px solid var(--border-color);
	animation: slideIn 0.3s ease-out;

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const ChatHeader = styled.div`
	padding: 16px 20px;
	background-color: var(--background-primary);
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	border-bottom: 1px solid var(--border-color);

	.subtitle {
		color: var(--botflix-color);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
	}
`;

export const MessagesContainer = styled.div`
	flex: 1;
	overflow: auto;
	padding: 24px 16px;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: var(--background-secondary);
	}

	&::-webkit-scrollbar-thumb {
		background: var(--text-secondary);
		border-radius: 4px;
	}
`;

export const MessageBubble = styled.article<{ $isUser?: boolean }>`
	display: flex;
	align-items: flex-start;
	margin-bottom: 12px;
	flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
	gap: 8px;

	&[data-author="user"] + &[data-author="user"],
	&[data-author="bot"] + &[data-author="bot"] {
		margin-top: 4px;
	}

	figure {
		width: 32px;
		height: 32px;
		margin: 0;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			object-fit: cover;
		}
	}
`;

export const MessageContent = styled.div<{ $isUser?: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--text-primary);
  max-width: 80%;
  background-color: ${(props) => (props.$isUser ? "var(--botflix-color)" : "var(--background-primary)")};
  border-bottom-${(props) => (props.$isUser ? "right" : "left")}-radius: 4px;
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const InputContainer = styled.div`
	position: relative;
	background-color: var(--background-primary);
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	border-top: 1px solid var(--border-color);
	padding: 8px;
`;

export const Input = styled.input`
	width: 100%;
	padding: 12px 16px;
	color: var(--text-primary);
	background-color: var(--background-secondary);
	border: 1px solid var(--border-color);
	border-radius: 8px;
	outline: none;
	font-size: 0.95rem;

	&:focus {
		border-color: var(--botflix-color);
	}

	&::placeholder {
		color: var(--text-secondary);
	}
`;

export const SendButton = styled.button`
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	color: var(--botflix-color);
	background-color: transparent;
	border: 0;
	padding: 8px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:disabled {
		opacity: 0.5;
	}

	&:not(:disabled):hover {
		color: var(--rating-red);
	}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin: 16px 8px;
`;

export const OptionButton = styled.button`
	padding: 8px 16px;
	background-color: var(--botflix-color);
	color: var(--text-primary);
	border: none;
	border-radius: 8px;
	font-size: 0.9rem;
	transition: all 0.2s ease;

	&:hover {
		background-color: var(--botflix-color-dark);
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;
