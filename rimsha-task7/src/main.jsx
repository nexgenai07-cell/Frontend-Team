// Import React
import React from "react";

// Import ReactDOM
import ReactDOM from "react-dom/client";

// Import App
import App from "./App";

// Import Tailwind styles
import "./index.css";

// Render app inside browser
ReactDOM.createRoot(document.getElementById("root")).render(
  // Helps detect errors
  <React.StrictMode>
    {/* Main App */}
    <App />
  </React.StrictMode>,
);
