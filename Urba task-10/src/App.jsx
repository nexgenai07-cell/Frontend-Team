import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import OTPVerification from "./Pages/OTPVerification";
import TwoFAVerification from "./Pages/TwoFAVerification";
import SearchPage from "./Pages/SearchPage";
import PricingPage from "./Pages/PricingPage";
import PaymentSuccess from "./Pages/PaymentSuccess";
import ContactPage from "./Pages/ContactPage";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/verify-2fa" element={<TwoFAVerification />} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;