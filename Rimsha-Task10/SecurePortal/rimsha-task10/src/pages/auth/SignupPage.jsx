// useState — form fields aur UI states ke liye
import { useState } from "react";

// Link — Login page pe jaane ke liye
import { Link } from "react-router-dom";

// useSignup hook — signup logic ke liye
import useSignup from "../../hooks/auth/useSignup";

// passwordUtils — strength check aur password generate ke liye
import {
  checkPasswordStrength,
  generateStrongPassword,
} from "../../utils/passwordUtils";

// React Icons
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const SignupPage = () => {
  // Form fields ki states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password show/hide states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Terms & Conditions checkbox state
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // useSignup hook sy signup function, loading, errors, success le rahy hain
  const { signup, loading, errors, success } = useSignup();

  // Password ki current strength — real time check
  // Har baar password change hone pe ye update hoga
  const passwordStrength = checkPasswordStrength(password);

  // ==========================================
  // SUGGEST PASSWORD HANDLER
  // ==========================================
  const handleSuggestPassword = () => {
    const strong = generateStrongPassword();
    setPassword(strong);
    setConfirmPassword(strong);
    // Password visible karo takey user dekh sake
    setShowPassword(true);
  };

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    await signup(name, email, password, confirmPassword);
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
          <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <FiShield className="text-green-400 text-4xl" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">
            Account Created!
          </h2>
          <p className="text-purple-300 text-sm mb-6">
            Please check your email to verify your account before logging in.
          </p>
          <Link
            to="/login"
            className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center px-4 py-10">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Main signup card */}
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
          <h1 className="text-white text-2xl font-bold">SecurePortal</h1>
          <p className="text-purple-300 text-sm mt-1">
            Join the secure perimeter of SecurePortal today.
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded-lg mb-4">
            {errors.general}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">Full Name</label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${errors.name ? "border-red-600" : "border-purple-900"}`}
            >
              <FiUser className="text-purple-400" />
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
            {/* Error message */}
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
            {/* Hint — hamesha dikhega */}
            <p className="text-purple-600 text-xs mt-1">
              Full name — at least 2 characters
            </p>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-purple-300 text-sm">Email Address</label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${errors.email ? "border-red-600" : "border-purple-900"}`}
            >
              <FiMail className="text-purple-400" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
            {/* Hint */}
            <p className="text-purple-600 text-xs mt-1">
              Enter a valid email address (e.g. name@company.com)
            </p>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-purple-300 text-sm">Password</label>
              <button
                type="button"
                onClick={handleSuggestPassword}
                className="flex items-center gap-1 text-purple-400 text-xs hover:text-purple-200 transition-colors"
              >
                <FiRefreshCw className="text-xs" />
                Suggest strong password
              </button>
            </div>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${errors.password ? "border-red-600" : "border-purple-900"}`}
            >
              <FiLock className="text-purple-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-purple-400 hover:text-purple-200 transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}

            {/* Password Strength Meter */}
            {password && (
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
            <label className="text-purple-300 text-sm">Confirm Password</label>
            <div
              className={`flex items-center bg-[#0D0D1A] border rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors ${errors.confirmPassword ? "border-red-600" : "border-purple-900"}`}
            >
              <FiLock className="text-purple-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#0D0D1A_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-purple-400 hover:text-purple-200 transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {/* Hint */}
            <p className="text-purple-600 text-xs mt-1">
              Must match the password above
            </p>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="accent-purple-600 mt-0.5"
            />
            <span className="text-purple-300 text-sm">
              I agree to the{" "}
              <span className="text-purple-400 hover:text-purple-200 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-400 hover:text-purple-200 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Signup Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !agreedToTerms}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Creating Account..." : "Create Secure Account →"}
          </motion.button>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-purple-600 text-xs">🔒 ISO 27001</span>
            <span className="text-purple-600 text-xs">
              🛡️ End-to-End Encrypted
            </span>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-purple-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-200 transition-colors font-semibold"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
