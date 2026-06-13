import { Routes, Route } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OTPPage from "./pages/auth/OTPPage";
import TwoFactorPage from "./pages/auth/TwoFactorPage";

// Search Page
import SearchPage from "./pages/search/SearchPage";

// Payment Pages
import PricingPage from "./pages/payment/PricingPage";
import CheckoutPage from "./pages/payment/CheckoutPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import PaymentFailurePage from "./pages/payment/PaymentFailurePage";

// Dashboard + Settings
import DashboardPage from "./pages/dashboard/DashboardPage";
import SettingsPage from "./pages/settings/SettingsPage";

// Contact Form
import ContactForm from "./components/email/ContactForm";

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ========================================== */}
      {/* PUBLIC ROUTES — koi bhi dekh sakta hai */}
      {/* ========================================== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/otp-verification" element={<OTPPage />} />
      <Route path="/2fa-setup" element={<TwoFactorPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/payment-failure" element={<PaymentFailurePage />} />

      {/* ========================================== */}
      {/* PROTECTED ROUTES — sirf logged in user */}
      {/* ========================================== */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* Checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
              <div className="bg-[#0D0D1A] border-b border-purple-900/50 px-4 md:px-6 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                  <span className="text-white font-bold text-lg">
                    SecurePortal
                  </span>
                  <nav className="hidden md:flex items-center gap-6">
                    <a
                      href="/dashboard"
                      className="text-purple-400 hover:text-white text-sm transition-colors"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/search"
                      className="text-purple-400 hover:text-white text-sm transition-colors"
                    >
                      Search
                    </a>
                    <a
                      href="/pricing"
                      className="text-purple-400 hover:text-white text-sm transition-colors"
                    >
                      Payments
                    </a>
                    <a
                      href="/settings"
                      className="text-purple-400 hover:text-white text-sm transition-colors"
                    >
                      Settings
                    </a>
                  </nav>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                  <ContactForm />
                </div>
              </div>
            </div>
          }
        />
      </Route>

      {/* Default — login pe bhejo */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
