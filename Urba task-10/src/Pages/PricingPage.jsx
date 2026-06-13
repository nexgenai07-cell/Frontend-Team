import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine, RiCheckLine } from "react-icons/ri";
import "../styles/pricing.css";

const STRIPE_LINK_PRO = import.meta.env.VITE_STRIPE_PAYMENT_LINK_PRO;

function PricingPage() {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    window.location.href = STRIPE_LINK_PRO;
  };

  return (
    <>
    <div className="pricing-page">
      <div className="pricing-header">
        <div>
          <h1 className="pricing-title">Plans & Pricing</h1>
          <p className="pricing-subtitle">Choose the plan that fits your needs</p>
        </div>
        <a
          className="auth-link"
          onClick={() => navigate("/dashboard")}
          style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
        >
          <RiArrowLeftLine size={16} /> Back to Dashboard
        </a>
      </div>

      <div className="pricing-grid">

        {/* Free Plan */}
        <div className="plan-card">
          <span className="plan-badge">Current Plan</span>
          <h2 className="plan-name">Free</h2>
          <p className="plan-price">$0 <span>/month</span></p>
          <ul className="plan-features">
            <li><RiCheckLine size={16} /> Basic 2FA protection</li>
            <li><RiCheckLine size={16} /> 5 searches per day</li>
            <li><RiCheckLine size={16} /> Email verification</li>
          </ul>
          <button className="auth-btn" disabled style={{ opacity: 0.5, cursor: "default" }}>
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="plan-card plan-card--featured">
          <span className="plan-badge">Recommended</span>
          <h2 className="plan-name">Pro</h2>
          <p className="plan-price">$9 <span>/month</span></p>
          <ul className="plan-features">
            <li><RiCheckLine size={16} /> Everything in Free</li>
            <li><RiCheckLine size={16} /> Unlimited searches</li>
            <li><RiCheckLine size={16} /> Priority email support</li>
            <li><RiCheckLine size={16} /> Advanced security logs</li>
          </ul>
          <button className="auth-btn" onClick={handleSubscribe}>
            Subscribe to Pro
          </button>
        </div>

      </div>
    </div>
    </>
  );
}

export default PricingPage;