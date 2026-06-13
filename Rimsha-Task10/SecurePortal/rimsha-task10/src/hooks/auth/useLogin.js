import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import { useToast } from "../../context/ToastContext";

// Login stats LocalStorage mein save karne ke liye
const LOGIN_STATS_KEY = "secureportal_login_stats";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      await loginUser(email, password);

      // Login attempt track karo — LocalStorage mein
      const stats = JSON.parse(localStorage.getItem(LOGIN_STATS_KEY)) || {
        attempts: 0,
        otpRequests: 0,
      };

      stats.attempts += 1;
      localStorage.setItem(LOGIN_STATS_KEY, JSON.stringify(stats));

      // Session Storage mein bhi save karo
      // Session khatam hone pe automatically clear hoga
      sessionStorage.setItem("secureportal_session_active", "true");
      sessionStorage.setItem(
        "secureportal_login_time",
        new Date().toISOString(),
      );

      showToast("Login successful! Welcome back.", "success");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      showToast("Login failed. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
