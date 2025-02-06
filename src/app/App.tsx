import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Homepage } from "../shared/pages/Homepage";
import { MovieDetails } from "../shared/pages/MovieDetails";

export const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<main className="flex flex-col">
				<Router>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/movie/:id" element={<MovieDetails />} />
					</Routes>
				</Router>
			</main>
		</QueryClientProvider>
	);
};
