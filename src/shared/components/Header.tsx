import botflixLogo from "../../assets/images/botflix.svg";
import {
	ApiInfo,
	HeaderContainer,
	HeaderContent,
	Logo,
	NavLinks,
	NavLink,
} from "./Header.styles";

export const Header = () => {
	return (
		<HeaderContainer>
			<HeaderContent>
				<Logo to="/" aria-label="Botflix Home">
					<img src={botflixLogo} alt="Botflix Logo" />
				</Logo>

				{/* TODO: Add links to the pages */}
				<NavLinks aria-label="Main navigation">
					<NavLink to="/" aria-current="page">
						Home
					</NavLink>
					<NavLink
						to="https://www.themoviedb.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Movie API
					</NavLink>
					<NavLink
						to="https://davidportilla.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						About
					</NavLink>
				</NavLinks>

				<ApiInfo>
					powered by <strong>themoviedb API</strong>
				</ApiInfo>
			</HeaderContent>
		</HeaderContainer>
	);
};
