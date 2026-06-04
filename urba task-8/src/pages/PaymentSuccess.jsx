import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const toast = useToast();

  // success toast on mount
  useEffect(() => {
    toast("Payment successful! 🎉", "success");
  }, []);

  // fallback order data
  const order = state ?? {
    id: "ord_demo",
    date: "Today",
    total: 0,
    paymentMethod: "Card",
    paymentIntent: "pi_demo",
    items: [],
    coupon: null,
    discount: 0,
  };

  return (
    <div className="status-page">
      <div className="status-icon success">🎉</div>

      <h1 className="status-title">Payment Successful!</h1>
      <p className="status-subtitle">Your order is confirmed and on its way.</p>

      <div className="status-details">

        {/* order summary */}
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

        {/* discount (if applied) */}
        {order.discount > 0 && (
          <div className="status-detail-row">
            <span>Discount Applied</span>
            <span className="status-discount">
              − Rs. {order.discount.toLocaleString()}
            </span>
          </div>
        )}

        <div className="status-detail-row">
          <span>Amount Paid</span>
          <span className="status-amount">
            Rs. {order.total.toLocaleString()}
          </span>
        </div>

        {/* payment confirmation block */}
        <div className="intent-section">
          <div className="payment-intent-block">
            {order.paymentIntent}
          </div>

          <div className="intent-status-row">
            <span className="badge badge-success">✓ succeeded</span>
            <span className="intent-confirm-text">
              Stripe confirms payment
            </span>
          </div>
        </div>
      </div>

      {/* items list (if any) */}
      {order.items?.length > 0 && (
        <div className="status-details">
          <div className="items-section-title">Items Ordered</div>

          {order.items.map((item, i) => (
            <div key={i} className="status-detail-row">
              <span>{item.name} ×{item.qty}</span>
              <span>Rs. {item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* navigation */}
      <div className="status-actions">
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link to="/order-history" className="btn btn-secondary">
          View Orders
        </Link>
      </div>
    </div>
  );
}