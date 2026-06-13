import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { incrementCounter } from "../utils/statsTracker";
import "../styles/auth.css";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    incrementCounter("successfulPayments");
    localStorage.setItem("currentPlan", "pro");
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="auth-logo" style={{ margin: "0 auto 1.5rem", background: "linear-gradient(135deg, var(--success), #16a34a)" }}>
          <RiCheckboxCircleLine size={22} color="#fff" />
        </div>

        <h1 className="auth-title">Payment Successful</h1>
        <p className="auth-subtitle">
          Thank you! Your subscription to the Pro plan is now active.
        </p>

        <button className="auth-btn" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;