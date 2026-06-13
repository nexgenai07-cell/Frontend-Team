import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useAuth } from "../context/authcontext";
import { RiShieldCheckLine, RiLogoutBoxLine, RiLoginBoxLine, RiMessage2Line, RiShieldLine, RiMailSendLine, RiSearchLine, RiBankCardLine, RiErrorWarningLine } from "react-icons/ri";
import { getCounter } from "../utils/statsTracker";

function Dashboard() {
  const navigate = useNavigate();

  const { currentUser, logout, generateOTP, verifyOTP, setTwoFA } = useAuth();

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [otp, setOtp] = useState("");
  const [devOTP, setDevOTP] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [otpRequests, setOtpRequests] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [payments, setPayments] = useState(0);
  const [currentPlan, setCurrentPlan] = useState("free");

  // Load current user's 2FA status on mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser?.email);
    setTwoFAEnabled(user?.twoFAEnabled || false);

    setLoginAttempts(getCounter("loginAttempts"));
    setOtpRequests(getCounter("otpRequests"));
    setEmailsSent(getCounter("emailsSent"));
    setPayments(getCounter("successfulPayments"));
    setSearchHistory(JSON.parse(localStorage.getItem("searchHistory")) || []);
    setCurrentPlan(localStorage.getItem("currentPlan") || "free");
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Start the enable/disable flow — send OTP, open panel
  const handleToggleClick = () => {
    const code = generateOTP(currentUser.email);
    setDevOTP(code);
    setOtp("");
    setError("");
    setShowOtpPanel(true);
  };

  // Verify OTP, then flip 2FA flag
  const handleConfirm = (e) => {
    e.preventDefault();
    const result = verifyOTP(currentUser.email, otp);
    if (result.error) {
      setError(result.error);
      return;
    }
    const newStatus = !twoFAEnabled;
    setTwoFA(currentUser.email, newStatus);
    setTwoFAEnabled(newStatus);
    setShowOtpPanel(false);
    setOtp("");
    setDevOTP("");
  };

  const handleCancel = () => {
    setShowOtpPanel(false);
    setOtp("");
    setError("");
    setDevOTP("");
  };

  return (
    <div className="dash-page">

      {/* Top nav */}
      <header className="dash-nav">
        <div className="dash-nav-brand">
          <RiShieldCheckLine size={20} color="#a78bfa" />
          <span className="dash-brand-name">Secure Portal</span>
        </div>
        <div className="dash-nav-right">
          <span className="dash-user-email">{currentUser?.email}</span>
          <a className="auth-link" onClick={() => navigate("/contact")} style={{ marginRight: "0.5rem" }}>
            Contact
          </a>
          <a className="auth-link" onClick={() => navigate("/search")} style={{ marginRight: "0.5rem" }}>
            Search
          </a>
          <a className="auth-link" onClick={() => navigate("/pricing")} style={{ marginRight: "0.5rem" }}>
            Pricing
          </a>
          <button className="dash-logout-btn" onClick={handleLogout}>
            <RiLogoutBoxLine size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="dash-main">
        <div className="dash-welcome">
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-subtitle">Your security overview at a glance</p>
        </div>

        {/* Stats grid */}
        <div className="dash-stats-grid">
          <div className="stat-card">
            <span className="stat-icon"><RiLoginBoxLine size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">Login Attempts</p>
              <p className="stat-value">{loginAttempts}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><RiMessage2Line size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">OTP Requests</p>
              <p className="stat-value">{otpRequests}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><RiShieldLine size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">2FA Status</p>
              <p className="stat-value">{twoFAEnabled ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><RiMailSendLine size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">Emails Sent</p>
              <p className="stat-value">{emailsSent}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><RiSearchLine size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">Recent Searches</p>
              <p className="stat-value">{searchHistory.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon"><RiBankCardLine size={22} /></span>
            <div className="stat-info">
              <p className="stat-label">Payments</p>
              <p className="stat-value">{payments}</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="dash-sections">
          <div className="dash-section-card">
            <p className="dash-section-title">Two-Factor Authentication</p>
            <p className="dash-section-body" style={{ marginBottom: "1rem" }}>
              {twoFAEnabled
                ? "2FA is currently enabled. You'll be asked for a code at every login."
                : "2FA is currently disabled. Enable it for extra security at login."}
            </p>

            {!showOtpPanel ? (
              <button className="auth-btn" style={{ marginTop: 0 }} onClick={handleToggleClick}>
                {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            ) : (
              <form className="auth-form" onSubmit={handleConfirm}>
                {devOTP && (
                  <div className="suggested-password">
                    <code>Your OTP: {devOTP}</code>
                  </div>
                )}
                <div className="field-group">
                  <label className="field-label">Enter OTP to confirm</label>
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                {error && (
                  <div className="auth-error">
                    <RiErrorWarningLine size={16} /> {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="submit" className="auth-btn" style={{ marginTop: 0 }} disabled={otp.length !== 6}>
                    Confirm
                  </button>
                  <button type="button" className="suggest-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="dash-section-card">
            <p className="dash-section-title">Search History</p>
            {searchHistory.length > 0 ? (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                {searchHistory.slice(0, 4).map((term, i) => (
                  <li key={i} className="dash-section-body" style={{ marginBottom: 0 }}>
                    • {term}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dash-section-body">No searches yet. Try the Search page!</p>
            )}
          </div>

          <div className="dash-section-card">
            <p className="dash-section-title">Billing</p>
            <p className="dash-section-body" style={{ marginBottom: "0.75rem" }}>
              Current plan: <strong style={{ color: "var(--text-primary)" }}>{currentPlan === "pro" ? "Pro" : "Free"}</strong>
            </p>
            {currentPlan === "free" && (
              <a className="auth-link" onClick={() => navigate("/pricing")}>
                Upgrade to Pro →
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;