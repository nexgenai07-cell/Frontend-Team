import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function PaymentFailed() {
  const { state } = useLocation();
  const toast = useToast();

  // show error toast on mount
  useEffect(() => {
    toast("Payment failed. Please try again.", "error");
  }, []);

  // fallback order data
  const order = state ?? {
    id: "ord_demo",
    date: "Today",
    total: 0,
    paymentMethod: "Card",
    paymentIntent: "pi_demo",
  };

  return (
    <div className="status-page">
      <div className="status-icon failed">✕</div>

      <h1 className="status-title">Payment Failed</h1>

      <p className="status-subtitle">
        Your card was declined. This happens with test cards ending in 0000.
      </p>

      <div className="status-details">
        <div className="status-detail-row">
          <span>Order ID</span>
          <span>{order.id}</span>
        </div>

        <div className="status-detail-row">
          <span>Date</span>
          <span>{order.date}</span>
        </div>

        <div className="status-detail-row">
          <span>Payment Method</span>
          <span>{order.paymentMethod}</span>
        </div>

        <div className="status-detail-row">
          <span>Amount</span>
          <span>Rs. {order.total.toLocaleString()}</span>
        </div>

        <div className="intent-section">
          <div className="payment-intent-block">
            {order.paymentIntent}
          </div>

          <div className="intent-status-row">
            <span className="badge badge-danger">✕ failed</span>
            <span>card_declined — insufficient_funds</span>
          </div>
        </div>

        <div className="error-alert">
          <strong>Error:</strong> Your card was declined. Try another method.
        </div>
      </div>

      <div className="status-actions">
        <Link to="/checkout" className="btn btn-primary">Try Again</Link>
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
      </div>
    </div>
  );
}