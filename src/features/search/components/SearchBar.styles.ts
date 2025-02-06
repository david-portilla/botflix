import styled from "styled-components";

export const SearchSection = styled.section`
	background: var(--background-secondary);
	border-bottom: 1px solid var(--border-color);
	position: relative;

	&::after {
		content: "";
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--botflix-color) 50%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	&:focus-within::after {
		opacity: 0.2;
	}
`;

export const SearchForm = styled.form`
	position: relative;
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
`;

export const SearchInput = styled.input`
	width: 100%;
	height: var(--search-height);
	padding: 1rem 1rem 1rem 3rem;
	background: var(--background-primary);
	border: 1px solid var(--border-color);
	border-radius: var(--search-border-radius);
	box-shadow: var(--search-shadow);
	color: var(--text-primary);
	font-size: 1rem;
	transition: all 0.2s ease-in-out;

	&::placeholder {
		color: var(--text-secondary);
	}

	&:focus {
		outline: none;
		border-color: var(--botflix-color);
		box-shadow: var(--search-focus-shadow);
	}

	@media (min-width: 640px) {
		font-size: 1.125rem;
	}
`;

export const SearchIcon = styled.svg`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	width: 1.25rem;
	height: 1.25rem;
	color: var(--text-secondary);
	pointer-events: none;
	transition: color 0.2s ease-in-out;

	${SearchInput}:focus + & {
		color: var(--botflix-color);
	}
`;

export const SearchMessage = styled.p`
	color: var(--text-secondary);
	text-align: center;
	margin-top: 0.75rem;
	font-size: 0.875rem;

	@media (min-width: 640px) {
		font-size: 1rem;
	}
`;
