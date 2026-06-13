// useState — email aur otp input ke liye
import { useState, useRef } from "react";

// Link — login pe jaane ke liye
import { Link } from "react-router-dom";

// useOTP hook — OTP logic ke liye
import useOTP from "../../hooks/auth/useOTP";

// React Icons
import { FiMail, FiShield, FiCheckCircle } from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const OTPPage = () => {
  // Email input ki value
  const [email, setEmail] = useState("");

  // 6 digit OTP — array mein har box ki value alag
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Har input box ka ref — auto focus ke liye
  // Ek box mein likhne ke baad automatically agla box focus hoga
  const inputRefs = useRef([]);

  // useOTP hook sy sab cheezein le rahy hain
  const {
    loading,
    error,
    otpSent,
    success,
    timer,
    timerActive,
    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
  } = useOTP();

  // ==========================================
  // OTP INPUT HANDLER
  // ==========================================
  // Har box mein sirf ek digit — agla box automatically focus

  const handleOTPChange = (index, value) => {
    // Sirf numbers allow karo
    if (!/^\d*$/.test(value)) return;

    // OTP array update karo
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Agar kuch likha — agla box focus karo
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // ==========================================
  // BACKSPACE HANDLER
  // ==========================================
  // Backspace dabane pe pichla box focus ho

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ==========================================
  // SEND OTP SUBMIT
  // ==========================================
  const handleSendSubmit = async (e) => {
    e.preventDefault();
    await handleSendOTP(email);
  };

  // ==========================================
  // VERIFY OTP SUBMIT
  // ==========================================
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    // Array ko string mein convert karo — "123456"
    const otpString = otp.join("");
    await handleVerifyOTP(email, otpString);
  };

  // ==========================================
  // TIMER FORMAT
  // ==========================================
  // 120 seconds ko 02:00 format mein dikhao

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
            <FiCheckCircle className="text-green-400 text-4xl" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Verified!</h2>
          <p className="text-purple-300 text-sm mb-2">
            OTP verified successfully. Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center px-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl" />
      </div>

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
          <h1 className="text-white text-2xl font-bold">
            {otpSent ? "Enter Verification Code" : "OTP Verification"}
          </h1>
          <p className="text-purple-300 text-sm mt-1 text-center">
            {otpSent
              ? `We sent a 6-digit code to ${email}`
              : "Enter your email to receive a verification code"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* STEP 1 — Email Input */}
        {!otpSent && (
          <form onSubmit={handleSendSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-purple-300 text-sm">Email Address</label>
              <div className="flex items-center bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors">
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
              <p className="text-purple-600 text-xs mt-1">
                Enter your registered email address
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              {loading ? "Sending..." : "Send OTP"}
            </motion.button>
          </form>
        )}

        {/* STEP 2 — OTP Input */}
        {otpSent && (
          <form onSubmit={handleVerifySubmit} className="flex flex-col gap-6">
            {/* 6 separate OTP boxes */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-white text-xl font-bold bg-[#0D0D1A] border border-purple-900 rounded-lg outline-none focus:border-purple-500 transition-colors"
                />
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="text-center">
              {timerActive ? (
                <p className="text-purple-400 text-sm">
                  Resend in{" "}
                  <span className="text-purple-300 font-semibold">
                    {formatTimer(timer)}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResendOTP(email)}
                  disabled={loading}
                  className="text-purple-400 hover:text-purple-200 text-sm transition-colors disabled:opacity-50"
                >
                  Didn't receive a code? Resend OTP
                </button>
              )}
            </div>

            {/* Verify Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="bg-linear-to-r from-purple-600 to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </motion.button>
          </form>
        )}

        {/* Back to Login */}
        <Link
          to="/login"
          className="flex items-center justify-center text-purple-400 text-sm hover:text-purple-200 transition-colors mt-6"
        >
          Back to Login
        </Link>

        {/* Footer */}
        <p className="text-purple-800 text-xs text-center mt-4">
          SecurePortal © 2024
        </p>
      </motion.div>
    </div>
  );
};

export default OTPPage;

// OTP Verification — Concept

// Kya Hota Hai OTP Mein
// User signup ke baad ya login ke baad — ek 6 digit code email pe aata hai — user wo code daalta hai — verify hota hai.

// Real Backend Flow
// User ne login kiya
//         ↓
// Backend ne 6 digit random code banaya
// Code database mein save kiya — expiry time ke saath
// Email service se code bheji
//         ↓
// User ne code daala
//         ↓
// Frontend ne Backend ko bheja
// POST /api/auth/verify-otp { code }
//         ↓
// Backend ne check kiya —
// Code sahi hai? Expire toh nahi hua?
//         ↓
// Sahi — user verified mark kiya
// Galat — error diya

// Supabase Flow
// User ne signup/login kiya
//         ↓
// Supabase ne khud OTP generate kiya
// Email pe bheja
//         ↓
// User ne code daala
//         ↓
// supabase.auth.verifyOtp({ email, token, type })
//         ↓
// Supabase ne:
// Code verify kiya
// Expiry check kiya
// Session bana di
//         ↓
// Dashboard pe bhejo
// .........................................................................
// ## OTP — Supabase Flow — Poora

// ---

// ### Step 1 — Email Daal ke Send OTP

// ```
// User ne email daali
//         ↓
// Send OTP button dabaya
//         ↓
// useOTP.js — handleSendOTP() call hua
//         ↓
// auth.service.js — sendOTP() call hua
//         ↓
// supabase.auth.signInWithOtp({ email }) call hua
//         ↓
// Supabase ne:
// ✅ 6 digit random code generate kiya
// ✅ Code apne database mein save kiya — expiry ke saath
// ✅ User ki email pe code bheja
//         ↓
// Control wapas useOTP.js ko aaya
// setOtpSent(true) — OTP boxes dikhao
// setTimer(120) — countdown shuru
// ```

// ---

// ### Step 2 — OTP Daalna aur Verify

// ```
// User ne email mein code dekha
//         ↓
// 6 boxes mein code daala
//         ↓
// Verify Code button dabaya
//         ↓
// useOTP.js — handleVerifyOTP() call hua
//         ↓
// auth.service.js — verifyOTP() call hua
//         ↓
// supabase.auth.verifyOtp({ email, token, type: 'email' }) call hua
//         ↓
// Supabase ne:
// ✅ Code check kiya — sahi hai?
// ✅ Expiry check kiya — 2 minute ke andar hai?
// ✅ Sahi hai — session bana di — JWT token diya
//         ↓
// Control wapas useOTP.js ko aaya
// setSuccess(true)
// 1.5 second baad /dashboard pe navigate
// ```

// ---

// ### Step 3 — Resend OTP

// ```
// Timer 0 pe pahunch gaya
//         ↓
// "Resend OTP" button active ho gaya
//         ↓
// User ne Resend dabaya
//         ↓
// useOTP.js — handleResendOTP() call hua
//         ↓
// auth.service.js — sendOTP() dobara call hua
//         ↓
// Supabase ne naya code generate kiya — email bheji
//         ↓
// Timer reset — 120 seconds se dobara shuru
// ```

// ---

// ### Step 4 — Galat OTP

// ```
// User ne galat code daala
//         ↓
// verifyOTP() call hua
//         ↓
// Supabase ne check kiya — galat hai
//         ↓
// Error throw kiya
//         ↓
// useOTP.js ke catch mein aaya
// setError('Invalid or expired OTP. Please try again.')
//         ↓
// OTPPage.jsx ne red box mein error dikhai
// ```

// ---

// ### Summary — Supabase Ne Kya Kiya

// ```
// ✅ OTP generate kiya
// ✅ Database mein save kiya
// ✅ Email bheji
// ✅ Expiry track kiya
// ✅ Verify kiya
// ✅ Session bana di
// ```

// ### Tu Ne Kya Kiya

// ```
// ✅ Email input UI
// ✅ 6 boxes OTP input
// ✅ Countdown timer
// ✅ Resend button
// ✅ Error handling
// ✅ Success screen
