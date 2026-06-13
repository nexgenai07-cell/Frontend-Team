// useState — loading, error, aur success state ke liye
import { useState } from "react";

// useNavigate — reset ke baad login pe bhejna
import { useNavigate } from "react-router-dom";

// resetPassword — auth.service.js sy Supabase call
import { resetPassword } from "../../services/auth.service";

// validatePassword — validators.js sy password validation
import { validatePassword } from "../../utils/validators";

// import karo
import { useToast } from "../../context/ToastContext";

const useResetPassword = () => {
  // Loading state — Supabase sy jawab aany tak
  const [loading, setLoading] = useState(false);

  // Error state — validation ya Supabase error
  const [error, setError] = useState(null);

  // Success state — password reset ho gaya
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();
  // useNavigate — login pe bhejna
  const navigate = useNavigate();

  // ==========================================
  // RESET PASSWORD FUNCTION
  // ==========================================
  // ResetPasswordPage.jsx is function ko call karegi
  // newPassword aur confirmPassword leta hai

  const handleResetPassword = async (newPassword, confirmPassword) => {
    // Pehle password validate karo
    const passwordError = validatePassword(newPassword);

    // Password requirements poori nahi — error dikhao
    if (passwordError) {
      setError(passwordError);
      showToast(passwordError, "error");
      return;
    }

    // Dono passwords same hain ya nahi
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      showToast("Passwords do not match. Please try again.", "error");
      return;
    }

    try {
      // Loading shuru
      setLoading(true);

      // Pehle wala error clear karo
      setError(null);

      // auth.service.js ko call karo
      // Supabase token verify karega aur password update karega
      await resetPassword(newPassword);

      // Password reset ho gaya — success true karo
      setSuccess(true);

      // success pe
      showToast(
        "Password updated successfully! Redirecting to login...",
        "success",
      );

      // 2 second baad login pe bhejo
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Kuch galat hua — error save karo
      setError(err.message);

      // error pe
      showToast("Failed to reset password. Please try again.", "error");
    } finally {
      // Hamesha loading false karo
      setLoading(false);
    }
  };

  // ResetPasswordPage.jsx ko ye cheezein mileingi
  return { handleResetPassword, loading, error, success };
};

export default useResetPassword;
