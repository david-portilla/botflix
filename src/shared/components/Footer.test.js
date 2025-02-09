import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";
describe("Footer Component", () => {
    test("renders creator link with correct href", () => {
        render(_jsx(Footer, {}));
        const creatorLink = screen.getByRole("link", {
            name: /visit david portilla's website/i,
        });
        expect(creatorLink).toBeInTheDocument();
        expect(creatorLink).toHaveAttribute("href", "https://davidportilla.com");
    });
    test("renders current year", () => {
        render(_jsx(Footer, {}));
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} All rights reserved`)).toBeInTheDocument();
    });
    test("renders social media links", () => {
        render(_jsx(Footer, {}));
        const linkedInLink = screen.getByRole("link", {
            name: /visit david portilla's linkedin profile/i,
        });
        const githubLink = screen.getByRole("link", {
            name: /visit david portilla's github profile/i,
        });
        expect(linkedInLink).toBeInTheDocument();
        expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/davidportilla/");
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", "https://github.com/david-portilla");
    });
});
