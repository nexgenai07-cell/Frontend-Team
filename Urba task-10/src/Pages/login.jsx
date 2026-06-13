import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../context/authcontext";
import { RiShieldKeyholeLine, RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiErrorWarningLine } from "react-icons/ri";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // handleLogin:
  const handleLogin = (e) => {
  e.preventDefault();
  const result = login(email, password);
  if (result.error) {
    setError(result.error);
    return;
  }
  if (result.requires2FA) {
    navigate(`/verify-2fa?email=${email}`);
    return;
  }
  navigate("/dashboard");
 };


  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo mark */}
        <div className="auth-logo"><RiShieldKeyholeLine size={22} color="#fff" /></div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your secure portal</p>

        <form className="auth-form" onSubmit={handleLogin}>

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
                placeholder="Enter your password"
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
          </div>
        
        <div style={{ textAlign: "right" }}>
            <a onClick={() => navigate("/forgot-password")} className="auth-link" style={{ fontSize: "0.8125rem" }}>
                Forgot password?
            </a>
        </div>
          {/* ERROR */}
          {error && (
            <div className="auth-error">
              <RiErrorWarningLine size={16} /> {error}
            </div>
          )}

          <button type="submit" className="auth-btn">
            Sign in
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <a onClick={() => navigate("/signup")} className="auth-link">
            Create one
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;