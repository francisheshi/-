import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SearchProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </SearchProvider>
  </React.StrictMode>
);

reportWebVitals();
