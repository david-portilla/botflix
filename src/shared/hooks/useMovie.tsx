import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MovieList, Movie } from "../types/movieTypes";
import { handleURL } from "../utils/handleUrl";
export const useMovie = (id: string) => {
	const queryClient = useQueryClient();

	const cachedQueries = queryClient.getQueriesData<MovieList>({
		queryKey: ["movies"],
	});

	const cachedMovie = cachedQueries[0]?.[1]?.results?.find(
		(movie) => movie.id === Number(id)
	);

	return useQuery<Movie>({
		queryKey: ["movie", id],
		queryFn: async () => {
			const response = await fetch(handleURL(id));
			if (!response.ok) {
				throw new Error("Network error: " + response.status);
			}
			return response.json();
		},
		initialData: cachedMovie,
		enabled: !cachedMovie,
	});
};
