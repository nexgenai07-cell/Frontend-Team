// src/hooks/dashboard/useDashboard.js

// useState, useEffect — states ke liye
import { useState, useEffect } from "react";

// auth.service.js — 2FA status lene ke liye
import { get2FAStatus } from "../../services/auth.service";

// payment.service.js — payment stats lene ke liye
import { getPaymentStats } from "../../services/payment.service";

// LocalStorage keys
const LOGIN_STATS_KEY = "secureportal_login_stats";
const EMAIL_STATS_KEY = "secureportal_email_stats";
const RECENT_SEARCHES_KEY = "secureportal_recent_searches";
const SAVED_SEARCHES_KEY = "secureportal_saved_searches";

const useDashboard = () => {
  // Stats states
  const [stats, setStats] = useState({
    loginAttempts: 0,
    otpRequests: 0,
    is2FAEnabled: false,
    emailsSent: 0,
    verificationEmails: 0,
    resetEmails: 0,
    recentSearches: [],
    savedSearches: [],
    successfulPayments: 0,
    failedPayments: 0,
    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Login stats — LocalStorage se lo
        const loginStats = JSON.parse(
          localStorage.getItem(LOGIN_STATS_KEY),
        ) || { attempts: 0, otpRequests: 0 };

        // Email stats — LocalStorage se lo
        const emailStats = JSON.parse(
          localStorage.getItem(EMAIL_STATS_KEY),
        ) || { sent: 0, verification: 0, reset: 0 };

        // Search stats — LocalStorage se lo
        const recentSearches =
          JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];

        const savedSearches =
          JSON.parse(localStorage.getItem(SAVED_SEARCHES_KEY)) || [];

        // Payment stats — payment.service.js se lo
        const paymentStats = getPaymentStats();

        // 2FA status — Supabase se lo
        const twoFAStatus = await get2FAStatus();

        // Sab stats ek jagah set karo
        setStats({
          loginAttempts: loginStats.attempts,
          otpRequests: loginStats.otpRequests,
          is2FAEnabled: twoFAStatus.isEnabled,
          emailsSent: emailStats.sent,
          verificationEmails: emailStats.verification,
          resetEmails: emailStats.reset,
          recentSearches,
          savedSearches,
          successfulPayments: paymentStats.successfulPayments,
          failedPayments: paymentStats.failedPayments,
          recentPayments: paymentStats.payments.slice(0, 3),
        });
      } catch (err) {
        console.error("Dashboard stats load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading };
};

export default useDashboard;
