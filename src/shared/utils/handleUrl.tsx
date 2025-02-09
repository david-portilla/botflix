const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export function handleURL(term: string, page = 1, isMovieId = false) {
	if (!term || term === "0") {
		return `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
	}

	if (isMovieId) {
		return `${BASE_URL}/movie/${term}?api_key=${API_KEY}&language=en-US`;
	}

	if (/^\d+$/.test(term)) {
		return `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${term}&page=${page}`;
	}
	return `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${term}&language=en-US&page=${page}`;
}
