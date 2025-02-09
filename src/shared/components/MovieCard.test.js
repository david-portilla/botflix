// src/shared/components/MovieCard.test.tsx
import "@testing-library/jest-dom";
const mockMovie = {
    id: 1,
    title: "Inception",
    poster_path: "/inception.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
    overview: "A movie about a dream",
    original_language: "en",
    adult: false,
    backdrop_path: "/inception.jpg",
    genre_ids: [1, 2, 3],
    original_title: "Inception",
    popularity: 100,
    video: false,
    vote_count: 1000,
};
describe("MovieCard Component", () => {
    test("should use the correct VITE_IMAGE_COVER", () => {
        expect(importMeta.env.VITE_IMAGE_COVER).toBe("https://image.tmdb.org/t/p/w500");
    });
});
