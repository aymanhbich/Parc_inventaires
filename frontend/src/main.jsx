import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <MantineProvider>
        <App />
    </MantineProvider>
    // </React.StrictMode>,
);
