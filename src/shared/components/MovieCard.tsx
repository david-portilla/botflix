import { Link } from "react-router-dom";
import { Movie } from "../types/movieTypes";
import { MovieArticle, RatingBadge } from "./MovieCard.styles";
import { formatDate } from "../utils/formatDate";

export const MovieCard = ({ movie }: { movie: Movie }) => {
	return (
		<MovieArticle key={movie.id}>
			<Link
				to={`/movie/${movie.id}`}
				className="block h-full"
				aria-label={`View details for ${movie.title}`}
			>
				<div className="relative aspect-[2/3] bg-gray-900">
					<img
						src={
							movie.poster_path
								? `${import.meta.env.VITE_IMAGE_COVER}${movie.poster_path}`
								: "https://picsum.photos/200/300"
						}
						alt={`${movie.title} poster`}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
					<RatingBadge
						$score={movie.vote_average * 10}
						className="absolute -bottom-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
					>
						{Math.round(movie.vote_average * 10)}%
					</RatingBadge>
				</div>
				<div className="p-4 pt-6">
					<h2 className="font-semibold text-white mb-1 line-clamp-1">
						{movie.title}
					</h2>
					<p className="text-sm text-gray-400">
						{formatDate(movie.release_date)}
					</p>
				</div>
			</Link>
		</MovieArticle>
	);
};
