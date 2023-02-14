import React from "react";
import ReactDOM from "react-dom/client";
/* import App from "./App";
import "./index.css"; */ 
import { BrowserRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import App from "./react-hooks/App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
