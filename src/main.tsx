import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./app/providers/GlobalProvider.tsx";
import { App } from "./app/App.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</StrictMode>
);
