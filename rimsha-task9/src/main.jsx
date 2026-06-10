import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import Toast from "./components/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      {/* Toast yahan isliye rakha — poore app mein dikhega */}
      <Toast />
      <App />
    </AppProvider>
  </StrictMode>,
);
