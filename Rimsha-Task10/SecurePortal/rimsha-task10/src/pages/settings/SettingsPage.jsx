// useState — 2FA code input ke liye
import { useState } from "react";

// useNavigate — pages ke beech navigate karne ke liye
import { useNavigate } from "react-router-dom";

// useSettings hook — settings logic ke liye
import useSettings from "../../hooks/settings/useSettings";

// React Icons
import {
  FiShield,
  FiUser,
  FiMail,
  FiLock,
  FiBell,
  FiAlertTriangle,
  FiCheckCircle,
  FiGrid,
  FiSearch,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiMonitor,
  FiSmartphone,
  FiEdit2,
} from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [twoFACode, setTwoFACode] = useState("");

  const {
    fullName,
    setFullName,
    email,
    profileLoading,
    handleUpdateProfile,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    passwordLoading,
    handleUpdatePassword,
    is2FAEnabled,
    handleEnable2FA,
    handleDisable2FA,
    handleVerifySetup,
    qrCode,
    secretKey,
    twoFALoading,
    twoFAError,
    securityAlerts,
    setSecurityAlerts,
    productUpdates,
    setProductUpdates,
    handleDeleteAccount,
    handleLogout,
    user,
  } = useSettings();

  const userName = user?.user_metadata?.full_name || user?.email || "User";

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex">
      {/* ========================================== */}
      {/* SIDEBAR */}
      {/* ========================================== */}
      <div className="hidden lg:flex flex-col w-56 bg-[#0D0D1A] border-r border-purple-900/50 py-6 px-3 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-8">
          <FiShield className="text-purple-400 text-xl" />
          <div>
            <p className="text-white font-bold text-sm">SecurePortal</p>
            <p className="text-purple-600 text-xs">Enterprise Security</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 flex-1">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiGrid className="text-base" />
            Dashboard
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiLock className="text-base" />
            Authentication
          </button>
          <button
            onClick={() => navigate("/otp-verification")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiShield className="text-base" />
            OTP & 2FA
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiMail className="text-base" />
            Emails
          </button>
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiSearch className="text-base" />
            Search
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
            <FiCreditCard className="text-base" />
            Payments
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold">
            <FiSettings className="text-base" />
            Settings
          </button>
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-purple-900/50 pt-4 px-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center shrink-0">
              <FiUser className="text-white text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                {userName}
              </p>
              <p className="text-purple-600 text-xs">Admin Level 4</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-purple-500 hover:text-red-400 text-xs transition-colors w-full"
          >
            <FiLogOut className="text-sm" />
            Logout
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CONTENT */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="px-4 md:px-8 py-4 border-b border-purple-900/50">
          <h1 className="text-white text-xl font-bold">Account Settings</h1>
          <p className="text-purple-500 text-xs mt-0.5">
            Manage your security preferences and profile information.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 md:px-8 py-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {/* ========================================== */}
            {/* PROFILE SECTION */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Info */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center shrink-0">
                      <FiUser className="text-white text-2xl" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-purple-600 p-1 rounded-full">
                      <FiEdit2 className="text-white text-xs" />
                    </button>
                  </div>

                  {/* Name + Email Fields */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-purple-500 text-xs uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-[#0D0D1A] border border-purple-900 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-purple-500 text-xs uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="bg-[#0D0D1A] border border-purple-900/50 text-purple-500 text-sm py-2 px-3 rounded-lg outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* 2FA Status Card */}
                <div
                  className={`border rounded-xl p-4 w-full md:w-48 shrink-0 ${
                    is2FAEnabled
                      ? "bg-green-900/20 border-green-700/50"
                      : "bg-yellow-900/20 border-yellow-700/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FiShield
                      className={
                        is2FAEnabled ? "text-green-400" : "text-yellow-400"
                      }
                    />
                    <p
                      className={`text-sm font-semibold ${is2FAEnabled ? "text-green-400" : "text-yellow-400"}`}
                    >
                      2FA Security
                    </p>
                    {is2FAEnabled && (
                      <span className="text-xs bg-green-700/50 text-green-300 px-2 py-0.5 rounded-full ml-auto">
                        PROTECTED
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${is2FAEnabled ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {is2FAEnabled
                      ? "Multi-factor authentication is currently enabled for your account."
                      : "Enable 2FA to protect your account."}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className={`text-xs ${is2FAEnabled ? "text-green-500" : "text-yellow-500"}`}
                    >
                      Status:
                    </span>
                    {/* Toggle */}
                    <button
                      onClick={
                        is2FAEnabled ? handleDisable2FA : handleEnable2FA
                      }
                      disabled={twoFALoading}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        is2FAEnabled ? "bg-green-500" : "bg-purple-900"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                          is2FAEnabled ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code — 2FA Setup */}
              {qrCode && (
                <div className="mt-4 p-4 bg-[#0D0D1A] rounded-xl border border-purple-900">
                  <p className="text-purple-300 text-sm text-center mb-3">
                    Scan this QR code with Google Authenticator
                  </p>
                  <div className="flex justify-center mb-3">
                    <div className="bg-white p-3 rounded-xl">
                      <img
                        src={qrCode}
                        alt="2FA QR Code"
                        className="w-32 h-32"
                      />
                    </div>
                  </div>
                  <p className="text-purple-600 text-xs text-center mb-3 font-mono">
                    {secretKey}
                  </p>
                  <div className="flex gap-2 max-w-xs mx-auto">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={twoFACode}
                      onChange={(e) =>
                        setTwoFACode(e.target.value.replace(/\D/g, ""))
                      }
                      className="bg-[#1A1A2E] border border-purple-900 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-purple-500 flex-1 text-center tracking-widest"
                    />
                    <button
                      onClick={() => handleVerifySetup(twoFACode)}
                      disabled={twoFALoading || twoFACode.length !== 6}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                  {twoFAError && (
                    <p className="text-red-400 text-xs text-center mt-2">
                      {twoFAError}
                    </p>
                  )}
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpdateProfile}
                  disabled={profileLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2 rounded-xl transition-colors"
                >
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>

            {/* ========================================== */}
            {/* SECURITY & SESSIONS */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-6"
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-5">
                <FiShield className="text-purple-400" />
                Security & Sessions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Change Password */}
                <div className="flex flex-col gap-3">
                  <p className="text-purple-400 text-xs uppercase tracking-wide">
                    Change Password
                  </p>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-[#0D0D1A] border border-purple-900 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-purple-500 transition-colors placeholder-purple-800"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-[#0D0D1A] border border-purple-900 text-white text-sm py-2 px-3 rounded-lg outline-none focus:border-purple-500 transition-colors placeholder-purple-800"
                  />
                  <button
                    onClick={handleUpdatePassword}
                    disabled={passwordLoading}
                    className="bg-[#0D0D1A] border border-purple-700 hover:border-purple-500 disabled:opacity-50 text-purple-300 text-sm py-2 px-4 rounded-lg transition-colors text-left"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="flex flex-col gap-3">
                  <p className="text-purple-400 text-xs uppercase tracking-wide">
                    Active Sessions
                  </p>

                  {/* Session 1 — Current */}
                  <div className="bg-[#0D0D1A] border border-purple-900/50 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiMonitor className="text-purple-400 shrink-0" />
                      <div>
                        <p className="text-white text-xs font-semibold">
                          MacOS + Chrome
                        </p>
                        <p className="text-purple-600 text-xs">
                          San Francisco, USA • Active now
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full shrink-0">
                      CURRENT
                    </span>
                  </div>

                  {/* Session 2 */}
                  <div className="bg-[#0D0D1A] border border-purple-900/50 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiSmartphone className="text-purple-400 shrink-0" />
                      <div>
                        <p className="text-white text-xs font-semibold">
                          iPhone 15 Pro + App
                        </p>
                        <p className="text-purple-600 text-xs">
                          London, UK • 3 hours ago
                        </p>
                      </div>
                    </div>
                    <button className="text-xs bg-red-900/40 text-red-400 hover:bg-red-900/60 px-2 py-0.5 rounded-full transition-colors shrink-0">
                      REVOKE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ========================================== */}
            {/* NOTIFICATIONS */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-6"
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-5">
                <FiBell className="text-purple-400" />
                Notifications
              </h2>

              <div className="flex flex-col gap-4">
                {/* Security Alerts Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Security Alerts
                    </p>
                    <p className="text-purple-500 text-xs">
                      Get notified of suspicious login attempts.
                    </p>
                  </div>
                  <button
                    onClick={() => setSecurityAlerts(!securityAlerts)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      securityAlerts ? "bg-purple-600" : "bg-purple-900"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                        securityAlerts ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Updates Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Product Updates
                    </p>
                    <p className="text-purple-500 text-xs">
                      Stay informed about new features.
                    </p>
                  </div>
                  <button
                    onClick={() => setProductUpdates(!productUpdates)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      productUpdates ? "bg-purple-600" : "bg-purple-900"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                        productUpdates ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ========================================== */}
            {/* DANGER ZONE */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-[#1A1A2E] border border-red-900/50 rounded-2xl p-6"
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-2">
                <FiAlertTriangle className="text-red-400" />
                Danger Zone
              </h2>
              <p className="text-purple-500 text-sm mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                Delete Account
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-900/50 px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-purple-700 text-xs">SecurePortal</span>
            <div className="flex items-center gap-4">
              <span className="text-purple-700 text-xs cursor-pointer">
                Terms
              </span>
              <span className="text-purple-700 text-xs cursor-pointer">
                Privacy
              </span>
            </div>
            <span className="text-purple-700 text-xs">
              © 2024 Enterprise Security Solutions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
