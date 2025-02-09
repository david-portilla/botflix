import { useQuery } from "@tanstack/react-query";
import { MoviesQueryKeys } from "../types/movieTypes";
export const useMovies = (url) => {
    return useQuery({
        queryKey: MoviesQueryKeys.movies.list(url),
        queryFn: async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network error: Code " + response.status);
            }
            return response.json();
        },
    });
};
