// useState — loading, error, success state ke liye
import { useState } from "react";

// email.service.js sy functions import kar rahy hain
import {
  sendContactEmail,
  sendWelcomeEmail,
} from "../../services/email.service";

// validators.js sy validation import kar rahy hain
import { validateEmail, validateName } from "../../utils/validators";
// import karo
import { useToast } from "../../context/ToastContext";

// ==========================================
// EMAIL STATS — LOCALSTORAGE KEY
// ==========================================
// LocalStorage mein stats save karne ke liye key
const EMAIL_STATS_KEY = "secureportal_email_stats";

// ==========================================
// UPDATE EMAIL STATS — HELPER FUNCTION
// ==========================================
// Har email send hone pe is function ko call karo
// type — 'contact', 'verification', ya 'reset'

const updateEmailStats = (type) => {
  // LocalStorage sy pehle se saved stats lo
  // agar kuch nahi mila toh default object lo
  const stats = JSON.parse(localStorage.getItem(EMAIL_STATS_KEY)) || {
    sent: 0,
    verification: 0,
    reset: 0,
  };

  // Total sent count hamesha barhtaa hai
  stats.sent += 1;

  // Type ke hisaab sy specific counter barhao
  if (type === "verification") stats.verification += 1;
  if (type === "reset") stats.reset += 1;

  // Updated stats wapas localStorage mein save karo
  localStorage.setItem(EMAIL_STATS_KEY, JSON.stringify(stats));
};

const useEmail = () => {
  // Loading state — EmailJS sy jawab aany tak
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // Success state — email bhej di gayi
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  // ==========================================
  // SEND CONTACT EMAIL FUNCTION
  // ==========================================
  // ContactForm.jsx is function ko call karegi
  // name, email, message leta hai

  const handleContactEmail = async (name, email, message) => {
    // Validate karo
    const nameError = validateName(name);
    const emailError = validateEmail(email);

    // Name galat hai
    if (nameError) {
      setError(nameError);
      showToast(nameError, "error");
      return;
    }

    // Email galat hai
    if (emailError) {
      setError(emailError);
      showToast(emailError, "error");
      return;
    }

    // Message empty hai
    if (!message || message.trim() === "") {
      setError("Message is required");
      showToast("Please write a message before sending.", "error");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // email.service.js ko call karo
      // EmailJS email deliver karega
      await sendContactEmail({ name, email, message });

      // Contact email stats update karo — type 'contact'
      updateEmailStats("contact");

      // Email bhej di — success true karo
      setSuccess(true);
      // success pe
      showToast(
        "Your message has been sent! We'll get back to you soon.",
        "success",
      );
    } catch (err) {
      setError("Failed to send email. Please try again.");
      // error pe
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEND WELCOME EMAIL FUNCTION
  // ==========================================
  // Signup ke baad call hoga
  // name aur email leta hai

  const handleWelcomeEmail = async (name, email) => {
    try {
      // Welcome email mein loading nahi dikhayenge
      // Background mein quietly bhej do
      await sendWelcomeEmail({ name, email });

      // Welcome email stats update karo — type 'verification'
      updateEmailStats("verification");
    } catch (err) {
      // Welcome email fail ho gayi — koi baat nahi
      // User ko error mat dikhao — signup flow interrupt na ho
      console.error("Welcome email failed:", err);
    }
  };

  // ==========================================
  // HANDLE RESET EMAIL STATS FUNCTION
  // ==========================================
  // Password reset email bhejne pe call hoga
  // Sirf stats track karta hai — actual email auth.service.js karta hai

  const handleResetEmail = () => {
    // Password reset email stats update karo — type 'reset'
    updateEmailStats("reset");
  };

  // Reset success state — form dobara dikhane ke liye
  const resetSuccess = () => setSuccess(false);

  // Components ko ye cheezein mileingi
  return {
    loading,
    error,
    success,
    resetSuccess,
    handleContactEmail,
    handleWelcomeEmail,
    handleResetEmail,
  };
};

export default useEmail;
