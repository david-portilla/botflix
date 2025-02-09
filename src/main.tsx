import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./app/providers/GlobalProvider";
import { App } from "./app/App";
import "./main.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</StrictMode>
);
