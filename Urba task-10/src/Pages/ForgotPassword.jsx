import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine,
  RiShieldKeyholeLine,
} from "react-icons/ri";
import { getStrength } from "../utils/passwordStrength";
import "../styles/auth.css";
import { useAuth } from "../context/authcontext";

function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [step, setStep] = useState(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 2
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetError, setResetError] = useState("");

  const strength = getStrength(newPassword);

  const strengthConfig = {
    Weak:   { width: "33%",  colorClass: "strength-weak",   barColor: "var(--error)"   },
    Medium: { width: "66%",  colorClass: "strength-medium", barColor: "var(--warning)" },
    Strong: { width: "100%", colorClass: "strength-strong", barColor: "var(--success)" },
  };
  const { width, colorClass, barColor } = strengthConfig[strength] || strengthConfig.Weak;

  // Step 1 submit — check email exists
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      setEmailError("No account found with this email");
      return;
    }

    setEmailError("");
    setStep(2);
  };

  // Step 2 submit — update password
   const handleResetSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        setResetError("Passwords do not match");
        return;
    }

    if (strength === "Weak") {
        setResetError("Password is too weak");
        return;
    }

    resetPassword(email, newPassword);
    navigate("/login");
    };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <RiShieldKeyholeLine size={22} color="#fff" />
        </div>

        {step === 1 ? (
          <>
            <h1 className="auth-title">Forgot password</h1>
            <p className="auth-subtitle">Enter your email to reset your password</p>

            <form className="auth-form" onSubmit={handleEmailSubmit}>
              <div className="field-group">
                <label className="field-label">Email address</label>
                <div className="input-icon-wrapper">
                  <RiMailLine className="input-icon" size={16} />
                  <input
                    className="auth-input auth-input--icon"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                </div>
              </div>

              {emailError && (
                <div className="auth-error">
                  <RiErrorWarningLine size={16} /> {emailError}
                </div>
              )}

              <button type="submit" className="auth-btn">
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-title">Reset password</h1>
            <p className="auth-subtitle">Set a new password for your account</p>

            <form className="auth-form" onSubmit={handleResetSubmit}>

              {/* Email — disabled, just for display */}
              <div className="field-group">
                <label className="field-label">Resetting password for</label>
                <div className="input-icon-wrapper">
                  <RiMailLine className="input-icon" size={16} />
                  <input
                    className="auth-input auth-input--icon"
                    type="email"
                    value={email}
                    disabled
                  />
                </div>
              </div>

              {/* New password */}
              <div className="field-group">
                <label className="field-label">New password</label>
                <div className="password-wrapper">
                  <input
                    className="auth-input"
                    type={showNew ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setResetError("");
                    }}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowNew((p) => !p)}
                  >
                    {showNew ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                  </button>
                </div>

                {newPassword && (
                  <>
                    <div className="strength-bar-track">
                      <div
                        className="strength-bar-fill"
                        style={{ width, backgroundColor: barColor }}
                      />
                    </div>
                    <span className={`strength-label ${colorClass}`}>
                      {strength} password
                    </span>
                  </>
                )}
              </div>

              {/* Confirm password */}
              <div className="field-group">
                <label className="field-label">Confirm password</label>
                <div className="password-wrapper">
                  <input
                    className="auth-input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setResetError("");
                    }}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowConfirm((p) => !p)}
                  >
                    {showConfirm ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                  </button>
                </div>
              </div>

              {resetError && (
                <div className="auth-error">
                  <RiErrorWarningLine size={16} /> {resetError}
                </div>
              )}

              <button
                type="submit"
                className="auth-btn"
                disabled={!newPassword || !confirmPassword || strength === "Weak"}
              >
                Reset password
              </button>
            </form>
          </>
        )}

        <p className="auth-footer">
          <a onClick={() => navigate("/login")} className="auth-link">
            Back to login
          </a>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;