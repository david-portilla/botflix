import { FooterContainer, FooterContent, SocialLinks } from "./Footer.styles";
import { Link } from "react-router-dom";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<FooterContainer>
			<FooterContent className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center gap-6">
					<div className="text-center">
						<p className="text-gray-400 mb-2">
							Created by{" "}
							<Link
								to="https://davidportilla.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-white"
								aria-label="Visit David Portilla's website"
							>
								David Portilla
							</Link>
						</p>
						<p className="text-sm text-gray-500">
							© {currentYear} All rights reserved
						</p>
					</div>

					<nav aria-label="Social media links">
						<SocialLinks className="list-none">
							<li>
								<Link
									to="https://www.linkedin.com/in/davidportilla/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-gray-400 hover:text-white transition-colors"
									aria-label="Visit David Portilla's LinkedIn profile"
								>
									LinkedIn
								</Link>
							</li>
							<li>
								<Link
									to="https://github.com/david-portilla"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-gray-400 hover:text-white transition-colors"
									aria-label="Visit David Portilla's GitHub profile"
								>
									GitHub
								</Link>
							</li>
						</SocialLinks>
					</nav>
				</div>
			</FooterContent>
		</FooterContainer>
	);
};
