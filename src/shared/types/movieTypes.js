export const MoviesQueryKeys = {
    movies: {
        list: (url) => ["movies", url],
        details: (id) => ["movie", id],
        all: ["movies"],
    },
};
