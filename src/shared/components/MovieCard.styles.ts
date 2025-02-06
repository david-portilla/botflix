import styled from "styled-components";

export const MovieArticle = styled.article`
	position: relative;
	border-radius: 0.75rem;
	overflow: hidden;
	transition: transform 0.2s ease-in-out;
	background: var(--background-secondary);

	&:hover {
		transform: translateY(-4px);
	}
`;

export const RatingBadge = styled.div<{ $score: number }>`
	background: ${(props) => {
		if (props.$score >= 70) return "var(--rating-green)";
		if (props.$score >= 40) return "var(--rating-yellow)";
		return "var(--rating-red)";
	}};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

	span {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}
`;
