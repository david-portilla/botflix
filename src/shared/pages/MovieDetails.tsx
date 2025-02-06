import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import { Loading } from "../components/Loading";
import { formatDate } from "../utils/formatDate";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GradientOverlay, UserScoreRing } from "./MovieDetails.styles";

export const MovieDetails = () => {
	const { id: movieId } = useParams();
	const { data: movie, isLoading, error } = useMovie(movieId!);
	const navigate = useNavigate();

	if (isLoading) return <Loading />;
	if (error)
		return (
			<div role="alert" className="text-center p-4">
				Error: {error.message}
			</div>
		);

	if (!movie) return <div>No movie found</div>;

	const userScore = Math.round(movie.vote_average * 10);

	return (
		<>
			<Header />
			<section className=" bg-[#1a1a1a]">
				<div className="relative">
					<GradientOverlay />
					<img
						src={`${import.meta.env.VITE_IMAGE_POSTER}${movie.backdrop_path}`}
						alt=""
						className="w-full h-[100vh] object-cover opacity-40"
						aria-hidden="true"
					/>

					<div className="absolute inset-0 z-20">
						<div className="container mx-auto px-4 md:px-8 h-full">
							<button
								onClick={() => navigate(-1)}
								className="inline-flex items-center gap-2 px-4 py-2 mt-8 mb-4
                       bg-black/30 hover:bg-black/50 backdrop-blur-sm
                       text-white rounded-full transition-all duration-300
                       border border-white/10 hover:border-white/20
                       shadow-lg hover:shadow-xl"
								aria-label="Back to home"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="hidden sm:inline">Back to home</span>
							</button>
							<div className="flex flex-col md:flex-row gap-8 items-start pt-[2vh]">
								<div className="shrink-0 w-full md:w-[300px] relative z-10">
									<img
										src={`${import.meta.env.VITE_IMAGE_POSTER}${movie.poster_path}`}
										alt={`Movie poster of ${movie.title}`}
										className="w-full rounded-lg shadow-2xl ring-1 ring-white/10 hover:ring-white/30 transition-all"
									/>
								</div>

								<div className="flex-1 text-white">
									<div className="space-y-4">
										<h1 className="text-3xl md:text-5xl font-bold flex flex-wrap items-baseline gap-3">
											{movie.title}
											<span className="text-2xl md:text-3xl text-gray-400">
												({new Date(movie.release_date).getFullYear()})
											</span>
										</h1>

										<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300 text-sm md:text-base">
											<span>{formatDate(movie.release_date)}</span>
											<span className="hidden md:inline">•</span>
											<span>{movie.original_language.toUpperCase()}</span>
											{movie.adult && (
												<>
													<span className="hidden md:inline">•</span>
													<span className="px-2 py-1 bg-red-600 rounded-md text-xs">
														+18
													</span>
												</>
											)}
										</div>

										<div className="flex items-center gap-6">
											<div className="flex items-center gap-4">
												<div className="relative">
													<div className="w-[60px] h-[60px] rounded-full bg-[#081c22] flex items-center justify-center">
														<UserScoreRing
															$score={userScore}
															className="w-[54px] h-[54px] rounded-full flex items-center justify-center"
														>
															<span className="text-white font-bold text-sm">
																{userScore}%
															</span>
														</UserScoreRing>
													</div>
												</div>
												<div className="flex flex-col">
													<span className="font-semibold">Score</span>
													<span className="text-sm text-gray-400">
														from users
													</span>
												</div>
											</div>
										</div>

										<div className="mt-8 space-y-4">
											<h2 className="text-xl font-semibold">Overview</h2>
											<p className="text-gray-300 max-w-3xl leading-relaxed">
												{movie.overview}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};
