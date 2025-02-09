import "@testing-library/jest-dom";
import axios from "axios";

describe("Chat Component", () => {
	it("should use the correct VITE_LANDBOT_URL", () => {
		expect(importMeta.env.VITE_LANDBOT_URL).toBe(
			"https://storage.googleapis.com/landbot.online/v3/H-2768940-4PRD73A7U94NPL57/index.json"
		);
	});

	it("should return a response from landbot endpoint", async () => {
		const response = await axios.get(importMeta.env.VITE_LANDBOT_URL);
		expect(response.status).toBe(200);
		expect(response.data).toBeDefined();
		expect(response.data.welcomeUrl).toBe("https://welcome.landbot.io/");
	});
});
