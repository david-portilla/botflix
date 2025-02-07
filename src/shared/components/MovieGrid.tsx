import { Movie, MovieGridProps } from "../types/movieTypes";
import { useMovies } from "../hooks/useMovies";
import { handleURL } from "../utils/handleUrl";
import { Loading } from "./Loading";
import { MainContainer } from "./MovieGrid.styles";
import { MovieCard } from "./MovieCard";

export const MovieGrid = ({ term }: MovieGridProps) => {
	const { data, error, isLoading } = useMovies(
		term.id === 0
			? handleURL(term.label) // Search by text
			: handleURL(term.id.toString()) // Search by genre ID
	);

	if (isLoading) return <Loading />;
	if (error)
		return (
			<div role="alert" className="text-center p-4">
				Error: {error.message}
			</div>
		);

	return (
		<MainContainer className="bg-[#1a1a1a] min-h-screen">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{data && (
					<>
						<header className="mb-8">
							{term.label.trim().length === 0 ? (
								<h1 className="text-3xl font-bold text-white">
									Popular Movies
								</h1>
							) : !term.id ? (
								data.results.length > 0 && (
									<h1 className="text-3xl font-bold text-white">
										Search results for:{" "}
										<span className="text-red-500">{term.label}</span>
									</h1>
								)
							) : (
								<h1 className="text-3xl font-bold text-white">
									Showing movies by mood:{" "}
									<span className="text-red-500">{term.label}</span>
								</h1>
							)}
						</header>

						{data.results.length === 0 ? (
							<p className="text-xl text-center text-gray-400 mt-12">
								No results found for:{" "}
								<span className="font-semibold text-red-500">{term.label}</span>
							</p>
						) : (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
								{data.results.map((movie: Movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
							</div>
						)}
					</>
				)}
			</div>
		</MainContainer>
	);
};
