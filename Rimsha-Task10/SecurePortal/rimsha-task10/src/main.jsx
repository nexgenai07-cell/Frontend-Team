import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// ToastProvider import kar rahy hain
// Poori app ko toast dikhane ki ability milegi
import { ToastProvider } from "./context/ToastContext.jsx";

// Toast component import kar rahy hain
// Ye globally render hoga — har page pe toasts dikh sakenge
import Toast from "./components/common/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* ToastProvider — poori app wrap hogi */}
      <ToastProvider>
        <AuthProvider>
          <App />
          {/* Toast — globally render hoga */}
          {/* Har page pe toasts dikh sakenge */}
          <Toast />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
