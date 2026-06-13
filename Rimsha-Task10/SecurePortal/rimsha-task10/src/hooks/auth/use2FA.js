// useState — loading, error, states ke liye
import { useState, useEffect } from "react";

// useNavigate — 2FA verify hone ke baad dashboard pe bhejna
import { useNavigate } from "react-router-dom";

// 2FA functions — auth.service.js sy
import {
  enroll2FA,
  verify2FASetup,
  disable2FA,
  get2FAStatus,
} from "../../services/auth.service";
// import karo
import { useToast } from "../../context/ToastContext";

const use2FA = () => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // 2FA enabled hai ya nahi
  const [isEnabled, setIsEnabled] = useState(false);

  // Factor ID — disable karne ke liye
  const [factorId, setFactorId] = useState(null);

  // QR code URL — screen pe dikhane ke liye
  const [qrCode, setQrCode] = useState(null);

  // Secret key — manually enter karne ke liye
  const [secretKey, setSecretKey] = useState(null);

  // Setup complete hua ya nahi
  const [setupComplete, setSetupComplete] = useState(false);
  const { showToast } = useToast();

  const navigate = useNavigate();

  // ==========================================
  // CHECK 2FA STATUS ON LOAD
  // ==========================================
  // Component load hone pe check karo 2FA enabled hai ya nahi

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await get2FAStatus();
        setIsEnabled(status.isEnabled);
        setFactorId(status.factorId);
      } catch (err) {
        console.error("2FA status check failed:", err);
      }
    };
    checkStatus();
  }, []);

  // ==========================================
  // ENABLE 2FA — QR CODE GENERATE
  // ==========================================
  // "Enable 2FA" button dabane pe call hoga
  // QR code generate karega

  const handleEnable2FA = async () => {
    try {
      setLoading(true);
      setError(null);

      // Supabase se QR code aur secret key lo
      const data = await enroll2FA();

      // QR code URL save karo — screen pe dikhayenge
      setQrCode(data.totp.qr_code);

      // Secret key save karo — manually enter karne ke liye
      setSecretKey(data.totp.secret);

      // Factor ID save karo — verify karne ke liye chahiye
      setFactorId(data.id);

      // QR scan karo phir code enter karo
      showToast(
        "QR code ready! Scan it with your authenticator app.",
        "success",
      );
    } catch (err) {
      setError(err.message);
      // Enable fail hone pe
      showToast("Failed to enable 2FA. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY 2FA SETUP
  // ==========================================
  // QR scan ke baad code daalne pe call hoga

  const handleVerifySetup = async (code) => {
    // Code empty hai ya 6 digits nahi
    if (!code || code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Supabase se verify karo
      await verify2FASetup(factorId, code);

      // Verify ho gaya — 2FA ON
      setIsEnabled(true);
      setSetupComplete(true);

      // QR code hide karo — ab zaroorat nahi
      setQrCode(null);
      setSecretKey(null);

      // Setup complete hone pe
      showToast("2FA setup complete! Your account is now secure.", "success");
    } catch (err) {
      setError("Invalid code. Please try again.");
      // Wrong code daalne pe
      showToast(
        "Invalid code. Please check your authenticator and try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DISABLE 2FA
  // ==========================================
  // "Disable 2FA" button dabane pe call hoga

  const handleDisable2FA = async () => {
    try {
      setLoading(true);
      setError(null);

      // Supabase se 2FA remove karo
      await disable2FA(factorId);

      // 2FA OFF
      setIsEnabled(false);
      setFactorId(null);
      setSetupComplete(false);

      // Disable hone pe
      showToast("2FA has been disabled.", "info");
    } catch (err) {
      setError(err.message);
      // Disable fail hone pe
      showToast("Failed to disable 2FA. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Settings page ko ye cheezein mileingi
  return {
    loading,
    error,
    isEnabled,
    qrCode,
    secretKey,
    setupComplete,
    handleEnable2FA,
    handleVerifySetup,
    handleDisable2FA,
  };
};

export default use2FA;
