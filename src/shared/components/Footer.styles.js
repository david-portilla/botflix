import styled from "styled-components";
export const FooterContainer = styled.footer `
	background: var(--background-secondary);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
export const FooterContent = styled.div `
	a {
		position: relative;
		color: var(--text-primary, #fff);
		transition: all 0.2s ease-in-out;

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
			&::after {
				width: 100%;
			}
		}

		&:focus-visible {
			outline: 2px solid var(--botflix-color);
			outline-offset: 4px;
			border-radius: 4px;
		}
	}
`;
export const SocialLinks = styled.ul `
	display: flex;
	gap: 2rem;
	align-items: center;
	justify-content: center;

	@media (max-width: 640px) {
		gap: 1rem;
	}
`;
