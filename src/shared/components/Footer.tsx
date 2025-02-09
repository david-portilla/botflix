import { FooterContainer, FooterContent, SocialLinks } from "./Footer.styles";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<FooterContainer as="footer" role="contentinfo">
			<FooterContent className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center gap-6">
					<div className="text-center">
						<p className="text-gray-400 mb-2">
							Created by{" "}
							<a
								href="https://davidportilla.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-white"
								aria-label="Visit David Portilla's website"
							>
								David Portilla
							</a>
						</p>
						<p className="text-sm text-gray-500">
							© {currentYear} All rights reserved
						</p>
					</div>

					<nav aria-label="Social media links">
						<SocialLinks className="list-none">
							<li>
								<a
									href="https://www.linkedin.com/in/davidportilla/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-gray-400 hover:text-white transition-colors"
									aria-label="Visit David Portilla's LinkedIn profile"
								>
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href="https://github.com/david-portilla"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-gray-400 hover:text-white transition-colors"
									aria-label="Visit David Portilla's GitHub profile"
								>
									GitHub
								</a>
							</li>
						</SocialLinks>
					</nav>
				</div>
			</FooterContent>
		</FooterContainer>
	);
};
