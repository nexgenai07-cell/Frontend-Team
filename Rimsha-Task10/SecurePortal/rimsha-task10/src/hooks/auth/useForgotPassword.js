// useState — loading, error, aur success state ke liye
import { useState } from "react";

// forgotPassword — auth.service.js sy Supabase call
import { forgotPassword } from "../../services/auth.service";

// validateEmail — validators.js sy email validation
import { validateEmail } from "../../utils/validators";
// import karo
import { useToast } from "../../context/ToastContext";

const useForgotPassword = () => {
  // Loading state — Supabase sy jawab aany tak
  const [loading, setLoading] = useState(false);

  // Error state — galat email ya koi aur error
  const [error, setError] = useState(null);

  // Success state — email bhej di gayi
  // true — success message dikhao
  // false — form dikhao
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  // ==========================================
  // SEND RESET EMAIL FUNCTION
  // ==========================================
  // ForgotPasswordPage.jsx is function ko call karegi
  // email leta hai

  const sendResetEmail = async (email) => {
    // Pehle email validate karo
    const emailError = validateEmail(email);

    // Email galat hai — error dikhao, Supabase ko call mat karo
    if (emailError) {
      setError(emailError);
      showToast(emailError, "error");
      return;
    }

    try {
      // Loading shuru
      setLoading(true);

      // Pehle wala error clear karo
      setError(null);

      // auth.service.js ko call karo
      // Supabase reset email bhejega
      await forgotPassword(email);

      // success pe
      showToast(
        "Reset link sent! Check your inbox and follow the instructions.",
        "success",
      );
      // Email bhej di — success true karo
      setSuccess(true);
    } catch (err) {
      // Kuch galat hua — error save karo
      setError(err.message);

      // error pe
      showToast("Failed to send reset email. Please try again.", "error");
    } finally {
      // Hamesha loading false karo
      setLoading(false);
    }
  };

  // ForgotPasswordPage.jsx ko ye cheezein mileingi
  return { sendResetEmail, loading, error, success };
};

export default useForgotPassword;
