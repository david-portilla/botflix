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
					<NavLink to="/#">Movies</NavLink>
					<NavLink to="/#">About</NavLink>
				</NavLinks>

				<ApiInfo>
					powered by <strong>themoviedb API</strong>
				</ApiInfo>
			</HeaderContent>
		</HeaderContainer>
	);
};
