import { Loader } from "./Loading.styles";

export const Loading = () => {
	return (
		<Loader>
			<div className="flex items-center justify-center loading show">
				<p className="w-26 mt-12 text-sm text-white absolute text-center">
					{" "}
					Loading movies{" "}
				</p>
				<div className="ball"></div>
				<div className="ball"></div>
				<div className="ball"></div>
			</div>
		</Loader>
	);
};
