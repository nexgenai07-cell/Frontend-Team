import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
// Available payment methods
const PAYMENT_METHODS = [
  { id: "card",   icon: "💳", label: "Credit Card" },
  { id: "upi",    icon: "📱", label: "UPI" },
  { id: "wallet", icon: "👜", label: "Wallet" },
];
// Generate a mock payment intent ID
function generatePaymentIntent() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "pi_";
  for (let i = 0; i < 24; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function Checkout({ cart, setCart, addOrder }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
 // Order details passed from Cart page
  const total    = state?.total    ?? 0;
  const discount = state?.discount ?? 0;
  const coupon   = state?.coupon   ?? null;

  const [payMethod, setPayMethod] = useState("card");
  const [loading,   setLoading]   = useState(false);
  const [intentId,  setIntentId]  = useState(null);

  const [form, setForm] = useState({
    name: "", email: "", address: "",
    cardNumber: "", expiry: "", cvv: "",
    upiId: "",
  });
// Update a specific form field
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
 // Format card number as XXXX XXXX XXXX XXXX
  const formatCard   = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
 // Format expiry as MM/YY
  const formatExpiry = v => v.replace(/\D/g, "").slice(0, 4).replace(/^(.{2})(.+)/, "$1/$2");
 // Validate checkout form before payment
  const validate = () => {
    if (!form.name.trim())             return toast("Enter your full name", "error");
    if (!form.email.includes("@"))     return toast("Enter a valid email", "error");
    if (!form.address.trim())          return toast("Enter your address", "error");
    if (payMethod === "card") {
      if (form.cardNumber.replace(/\s/g, "").length !== 16) return toast("Enter a valid 16-digit card number", "error");
      if (form.expiry.length < 5)      return toast("Enter valid expiry (MM/YY)", "error");
      if (form.cvv.length < 3)         return toast("Enter valid CVV", "error");
    }
    if (payMethod === "upi" && !form.upiId.includes("@")) return toast("Enter a valid UPI ID", "error");
    return true;
  };
  // Simulate payment processing
  const handlePay = async () => {
    if (!validate()) return;

    setLoading(true);
    const pi = generatePaymentIntent();
    setIntentId(pi);
    toast("Processing payment…", "info");

    await new Promise(r => setTimeout(r, 2200));

    const cardLast4 = form.cardNumber.replace(/\s/g, "").slice(-4);
    const shouldFail = payMethod === "card" && cardLast4 === "0000";

    setLoading(false);

    const orderData = {
      id: "ord_" + Math.random().toString(36).slice(2, 8),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      items: cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price * i.quantity })),
      total,
      discount,
      coupon,
      paymentMethod: PAYMENT_METHODS.find(m => m.id === payMethod)?.label,
      paymentIntent: pi,
      status: shouldFail ? "failed" : "succeeded",
    };

    if (shouldFail) {
      addOrder(orderData);
      navigate("/payment-failed", { state: orderData });
    } else {
      setCart([]);
      addOrder(orderData);
      navigate("/payment-success", { state: orderData });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Steps */}
      <div className="steps">
        <div className="step done">
          <div className="step-num">✓</div>
          <span>Cart</span>
        </div>
        <div className="step-line" />
        <div className="step active">
          <div className="step-num">2</div>
          <span>Checkout</span>
        </div>
        <div className="step-line" />
        <div className="step">
          <div className="step-num">3</div>
          <span>Confirmation</span>
        </div>
      </div>

      <div className="checkout-layout">
        {/* Left: forms */}
        <div className="checkout-form-stack">

          {/* Shipping */}
          <div className="card">
            <div className="card-title-lg">Shipping Details</div>
            <div className="form-fields-stack">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Urba Khan" value={form.name} onChange={e => set("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="urba@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input className="form-input" placeholder="Street, City, Pakistan" value={form.address} onChange={e => set("address", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="card">
            <div className="card-title-lg">Payment Method</div>

            <div className="payment-methods">
              {PAYMENT_METHODS.map(m => (
                <div
                  key={m.id}
                  className={`pay-method ${payMethod === m.id ? "selected" : ""}`}
                  onClick={() => setPayMethod(m.id)}
                >
                  <div className="pay-method-icon">{m.icon}</div>
                  {m.label}
                </div>
              ))}
            </div>

            {payMethod === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <div className="card-number-wrap">
                    <input
                      className="form-input card-input-padded"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={e => set("cardNumber", formatCard(e.target.value))}
                    />
                    <span className="card-brand">
                      {form.cardNumber.startsWith("4") ? "💳" : form.cardNumber.startsWith("5") ? "🔶" : "💳"}
                    </span>
                  </div>
                  <p className="card-tip">Tip: use any number. End in 0000 to simulate a failure.</p>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry (MM/YY)</label>
                    <input className="form-input" placeholder="12/27" value={form.expiry} onChange={e => set("expiry", formatExpiry(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input className="form-input" placeholder="123" maxLength={4} value={form.cvv} onChange={e => set("cvv", e.target.value.replace(/\D/g, ""))} />
                  </div>
                </div>
              </div>
            )}

            {payMethod === "upi" && (
              <div className="form-group">
                <label className="form-label">UPI ID</label>
                <input className="form-input" placeholder="yourname@upi" value={form.upiId} onChange={e => set("upiId", e.target.value)} />
              </div>
            )}

            {payMethod === "wallet" && (
              <div className="wallet-info">
                👜 Wallet balance: <strong>Rs. 12,000</strong> — sufficient for this order.
              </div>
            )}
          </div>

          {/* Payment Intent preview */}
          {intentId && (
            <div className="card-sm">
              <div className="intent-label">Payment Intent ID</div>
              <div className="payment-intent-block">{intentId}</div>
              <div className="intent-status-row">
                <span className="badge badge-warning">⏳ processing</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <div>
          <div className="card">
            <div className="card-title-lg">Order Summary</div>

            {cart.map(i => (
              <div key={i.id} className="summary-row">
                <span>{i.emoji} {i.name} ×{i.quantity}</span>
                <span>Rs. {(i.price * i.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div className="divider" />

            {discount > 0 && (
              <div className="summary-row">
                <span>Coupon ({coupon})</span>
                <span className="text-success">− Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>

            <div className="divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <div className="pay-btn-wrap">
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={handlePay}
                disabled={loading || cart.length === 0}
              >
                {loading ? <><span className="spinner" /> Processing…</> : `Pay Rs. ${total.toLocaleString()}`}
              </button>
            </div>

            <div className="secure-notice">
              🔒 Secured via Stripe-style encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}