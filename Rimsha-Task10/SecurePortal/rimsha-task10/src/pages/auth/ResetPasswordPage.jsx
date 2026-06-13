// useState — password fields ke liye
import { useState } from "react";

// Link — login pe jaane ke liye
import { Link } from "react-router-dom";

// useResetPassword hook — reset logic ke liye
import useResetPassword from "../../hooks/auth/useResetPassword";

// passwordUtils — strength check ke liye
import { checkPasswordStrength } from "../../utils/passwordUtils";

// React Icons
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const ResetPasswordPage = () => {
  // Password fields ki states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password show/hide states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // useResetPassword hook sy handleResetPassword, loading, error, success le rahy hain
  const { handleResetPassword, loading, error, success } = useResetPassword();

  // Password ki current strength — real time check
  const passwordStrength = checkPasswordStrength(newPassword);

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    // Page reload hone sy rokna
    e.preventDefault();

    // useResetPassword ka handleResetPassword function call karo
    await handleResetPassword(newPassword, confirmPassword);
  };

  // ==========================================
  // SUCCESS STATE
  // ==========================================
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
            Password Updated!
          </h2>

          <p className="text-purple-300 text-sm mb-2">
            Your password has been successfully reset.
          </p>

          <p className="text-purple-500 text-xs mb-8">
            Redirecting to login page...
          </p>

          {/* Login page pe jao */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Go to Login
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
          <h1 className="text-white text-2xl font-bold">Reset Password</h1>
          <p className="text-purple-300 text-sm mt-1 text-center">
            Choose a strong, unique password to secure your account.
          </p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">New Password</label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${error ? "border-red-600" : "border-purple-900"}`}
            >
              <FiLock className="text-purple-400" />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter 8+ characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-purple-400 hover:text-purple-200 transition-colors"
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div className="mt-2">
                <div className="w-full bg-purple-900/30 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                  />
                </div>
                <p
                  className={`text-xs mt-1 ${
                    passwordStrength.label === "Very Weak"
                      ? "text-red-400"
                      : passwordStrength.label === "Weak"
                        ? "text-orange-400"
                        : passwordStrength.label === "Fair"
                          ? "text-yellow-400"
                          : passwordStrength.label === "Strong"
                            ? "text-blue-400"
                            : "text-green-400"
                  }`}
                >
                  Strength: {passwordStrength.label}
                </p>
              </div>
            )}

            {/* Hint */}
            <p className="text-purple-600 text-xs mt-1">
              Min 8 characters · Uppercase · Number · Special character (!@#$%)
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">
              Confirm New Password
            </label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${error ? "border-red-600" : "border-purple-900"}`}
            >
              <FiLock className="text-purple-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-purple-400 hover:text-purple-200 transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

            {/* Hint */}
            <p className="text-purple-600 text-xs mt-1">
              Must match the password above
            </p>
          </div>

          {/* Warning message */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 text-yellow-400 text-xs px-4 py-2 rounded-lg">
            After updating, you will be required to log in again on all active
            sessions.
          </div>

          {/* Reset Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>

        {/* Back to Login */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-purple-400 text-sm hover:text-purple-200 transition-colors mt-6"
        >
          Return to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
