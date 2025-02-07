export interface MovieGridProps {
	term: {
		id: number;
		label: string;
	};
}

export const MoviesQueryKeys = {
	movies: {
		list: (url: string) => ["movies", url] as const,
		details: (id: string) => ["movie", id] as const,
		all: ["movies"] as const,
	},
};

export interface MovieList {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Movie {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	original_language: string;
	poster_path: string;
	vote_average: number;
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	original_title: string;
	popularity: number;
	video: boolean;
	vote_count: number;
}
