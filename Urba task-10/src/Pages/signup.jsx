import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePassword } from "../utils/passwordGenerator";
import { getStrength } from "../utils/passwordStrength";
import "../styles/auth.css";
import { useAuth } from "../context/authcontext";
import { RiUserAddLine, RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiErrorWarningLine, RiSparklingLine } from "react-icons/ri";

function Signup() {
  const navigate = useNavigate();
  const { signup,generateOTP } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState("");

  const strength = getStrength(password);

  const isDisabled = strength === "Weak" || !email || !password;

  // Strength bar config — derived from strength label
  const strengthConfig = {
    Weak:   { width: "33%",  colorClass: "strength-weak",   barColor: "var(--error)"   },
    Medium: { width: "66%",  colorClass: "strength-medium", barColor: "var(--warning)" },
    Strong: { width: "100%", colorClass: "strength-strong", barColor: "var(--success)" },
  };
  const { width, colorClass, barColor } = strengthConfig[strength] || strengthConfig.Weak;

  const handleGenerate = () => {
    const strongPassword = generatePassword();
    setSuggestedPassword(strongPassword);
  };

  const handleUsePassword = () => {
    setPassword(suggestedPassword);
    setSuggestedPassword("");
    setError("");
  };

  const handleSignup = (e) => {
  e.preventDefault();
  const result = signup(email, password);
  if (result.error) { setError(result.error); return; }
  generateOTP(email);
  navigate(`/verify-otp?email=${email}`);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo mark */}
        <div className="auth-logo"><RiUserAddLine size={22} color="#fff" /></div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join your secure portal today</p>

        <form className="auth-form" onSubmit={handleSignup}>

          {/* EMAIL */}
          <div className="field-group">
            <label className="field-label">Email address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="password-wrapper">
              <input
                className="auth-input"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
              </button>
            </div>

            {/* Strength bar — only shown when user has typed something */}
            {password && (
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

          {/* SUGGESTED PASSWORD */}
          {suggestedPassword && (
            <div className="suggested-password">
              <code>{suggestedPassword}</code>
              <button type="button" className="suggest-btn" onClick={handleUsePassword}>
                Use this
              </button>
            </div>
          )}

          <button
            type="button"
            className="suggest-btn"
            style={{ alignSelf: "flex-start" }}
            onClick={handleGenerate}
          >
           <RiSparklingLine size={15} /> Suggest strong password
          </button>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              <RiErrorWarningLine size={16} /> {error}
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={isDisabled}>
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")} className="auth-link">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}

export default Signup;