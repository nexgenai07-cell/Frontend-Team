import { Link } from "react-router-dom";
// Status styles for different order states
const statusConfig = {
  succeeded: { badge: "badge-success", icon: "✓", label: "Succeeded" },
  failed:    { badge: "badge-danger",  icon: "✕", label: "Failed" },
  pending:   { badge: "badge-warning", icon: "⏳", label: "Pending" },
};

export default function OrderHistory({ orders }) {
 // Render empty state when no orders exist
  if (!orders || orders.length === 0) {
    return (
      <div className="page-wrapper">
        <h1 className="page-title">Order History</h1>
        <p className="page-subtitle">Your completed transactions will appear here.</p>
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <div className="empty-state-title">No orders yet</div>
          <div className="empty-state-text">Complete a checkout and your order will show up here.</div>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Order History</h1>
      <p className="page-subtitle">{orders.length} order{orders.length !== 1 ? "s" : ""} placed.</p>
      {orders.map(order => {
         // Fallback to pending if status is missing
        const sc = statusConfig[order.status] ?? statusConfig.pending;
        return (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-id">#{order.id}</div>
                <div className="order-date">{order.date}</div>
              </div>
              <div>
                <div className="order-total">Rs. {order.total.toLocaleString()}</div>
                <span className={`badge ${sc.badge}`}>{sc.icon} {sc.label}</span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, i) => (
                <span key={i} className="order-item-chip">
                  {item.name} ×{item.qty}
                </span>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-footer-badges">
                <span className="badge badge-purple">{order.paymentMethod}</span>
                {order.coupon && (
                  <span className="badge badge-success">
                    🏷 {order.coupon} — Rs. {order.discount} off
                  </span>
                )}
              </div>
              <span className="order-footer-meta">
                {order.status === "succeeded" ? "Delivered" : "Not charged"}
              </span>
            </div>

            <div className="order-intent-section">
              <div className="order-intent-label">Payment Intent</div>
              <div className="payment-intent-block">{order.paymentIntent}</div>
            </div>
          </div>
        );
      })}

      <div className="order-history-actions">
        <Link to="/products" className="btn btn-secondary">Shop More</Link>
      </div>
    </div>
  );
}