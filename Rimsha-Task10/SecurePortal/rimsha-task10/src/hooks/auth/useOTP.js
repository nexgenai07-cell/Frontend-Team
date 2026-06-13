// useState — loading, error, success state ke liye
import { useState, useEffect } from "react";

// useNavigate — verify hone ke baad dashboard pe bhejna
import { useNavigate } from "react-router-dom";

// sendOTP, verifyOTP — auth.service.js sy Supabase call
import { sendOTP, verifyOTP } from "../../services/auth.service";

// validateEmail — validators.js sy email validation
import { validateEmail } from "../../utils/validators";

const useOTP = () => {
  // Loading state — Supabase sy jawab aany tak
  const [loading, setLoading] = useState(false);

  // Error state — galat OTP ya koi aur error
  const [error, setError] = useState(null);

  // OTP bheja ja chuka hai ya nahi
  // false — email input dikhao
  // true — OTP input dikhao
  const [otpSent, setOtpSent] = useState(false);

  // Success state — OTP verify ho gaya
  const [success, setSuccess] = useState(false);

  // Countdown timer — OTP expiry ke liye
  // 120 seconds — 2 minute
  const [timer, setTimer] = useState(120);

  // Timer chal raha hai ya nahi
  const [timerActive, setTimerActive] = useState(false);

  // useNavigate — dashboard pe bhejna
  const navigate = useNavigate();

  // ==========================================
  // TIMER EFFECT
  // ==========================================
  // timerActive true hone pe countdown shuru hota hai
  // har second timer 1 se kam hota hai
  // 0 pe pahunch jaye toh timer band ho jata hai

  useEffect(() => {
    // Timer active nahi — kuch mat karo
    if (!timerActive) return;

    // Timer 0 pe pahunch gaya — band karo
    if (timer === 0) {
      setTimerActive(false);
      return;
    }

    // Har second timer 1 se kam karo
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Cleanup — component band ho toh interval bhi band ho
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  // ==========================================
  // SEND OTP FUNCTION
  // ==========================================
  // OTPPage.jsx is function ko call karegi
  // email leta hai

  const handleSendOTP = async (email) => {
    // Email validate karo
    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      // Loading shuru
      setLoading(true);
      setError(null);

      // auth.service.js ko call karo
      // Supabase OTP generate karke email bhejega
      await sendOTP(email);

      // ==========================================
      // OTP STATS TRACK KARO
      // ==========================================
      // localStorage sy pehle se saved stats lo
      // agar kuch nahi mila toh default object lo — attempts: 0, otpRequests: 0
      const stats = JSON.parse(
        localStorage.getItem("secureportal_login_stats"),
      ) || { attempts: 0, otpRequests: 0 };

      // OTP request count 1 barha do
      stats.otpRequests += 1;

      // Updated stats wapas localStorage mein save karo
      localStorage.setItem("secureportal_login_stats", JSON.stringify(stats));

      // OTP bhej diya — OTP input dikhao
      setOtpSent(true);

      // Timer shuru karo — 2 minute
      setTimer(120);
      setTimerActive(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP FUNCTION
  // ==========================================
  // OTPPage.jsx is function ko call karegi
  // email aur otp code leta hai

  const handleVerifyOTP = async (email, otp) => {
    // OTP empty hai — error dikhao
    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    try {
      // Loading shuru
      setLoading(true);
      setError(null);

      // auth.service.js ko call karo
      // Supabase OTP verify karega
      await verifyOTP(email, otp);

      // OTP verify ho gaya — success true karo
      setSuccess(true);

      // Dashboard pe bhejo
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP FUNCTION
  // ==========================================
  // Timer khatam hone pe resend button active hoga

  const handleResendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);

      // Dobara OTP bhejo
      await sendOTP(email);

      // Timer reset karo
      setTimer(120);
      setTimerActive(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTPPage.jsx ko ye cheezein mileingi
  return {
    loading,
    error,
    otpSent,
    success,
    timer,
    timerActive,
    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
  };
};

export default useOTP;
