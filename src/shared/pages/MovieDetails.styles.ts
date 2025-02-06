import styled from "styled-components";

export const GradientOverlay = styled.div`
	background: linear-gradient(
		to right,
		rgba(26, 26, 26, 0.95) 0%,
		rgba(26, 26, 26, 0.85) 50%,
		rgba(26, 26, 26, 0.95) 100%
	);
	position: absolute;
	inset: 0;
	z-index: 10;
`;

export const UserScoreRing = styled.div<{ $score: number }>`
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
