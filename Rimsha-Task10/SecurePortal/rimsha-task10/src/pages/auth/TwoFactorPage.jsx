// useState — code input ke liye
import { useState } from "react";

// Link — login pe jaane ke liye
import { Link } from "react-router-dom";

// use2FA hook — 2FA logic ke liye
import use2FA from "../../hooks/auth/use2FA";

// React Icons
import { FiShield, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const TwoFactorPage = () => {
  // 6 digit code input
  const [code, setCode] = useState("");

  // use2FA hook sy sab cheezein le rahy hain
  const {
    loading,
    error,
    isEnabled,
    qrCode,
    secretKey,
    setupComplete,
    handleEnable2FA,
    handleVerifySetup,
    handleDisable2FA,
  } = use2FA();

  // ==========================================
  // VERIFY SUBMIT HANDLER
  // ==========================================
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    await handleVerifySetup(code);
  };

  // ==========================================
  // SETUP COMPLETE STATE
  // ==========================================
  if (setupComplete) {
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
          <h2 className="text-white text-2xl font-bold mb-3">2FA Enabled!</h2>
          <p className="text-purple-300 text-sm mb-6">
            Two-factor authentication is now active on your account.
          </p>
          <Link
            to="/dashboard"
            className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
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
            Two-Factor Authentication
          </h1>
          <p className="text-purple-300 text-sm mt-1 text-center">
            {isEnabled
              ? "2FA is currently active on your account"
              : "Add an extra layer of security to your account"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded-lg mb-4 flex items-center gap-2">
            <FiAlertCircle />
            {error}
          </div>
        )}

        {/* ========================================== */}
        {/* STATE 1 — 2FA Disabled — Enable karo */}
        {/* ========================================== */}
        {!isEnabled && !qrCode && (
          <div className="flex flex-col gap-4">
            {/* Security info */}
            <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
              <p className="text-purple-300 text-sm">
                SecurePortal uses industry-standard TOTP protocols to ensure
                your enterprise identity remains impenetrable.
              </p>
            </div>

            {/* Features list */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-purple-300 text-sm">
                <FiCheckCircle className="text-green-400" />
                Works with Google Authenticator
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-sm">
                <FiCheckCircle className="text-green-400" />
                New code every 30 seconds
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-sm">
                <FiCheckCircle className="text-green-400" />
                Works without internet connection
              </div>
            </div>

            {/* Enable Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleEnable2FA}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              {loading ? "Setting up..." : "Enable 2FA"}
            </motion.button>
          </div>
        )}

        {/* ========================================== */}
        {/* STATE 2 — QR Code dikha — Scan karo */}
        {/* ========================================== */}
        {!isEnabled && qrCode && (
          <div className="flex flex-col gap-4">
            <p className="text-purple-300 text-sm text-center">
              Scan this QR code with Google Authenticator or any TOTP app
            </p>

            {/* QR Code Image */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-xl">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
            </div>

            {/* Secret Key — manually enter karne ke liye */}
            <div className="bg-[#0D0D1A] border border-purple-900 rounded-lg p-3 text-center">
              <p className="text-purple-500 text-xs mb-1">
                Can't scan? Enter this key manually:
              </p>
              <p className="text-purple-300 text-sm font-mono tracking-widest">
                {secretKey}
              </p>
            </div>

            {/* Code Verify Form */}
            <form onSubmit={handleVerifySubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-purple-300 text-sm text-center">
                  Enter the 6-digit code from your authenticator app
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="bg-[#0D0D1A] border border-purple-900 text-white text-center text-2xl font-bold tracking-widest py-3 rounded-lg outline-none focus:border-purple-500 transition-colors"
                />
                <p className="text-purple-600 text-xs text-center mt-1">
                  Code refreshes every 30 seconds
                </p>
              </div>

              {/* Verify Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || code.length !== 6}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? "Verifying..." : "Enable 2FA"}
              </motion.button>
            </form>

            {/* Skip link */}
            <Link
              to="/dashboard"
              className="text-purple-500 text-sm text-center hover:text-purple-300 transition-colors"
            >
              I'll do this later
            </Link>
          </div>
        )}

        {/* ========================================== */}
        {/* STATE 3 — 2FA Enabled — Disable option */}
        {/* ========================================== */}
        {isEnabled && (
          <div className="flex flex-col gap-4">
            {/* 2FA Active Badge */}
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 flex items-center gap-3">
              <FiCheckCircle className="text-green-400 text-xl" />
              <div>
                <p className="text-green-400 font-semibold text-sm">
                  2FA Active
                </p>
                <p className="text-green-600 text-xs">
                  Your account is protected
                </p>
              </div>
            </div>

            <p className="text-purple-300 text-sm text-center">
              Two-factor authentication is currently enabled on your account.
            </p>

            {/* Disable Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleDisable2FA}
              disabled={loading}
              className="bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "Disabling..." : "Disable 2FA"}
            </motion.button>
          </div>
        )}

        {/* Back to Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center justify-center text-purple-400 text-sm hover:text-purple-200 transition-colors mt-6"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default TwoFactorPage;

// ## 2FA — Complete Runtime Flow — File by File

// ---

// ### Jab `/2fa-setup` Page Khulta Hai

// ```
// Browser ne /2fa-setup URL hit kiya
//         ↓
// App.jsx ne TwoFactorPage.jsx render kiya
//         ↓
// TwoFactorPage.jsx ne use2FA() hook call kiya
//         ↓
// use2FA.js load hua — states initialize hue:
//   loading = false
//   error = null
//   isEnabled = false
//   qrCode = null
//         ↓
// use2FA.js ka useEffect chala
// get2FAStatus() call hua — auth.service.js gaya
//         ↓
// auth.service.js ne supabase.auth.mfa.listFactors() call kiya
//         ↓
// Supabase ne check kiya — koi verified factor hai?
//         ↓
// Nahi hai — isEnabled = false, factorId = null
//         ↓
// TwoFactorPage.jsx ne STATE 1 dikhai:
// "Enable 2FA" button
// ```

// ---

// ### Jab "Enable 2FA" Button Dabaya

// ```
// TwoFactorPage.jsx ne handleEnable2FA() call kiya
//         ↓
// use2FA.js — handleEnable2FA() chala:
//   loading = true
//         ↓
// enroll2FA() call hua — auth.service.js gaya
//         ↓
// auth.service.js ne supabase.auth.mfa.enroll() call kiya
//         ↓
// Supabase ne:
//   Secret key banayi
//   QR code image banayi
//   Factor ID diya
//         ↓
// Control wapas use2FA.js ko aaya — await khatam:
//   qrCode = QR code URL
//   secretKey = secret string
//   factorId = factor ID
//   loading = false
//         ↓
// TwoFactorPage.jsx ne STATE 2 dikhai:
//   QR code image
//   Secret key text
//   Code input box
// ```

// ---

// ### Jab User Ne QR Scan Kiya Aur Code Daala

// ```
// User ne Google Authenticator se QR scan kiya
// App mein SecurePortal add ho gaya
// 6 digit code dikha — input mein daala
// "Enable 2FA" button dabaya
//         ↓
// TwoFactorPage.jsx ne handleVerifySubmit() call kiya
//         ↓
// use2FA.js — handleVerifySetup(code) chala:
//   loading = true
//         ↓
// verify2FASetup(factorId, code) call hua — auth.service.js gaya
//         ↓
// auth.service.js ne:
//   supabase.auth.mfa.challenge() call kiya — permission li
//   supabase.auth.mfa.verify() call kiya — code verify kiya
//         ↓
// Supabase ne:
//   Secret Key + Current Time = Expected Code
//   Expected Code == daala hua code ✅
//         ↓
// Control wapas use2FA.js ko aaya:
//   isEnabled = true
//   setupComplete = true
//   qrCode = null
//   secretKey = null
//   loading = false
//         ↓
// TwoFactorPage.jsx ne setupComplete screen dikhai:
//   "2FA Enabled!" ✅
// ```

// ---

// ### Jab Page Dobara Khula — 2FA Already ON

// ```
// Browser ne /2fa-setup URL hit kiya
//         ↓
// App.jsx ne TwoFactorPage.jsx render kiya
//         ↓
// use2FA.js ka useEffect chala
// get2FAStatus() call hua — auth.service.js gaya
//         ↓
// Supabase ne check kiya — verified factor hai ✅
//         ↓
// isEnabled = true
// factorId = factor ID
//         ↓
// TwoFactorPage.jsx ne STATE 3 dikhai:
//   "2FA Active" green badge
//   "Disable 2FA" button
// ```

// ---

// ### Jab "Disable 2FA" Button Dabaya

// ```
// TwoFactorPage.jsx ne handleDisable2FA() call kiya
//         ↓
// use2FA.js — handleDisable2FA() chala:
//   loading = true
//         ↓
// disable2FA(factorId) call hua — auth.service.js gaya
//         ↓
// auth.service.js ne supabase.auth.mfa.unenroll() call kiya
//         ↓
// Supabase ne:
//   Secret key delete kar di
//   Factor remove kar diya
//   2FA OFF ho gaya
//         ↓
// Control wapas use2FA.js ko aaya:
//   isEnabled = false
//   factorId = null
//   setupComplete = false
//   loading = false
//         ↓
// TwoFactorPage.jsx ne STATE 1 wapas dikhai:
//   "Enable 2FA" button
// ```

// ---

// ### Jab Galat Code Daala

// ```
// User ne galat code daala
//         ↓
// verify2FASetup() call hua
//         ↓
// Supabase ne check kiya — match nahi kiya ❌
//         ↓
// Error throw kiya
//         ↓
// use2FA.js ke catch mein aaya:
//   error = 'Invalid code. Please try again.'
//   loading = false
//         ↓
// TwoFactorPage.jsx ne red error box dikha diya
// ```

// ---

// ### File Summary — Kaun Kya Karta Hai

// ```
// TwoFactorPage.jsx  — UI dikhata hai — states ke hisaab se
//         ↓
// use2FA.js          — React logic — loading, error, states
//         ↓
// auth.service.js    — Supabase ko call karta hai
//         ↓
// Supabase           — Secret key, QR code, verify, disable
// ```
