const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export function handleURL(term: string, page = 1) {
	//TODO: Add movies by genre (feelings, emotions, etc.)
	if (term.trim().length === 0)
		return `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

	if (term.trim().length > 0 && /^\d+$/.test(term)) {
		return `${BASE_URL}/movie/${term}?api_key=${API_KEY}&language=en-US`;
	}

	return `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${term}&language=en-US&page=${page}`;
}
