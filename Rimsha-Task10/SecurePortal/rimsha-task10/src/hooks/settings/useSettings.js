// useState, useEffect — states ke liye
import { useState, useEffect } from "react";

// useNavigate — logout ke baad redirect ke liye
import { useNavigate } from "react-router-dom";

// useAuth — logged in user ka data lene ke liye
import { useAuth } from "../../context/AuthContext";

// auth.service.js — password change, logout ke liye
import {
  logoutUser,
  resetPassword,
  get2FAStatus,
} from "../../services/auth.service";

// use2FA hook — 2FA toggle ke liye
import use2FA from "../auth/use2FA";

// useToast — notifications ke liye
import { useToast } from "../../context/ToastContext";

// supabase — profile update ke liye
import { supabase } from "../../lib/supabase";

const useSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 2FA hook
  const {
    isEnabled: is2FAEnabled,
    handleEnable2FA,
    handleDisable2FA,
    handleVerifySetup,
    qrCode,
    secretKey,
    loading: twoFALoading,
    error: twoFAError,
  } = use2FA();

  // Profile states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Notification states
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const handleUpdateProfile = async () => {
    try {
      setProfileLoading(true);

      // Supabase mein name update karo
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) throw error;

      showToast("Profile updated successfully!", "success");
    } catch (err) {
      showToast("Failed to update profile.", "error");
    } finally {
      setProfileLoading(false);
    }
  };

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      showToast("Password must be at least 8 characters.", "warning");
      return;
    }

    try {
      setPasswordLoading(true);

      await resetPassword(newPassword);

      showToast("Password updated successfully!", "success");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      showToast("Failed to update password.", "error");
    } finally {
      setPasswordLoading(false);
    }
  };

  // ==========================================
  // DELETE ACCOUNT
  // ==========================================
  const handleDeleteAccount = async () => {
    // Confirm dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await logoutUser();
      showToast("Account deleted successfully.", "info");
      navigate("/login");
    } catch (err) {
      showToast("Failed to delete account.", "error");
    }
  };

  // ==========================================
  // LOGOUT
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

  return {
    // Profile
    fullName,
    setFullName,
    email,
    profileLoading,
    handleUpdateProfile,

    // Password
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    passwordLoading,
    handleUpdatePassword,

    // 2FA
    is2FAEnabled,
    handleEnable2FA,
    handleDisable2FA,
    handleVerifySetup,
    qrCode,
    secretKey,
    twoFALoading,
    twoFAError,

    // Notifications
    securityAlerts,
    setSecurityAlerts,
    productUpdates,
    setProductUpdates,

    // Account
    handleDeleteAccount,
    handleLogout,

    // User
    user,
  };
};

export default useSettings;
