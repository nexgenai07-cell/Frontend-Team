import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiShieldCheckLine, RiErrorWarningLine, RiMailLine } from "react-icons/ri";
import { useAuth } from "../context/authcontext";
import "../styles/auth.css";

function TwoFAVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { verifyOTP, generateOTP, completeLogin } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [devOTP, setDevOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Redirect if no email in URL (e.g. someone visits this page directly)
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Start timer on mount
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("otp"));
    if (stored) setDevOTP(stored.code);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = () => {
    const newOTP = generateOTP(email);
    setDevOTP(newOTP);
    setTimer(60);
    setCanResend(false);
    setError("");
    setOtp("");

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const result = verifyOTP(email, otp);
    if (result.error) {
      setError(result.error);
      return;
    }
    completeLogin(email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <RiShieldCheckLine size={22} color="#fff" />
        </div>

        <h1 className="auth-title">Two-Factor Authentication</h1>
        <p className="auth-subtitle">Enter the 6-digit code sent to your email to complete login</p>

        {/* Email display */}
        <div className="field-group" style={{ marginBottom: "1.5rem" }}>
          <div className="input-icon-wrapper">
            <RiMailLine className="input-icon" size={16} />
            <input
              className="auth-input auth-input--icon"
              type="email"
              value={email || ""}
              disabled
            />
          </div>
        </div>

        {/* Dev shortcut — OTP display */}
        {devOTP && (
          <div className="suggested-password" style={{ marginBottom: "1rem" }}>
            <code>Your OTP: {devOTP}</code>
          </div>
        )}

        <form className="auth-form" onSubmit={handleVerify}>
          <div className="field-group">
            <label className="field-label">OTP Code</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              maxLength={6}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* Timer / Resend */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {!canResend ? (
              <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                Resend code in {timer}s
              </span>
            ) : (
              <button type="button" className="auth-link" onClick={handleResend}>
                Resend OTP
              </button>
            )}
          </div>

          {error && (
            <div className="auth-error">
              <RiErrorWarningLine size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-btn"
            disabled={otp.length !== 6}
          >
            Verify & Login
          </button>
        </form>

        <p className="auth-footer">
          <a onClick={() => navigate("/login")} className="auth-link">
            Back to login
          </a>
        </p>

      </div>
    </div>
  );
}

export default TwoFAVerification;