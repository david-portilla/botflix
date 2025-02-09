// jest.config.mjs
export default {
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(gif|ttf|eot|svg)$": "jest-transform-stub",
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	transformIgnorePatterns: ["/node_modules/"],
};
