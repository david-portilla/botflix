declare global {
	interface ImportMeta {
		env: {
			VITE_LANDBOT_URL: string;
			VITE_IMAGE_COVER: string;
		};
	}

	let importMeta: ImportMeta;
}

export {};
