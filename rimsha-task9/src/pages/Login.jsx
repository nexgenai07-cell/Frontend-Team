import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaGlobe, FaMountain, FaUmbrellaBeach, FaCity } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  // Track form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle between showing and hiding password
  const [showPassword, setShowPassword] = useState(false);

  // Show spinner on button while login is processing
  const [loading, setLoading] = useState(false);

  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Do nothing if either field is empty
    if (!email || !password) return;

    setLoading(true);

    // No real backend — simulate a 1.5 second API call with setTimeout
    // In production this would be a real auth API call
    setTimeout(() => {
      const userData = { name: "Explorer", email };
      login(userData);
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  // Skip login entirely — enter as a guest user
  const handleGuestLogin = () => {
    const guestData = {
      name: "Guest Explorer",
      email: "guest@wandersearch.com",
      isGuest: true,
    };
    login(guestData);
    navigate("/");
  };

  // Allow login on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* ===== LEFT PANEL — decorative travel visual (hidden on mobile) ===== */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-20 translate-y-20" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <FaGlobe className="text-white text-7xl mx-auto mb-8 drop-shadow-lg" />
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Explore the
              <br />
              World with Us
            </h2>
            <p className="text-blue-100 text-lg mb-12 leading-relaxed max-w-sm">
              Discover breathtaking destinations, save your favorites, and plan
              your next adventure.
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            {[
              { icon: FaMountain, text: "Explore mountain retreats" },
              { icon: FaUmbrellaBeach, text: "Discover hidden beaches" },
              { icon: FaCity, text: "Find city adventures" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20"
              >
                <Icon className="text-white text-lg shrink-0" />
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== RIGHT PANEL — login form ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-linear-to-br from-slate-50 to-blue-50">
        {/* Decorative blob behind the card */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl shadow-blue-100 p-8 w-full max-w-md relative"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <FaGlobe className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to continue your journey 🌍
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 text-sm bg-gray-50 focus:bg-white transition-all placeholder-gray-300"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Password
              </label>
              <span className="text-xs text-blue-600 cursor-pointer font-medium hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                // show actual text when showPassword is true, otherwise dots
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-500 text-sm bg-gray-50 focus:bg-white transition-all placeholder-gray-300"
              />
              {/* Eye icon toggles password visibility */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button — disabled when fields are empty or loading */}
          <button
            onClick={handleLogin}
            disabled={!email || !password || loading}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-2xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? (
              // Spinner + text while login is processing
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Signing you in...
              </span>
            ) : (
              "Sign In →"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Guest Login Button */}
          <button
            onClick={handleGuestLogin}
            className="w-full border-2 border-gray-100 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
          >
            <FaGlobe className="text-blue-500" />
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-gray-400 mt-6">
            New to WanderSearch?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Create a free account
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
