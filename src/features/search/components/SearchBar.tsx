import { useGlobal } from "../../../app/hooks/useGlobal";
import {
	SearchForm,
	SearchIcon,
	SearchInput,
	SearchMessage,
	SearchSection,
} from "./SearchBar.styles";

export const SearchBar = () => {
	const { setFeelingName, displayChatInput, setChatInput } = useGlobal();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setChatInput(value);

		if (!value.trim()) {
			setFeelingName(0, "");
			return;
		}
		// For direct search, we use 0 as ID to indicate it's a text search
		setFeelingName(0, value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<SearchSection>
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center gap-4">
					<label htmlFor="movie-search" className="sr-only">
						Search for movies
					</label>

					<SearchForm
						onSubmit={handleSubmit}
						role="search"
						aria-label="Search for movies"
					>
						<SearchInput
							id="movie-search"
							type="search"
							placeholder="Search for movies..."
							value={displayChatInput}
							onChange={handleChange}
							aria-label="Search movies"
							autoComplete="off"
							spellCheck="false"
							minLength={3}
							required
							aria-required="true"
						/>
						<SearchIcon
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
							role="img"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</SearchIcon>
					</SearchForm>

					{displayChatInput.trim().length === 0 ? (
						<SearchMessage role="status" aria-live="polite">
							Type to search for your favorite movies
						</SearchMessage>
					) : displayChatInput.trim().length < 3 ? (
						<SearchMessage role="status" aria-live="polite">
							Please enter at least 3 characters
						</SearchMessage>
					) : null}
				</div>
			</div>
		</SearchSection>
	);
};
