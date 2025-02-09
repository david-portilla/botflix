import { jsx as _jsx } from "react/jsx-runtime";
// src/features/search/components/SearchBar.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import { SearchBar } from "./SearchBar";
import { useGlobal } from "../../../app/hooks/useGlobal";
// Mock the useGlobal hook
jest.mock("../../../app/hooks/useGlobal");
describe("SearchBar Component", () => {
    beforeEach(() => {
        useGlobal.mockReturnValue({
            setFeelingName: jest.fn(),
            displayChatInput: "",
            setChatInput: jest.fn(),
        });
    });
    test("renders search input and icon", () => {
        render(_jsx(SearchBar, {}));
        expect(screen.getByPlaceholderText("Search for movies...")).toBeInTheDocument();
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    });
    test("displays message when input is empty", () => {
        render(_jsx(SearchBar, {}));
        expect(screen.getByRole("status")).toHaveTextContent("Type to search for your favorite movies");
    });
    test("displays message when input is less than 3 characters", () => {
        useGlobal.mockReturnValue({
            setFeelingName: jest.fn(),
            displayChatInput: "ab",
            setChatInput: jest.fn(),
        });
        render(_jsx(SearchBar, {}));
        expect(screen.getByRole("status")).toHaveTextContent("Please enter at least 3 characters");
    });
    test("calls setChatInput on input change", () => {
        const setChatInputMock = jest.fn();
        useGlobal.mockReturnValue({
            setFeelingName: jest.fn(),
            displayChatInput: "",
            setChatInput: setChatInputMock,
        });
        render(_jsx(SearchBar, {}));
        const input = screen.getByPlaceholderText("Search for movies...");
        fireEvent.change(input, { target: { value: "abc" } });
        expect(setChatInputMock).toHaveBeenCalledWith("abc");
    });
});
