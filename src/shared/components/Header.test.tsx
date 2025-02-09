import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header Component", () => {
	test("renders logo with correct alt text", () => {
		render(
			<Router>
				<Header />
			</Router>
		);
		const logo = screen.getByAltText("Botflix Logo");
		expect(logo).toBeInTheDocument();
	});

	test("renders navigation links", () => {
		render(
			<Router>
				<Header />
			</Router>
		);
		const links = screen.getAllByRole("link");
		const homeLink = links.find((link) => link.textContent === "Home");
		const movieApiLink = links.find((link) => link.textContent === "Movie API");
		const aboutLink = links.find((link) => link.textContent === "About");

		expect(homeLink).toBeInTheDocument();
		expect(movieApiLink).toBeInTheDocument();
		expect(aboutLink).toBeInTheDocument();
	});

	test("renders API info with correct link", () => {
		render(
			<Router>
				<Header />
			</Router>
		);
		const apiInfoLink = screen.getByRole("link", { name: /themoviedb api/i });
		expect(apiInfoLink).toBeInTheDocument();
		expect(apiInfoLink).toHaveAttribute("href", "https://www.themoviedb.org/");
	});
});
