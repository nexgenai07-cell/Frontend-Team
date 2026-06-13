// src/pages/dashboard/DashboardPage.jsx

// useNavigate — pages ke beech navigate karne ke liye
import { useNavigate } from "react-router-dom";

// useAuth — logged in user ka data lene ke liye
import { useAuth } from "../../context/AuthContext";

// useDashboard — stats lene ke liye
import useDashboard from "../../hooks/dashboard/useDashboard";

// auth.service.js — logout ke liye
import { logoutUser } from "../../services/auth.service";

// useToast — notifications ke liye
import { useToast } from "../../context/ToastContext";

// React Icons
import {
  FiShield,
  FiMail,
  FiSearch,
  FiCreditCard,
  FiLock,
  FiSettings,
  FiBell,
  FiLogOut,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiUser,
  FiGrid,
  FiRefreshCw,
} from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

// ==========================================
// STAT CARD COMPONENT
// ==========================================
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-5 flex flex-col gap-3"
  >
    <div className="flex items-center justify-between">
      <p className="text-purple-400 text-sm">{title}</p>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="text-white text-base" />
      </div>
    </div>
    <p className="text-white text-3xl font-bold">{value}</p>
    {subtitle && <p className="text-purple-600 text-xs">{subtitle}</p>}
  </motion.div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, loading } = useDashboard();
  const { showToast } = useToast();

  // ==========================================
  // LOGOUT HANDLER
  // ==========================================
  const handleLogout = async () => {
    try {
      await logoutUser();
      showToast("Logged out successfully!", "success");
      navigate("/login");
    } catch (err) {
      showToast("Logout failed.", "error");
    }
  };

  // User ka naam — metadata se ya email se
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
          {/* Dashboard — active */}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold">
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

          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/30 text-sm transition-colors"
          >
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
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-purple-900/50">
          <div>
            <h1 className="text-white text-xl font-bold">
              Security Command Center
            </h1>
            <p className="text-purple-500 text-xs mt-0.5">
              Real-time monitoring of global authentication patterns and
              enterprise asset protection.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Tabs — desktop */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-white text-sm font-semibold border-b-2 border-purple-500 pb-1">
                Overview
              </button>
              <button className="text-purple-400 hover:text-white text-sm transition-colors">
                Analytics
              </button>
              <button className="text-purple-400 hover:text-white text-sm transition-colors">
                Security Logs
              </button>
            </div>
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiBell className="text-lg" />
            </button>
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiSettings className="text-lg" />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* CONTENT AREA */}
        {/* ========================================== */}
        <div className="flex-1 px-4 md:px-8 py-6 overflow-y-auto">
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FiRefreshCw className="text-purple-400 text-3xl animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* ========================================== */}
              {/* STAT CARDS — 4 in a row */}
              {/* ========================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                  title="Login Attempts"
                  value={stats.loginAttempts.toLocaleString()}
                  icon={FiLock}
                  color="bg-purple-600"
                  subtitle="+12.5% this month"
                />

                <StatCard
                  title="Emails Sent"
                  value={stats.emailsSent.toLocaleString()}
                  icon={FiMail}
                  color="bg-yellow-600"
                  subtitle="99.8% Deliverability"
                />

                <StatCard
                  title="Searches Made"
                  value={stats.recentSearches.length.toLocaleString()}
                  icon={FiSearch}
                  color="bg-purple-700"
                  subtitle="Avg speed 42ms"
                />

                <StatCard
                  title="Successful Payments"
                  value={`$${(stats.successfulPayments * 19).toLocaleString()}`}
                  icon={FiCreditCard}
                  color="bg-green-600"
                  subtitle="100% Encrypted"
                />
              </div>

              {/* ========================================== */}
              {/* MIDDLE ROW — Login Activity + Email Stats */}
              {/* ========================================== */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Login Activity */}
                <div className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      Recent Login Activity
                    </h3>
                    <button className="text-purple-500 hover:text-purple-300 text-xs transition-colors flex items-center gap-1">
                      VIEW LOGS →
                    </button>
                  </div>

                  {/* Table Header */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <p className="text-purple-600 text-xs uppercase tracking-wide">
                      User Identity
                    </p>
                    <p className="text-purple-600 text-xs uppercase tracking-wide">
                      Device
                    </p>
                    <p className="text-purple-600 text-xs uppercase tracking-wide">
                      Timestamp
                    </p>
                  </div>

                  {/* Table Rows — mock data */}
                  {[
                    {
                      user: user?.email || "user@example.com",
                      device: "Chrome / Windows",
                      time: "Just now",
                    },
                    {
                      user: "admin@secureportal.io",
                      device: "Safari / Mac",
                      time: "15m ago",
                    },
                    {
                      user: "dev@enterprise.com",
                      device: "Firefox / Linux",
                      time: "45m ago",
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 gap-2 py-2 border-t border-purple-900/30"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-purple-800 shrink-0 flex items-center justify-center">
                          <FiUser className="text-purple-400 text-xs" />
                        </div>
                        <p className="text-purple-300 text-xs truncate">
                          {row.user}
                        </p>
                      </div>
                      <p className="text-purple-400 text-xs">{row.device}</p>
                      <p className="text-purple-500 text-xs">{row.time}</p>
                    </div>
                  ))}
                </div>

                {/* Email Infrastructure */}
                <div className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4">
                    Email Infrastructure
                  </h3>

                  {/* Email Stats */}
                  <div className="flex flex-col gap-4">
                    {/* Emails Sent */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-purple-400 text-xs">Emails Sent</p>
                        <p className="text-white text-xs font-semibold">
                          {stats.emailsSent} / 200
                        </p>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-1.5">
                        <div
                          className="bg-purple-500 h-1.5 rounded-full transition-all"
                          style={{
                            width: `${Math.min((stats.emailsSent / 200) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Verified Identities */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-purple-400 text-xs">
                          Verification Emails
                        </p>
                        <p className="text-white text-xs font-semibold">
                          {stats.verificationEmails}
                        </p>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full w-1/3" />
                      </div>
                    </div>

                    {/* Password Resets */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-purple-400 text-xs">
                          Password Resets
                        </p>
                        <p className="text-white text-xs font-semibold">
                          {stats.resetEmails}
                        </p>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-1.5">
                        <div className="bg-purple-400 h-1.5 rounded-full w-1/4" />
                      </div>
                    </div>

                    {/* Health Status */}
                    <div className="bg-green-900/20 border border-green-800/40 rounded-xl px-3 py-2 flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-green-400 text-xs font-semibold">
                        HEALTH STATUS — Systems Optimal
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================== */}
              {/* BOTTOM ROW — Payment History + Intelligence Feed */}
              {/* ========================================== */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Payment History */}
                <div className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      Payment History
                    </h3>
                    <button className="text-yellow-500 hover:text-yellow-300 text-xs transition-colors flex items-center gap-1">
                      FULL STATEMENT →
                    </button>
                  </div>

                  {stats.recentPayments.length === 0 ? (
                    <p className="text-purple-700 text-sm text-center py-4">
                      No payments yet
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {stats.recentPayments.map((payment, i) => (
                        <div
                          key={i}
                          className="bg-[#0D0D1A] rounded-xl p-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-purple-600 text-xs mb-1">
                              {payment.transactionId}
                            </p>
                            <p className="text-white text-sm font-semibold">
                              ${payment.amount}.00
                            </p>
                            <p className="text-purple-500 text-xs">
                              {payment.planName} — {payment.date}
                            </p>
                          </div>
                          {/* Status Badge */}
                          <span
                            className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                              payment.status === "success"
                                ? "bg-green-900/40 text-green-400"
                                : "bg-red-900/40 text-red-400"
                            }`}
                          >
                            {payment.status === "success"
                              ? "SUCCESS"
                              : "DECLINED"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Intelligence Feed */}
                <div className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      Intelligence Feed
                    </h3>
                    <button className="text-purple-500 hover:text-purple-300 transition-colors">
                      <FiRefreshCw className="text-sm" />
                    </button>
                  </div>

                  {/* Recent Searches as Intelligence */}
                  {stats.recentSearches.length === 0 ? (
                    <p className="text-purple-700 text-sm text-center py-4">
                      No recent searches
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {stats.recentSearches.slice(0, 4).map((search, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-2 border-b border-purple-900/30 last:border-0"
                        >
                          <FiSearch className="text-purple-600 shrink-0 text-sm" />
                          <div className="flex-1 min-w-0">
                            <p className="text-purple-300 text-xs truncate">
                              {search}
                            </p>
                            <p className="text-purple-700 text-xs">
                              Recent search
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 2FA Status */}
                  <div
                    className={`mt-4 p-3 rounded-xl border flex items-center gap-2 ${
                      stats.is2FAEnabled
                        ? "bg-green-900/20 border-green-800/40"
                        : "bg-yellow-900/20 border-yellow-800/40"
                    }`}
                  >
                    {stats.is2FAEnabled ? (
                      <FiCheckCircle className="text-green-400 shrink-0" />
                    ) : (
                      <FiAlertCircle className="text-yellow-400 shrink-0" />
                    )}
                    <div>
                      <p
                        className={`text-xs font-semibold ${stats.is2FAEnabled ? "text-green-400" : "text-yellow-400"}`}
                      >
                        2FA {stats.is2FAEnabled ? "Enabled" : "Disabled"}
                      </p>
                      <p
                        className={`text-xs ${stats.is2FAEnabled ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {stats.is2FAEnabled
                          ? "Account is protected"
                          : "Enable 2FA for better security"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================== */}
              {/* UPGRADE BANNER */}
              {/* ========================================== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-linear-to-r from-purple-900/50 to-purple-800/30 border border-purple-700/50 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-white font-bold mb-1">Go Quantum Secure</p>
                  <p className="text-purple-400 text-sm">
                    Upgrade to PQC encryption layers for all enterprise
                    communications.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/pricing")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shrink-0"
                >
                  UPGRADE NOW
                </button>
              </motion.div>
            </div>
          )}
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

export default DashboardPage;
