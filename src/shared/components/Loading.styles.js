import styled, { keyframes } from "styled-components";
const jump = keyframes `
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
`;
export const Loader = styled.div `
	background: #00000080;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;

	.loading {
		opacity: 0;
		display: flex;
		position: fixed;
		transition: opacity 0.3s ease-in;
		text-align: center;
	}

	.loading.show {
		opacity: 1;
	}

	.ball {
		background-color: var(--btn-primary);
		border-radius: 50%;
		margin: 0 5px;
		height: 8px;
		width: 8px;
		animation: ${jump} 0.5s ease-in infinite;
	}

	.ball:nth-of-type(2) {
		animation-delay: 0.1s;
	}

	.ball:nth-of-type(3) {
		animation-delay: 0.2s;
	}
`;
