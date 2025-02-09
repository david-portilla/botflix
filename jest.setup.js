// jest.setup.js
const { config } = require("dotenv");
const { TextEncoder, TextDecoder } = require("util");

config();

globalThis.importMeta = {
	env: {
		VITE_LANDBOT_URL: process.env.VITE_LANDBOT_URL,
		VITE_IMAGE_COVER: process.env.VITE_IMAGE_COVER,
	},
};
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
