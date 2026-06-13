// useState — email, password, aur show/hide password ke liye
import { useState } from "react";

// Link — Signup page pe jaane ke liye
import { Link } from "react-router-dom";

// useLogin hook — login logic ke liye
import useLogin from "../../hooks/auth/useLogin";

// React Icons — eye icon password show/hide ke liye
import { FiEye, FiEyeOff, FiMail, FiLock, FiShield } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const LoginPage = () => {
  // Email input ki value
  const [email, setEmail] = useState("");

  // Password input ki value
  const [password, setPassword] = useState("");

  // Password dikhana hai ya chhupana hai
  const [showPassword, setShowPassword] = useState(false);

  // useLogin hook sy login function, loading aur error le rahy hain
  const { login, loading, error } = useLogin();

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    // Page reload hone sy rokna
    e.preventDefault();

    // useLogin ka login function call karo
    // email aur password bhejo
    await login(email, password);
  };

  return (
    // Full screen container — dark background
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center px-4">
      {/* Animated background orbs — decorative */}

      {/* Main login card — glassmorphism effect */}
      <motion.div
        // Upar sy fade in animation
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#1A1A2E] border border-purple-900 rounded-2xl p-4 shadow-2xl shadow-purple-900/20 my-10"
      >
        {/* Logo aur Title */}
        <div className="flex flex-col items-center mb-4">
          <div className="bg-purple-700 p-3 rounded-xl mb-4">
            <FiShield className="text-white text-3xl" />
          </div>
          <h1 className="text-white text-2xl font-bold">SecurePortal</h1>
          <p className="text-purple-300 text-sm mt-1">
            Access your enterprise command center
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">Work Email</label>
            <div className="flex items-center bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors">
              <FiMail className="text-purple-400" />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password"
                required
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">Password</label>
            <div className="flex items-center bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors">
              <FiLock className="text-purple-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
              {/* Eye icon — click karo toh password show/hide */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-purple-400 hover:text-purple-200 transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Remember Me aur Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-purple-300 text-sm cursor-pointer">
              <input type="checkbox" className="accent-purple-600" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-purple-400 text-sm hover:text-purple-200 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message — sirf tab dikhega jab error ho */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Button */}
          <motion.button
            // Click pe thoda press effect
            whileTap={{ scale: 0.98 }}
            type="submit"
            // Loading hai toh button disable karo
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {/* Loading hai toh alag text dikhao */}
            {loading ? "Logging in..." : "Login to Portal →"}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-purple-900" />
            <span className="text-purple-600 text-xs">OR CONNECT WITH</span>
            <div className="flex-1 h-px bg-purple-900" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0D0D1A] border border-purple-900 text-purple-300 text-sm py-2.5 rounded-lg hover:border-purple-600 transition-colors"
            >
              <FaGoogle className="text-red-400" />
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0D0D1A] border border-purple-900 text-purple-300 text-sm py-2.5 rounded-lg hover:border-purple-600 transition-colors"
            >
              <FaGithub className="text-white" />
              GitHub
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <p className="text-purple-500 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-200 transition-colors font-semibold"
          >
            Sign up now
          </Link>
        </p>

        {/* Footer */}
        <p className="text-purple-800 text-xs text-center mt-6">
          © 2024 SecurePortal Inc. · Privacy Policy · System Status
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
