import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
	background: var(--background-secondary);
	border-bottom: 1px solid var(--border-color);
	height: var(--header-height);
	box-shadow: var(--header-shadow);
	position: sticky;
	top: 0;
	z-index: 50;
	backdrop-filter: blur(8px);
	transition: all 0.3s ease-in-out;

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
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}
`;

export const HeaderContent = styled.div`
	height: var(--header-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem 0;
	gap: 0.5rem;

	@media (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
		padding: 1rem 2rem;
	}
`;

export const Logo = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	transition: transform 0.2s ease-in-out;

	&:hover {
		transform: scale(1.05);
	}

	&:focus-visible {
		outline: 2px solid var(--botflix-color);
		outline-offset: 4px;
		border-radius: 4px;
	}

	img {
		width: 120px;
		height: 32px;
		object-fit: contain;
	}
`;

export const NavLinks = styled.nav`
	display: flex;
	align-items: center;
	gap: 2rem;

	@media (max-width: 640px) {
		gap: 1rem;
	}
`;

export const NavLink = styled(Link)`
	color: var(--text-secondary);
	font-size: 0.875rem;
	transition: all 0.2s ease-in-out;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		width: 0;
		height: 2px;
		bottom: -2px;
		left: 0;
		background-color: var(--botflix-color);
		transition: width 0.2s ease-in-out;
	}

	&:hover {
		color: var(--text-primary);

		&::after {
			width: 100%;
		}
	}

	&:focus-visible {
		outline: 2px solid var(--botflix-color);
		outline-offset: 4px;
		border-radius: 4px;
	}
`;

export const ApiInfo = styled.div`
	font-size: 0.75rem;
	color: var(--text-secondary);
	text-align: center;

	@media (min-width: 640px) {
		font-size: 0.875rem;
		text-align: right;
	}

	strong {
		color: var(--text-primary);
	}
`;
