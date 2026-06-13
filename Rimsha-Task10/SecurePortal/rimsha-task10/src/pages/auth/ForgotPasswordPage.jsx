// useState — email input ke liye
import { useState } from "react";

// Link — Login page pe jaane ke liye
import { Link } from "react-router-dom";

// useForgotPassword hook — forgot password logic ke liye
import useForgotPassword from "../../hooks/auth/useForgotPassword";

// React Icons
import { FiMail, FiShield, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  // Email input ki value
  const [email, setEmail] = useState("");

  // useForgotPassword hook sy sendResetEmail, loading, error, success le rahy hain
  const { sendResetEmail, loading, error, success } = useForgotPassword();

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    // Page reload hone sy rokna
    e.preventDefault();

    // useForgotPassword ka sendResetEmail function call karo
    await sendResetEmail(email);
  };

  // ==========================================
  // SUCCESS STATE
  // ==========================================
  // Email bhej di — success message dikhao

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#1A1A2E] border border-purple-900 rounded-2xl p-8 text-center"
        >
          {/* Success icon */}
          <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-400 text-4xl" />
          </div>

          <h2 className="text-white text-2xl font-bold mb-3">
            Check Your Email
          </h2>

          <p className="text-purple-300 text-sm mb-2">
            We've sent a password reset link to:
          </p>

          {/* User ki email dikhao */}
          <p className="text-purple-400 font-semibold text-sm mb-6">{email}</p>

          <p className="text-purple-500 text-xs mb-8">
            Click the link in the email to reset your password. If you don't see
            it, check your spam folder.
          </p>

          {/* Login page pe jao */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    // Full screen container — dark background
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center px-4">
      {/* Animated background orbs — decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#1A1A2E] border border-purple-900 rounded-2xl p-8 shadow-2xl shadow-purple-900/20"
      >
        {/* Logo aur Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-700 p-3 rounded-xl mb-4">
            <FiShield className="text-white text-3xl" />
          </div>
          <h1 className="text-white text-2xl font-bold">Reset Your Password</h1>
          <p className="text-purple-300 text-sm mt-1 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">Email Address</label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${error ? "border-red-600" : "border-purple-900"}`}
            >
              <FiMail className="text-purple-400" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800"
              />
            </div>
            {/* Error message */}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            {/* Hint */}
            <p className="text-purple-600 text-xs mt-1">
              Enter the email address associated with your account
            </p>
          </div>

          {/* Send Reset Link Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-purple-400 text-sm hover:text-purple-200 transition-colors mt-6"
        >
          <FiArrowLeft />
          Back to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
