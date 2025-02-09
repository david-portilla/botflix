import { useQuery, useQueryClient } from "@tanstack/react-query";
import { handleURL } from "../utils/handleUrl";
export const useMovie = (id) => {
    const queryClient = useQueryClient();
    const cachedQueries = queryClient.getQueriesData({
        queryKey: ["movies"],
    });
    const cachedMovie = cachedQueries[0]?.[1]?.results?.find((movie) => movie.id === Number(id));
    return useQuery({
        queryKey: ["movie", id],
        queryFn: async () => {
            const response = await fetch(handleURL(id, 1, true));
            if (!response.ok) {
                throw new Error("Network error: " + response.status);
            }
            return response.json();
        },
        initialData: cachedMovie,
        enabled: !cachedMovie,
    });
};
