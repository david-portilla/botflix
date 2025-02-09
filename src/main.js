import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./app/providers/GlobalProvider";
import { App } from "./app/App";
import "./main.css";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(GlobalProvider, { children: _jsx(App, {}) }) }));
