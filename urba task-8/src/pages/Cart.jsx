import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COUPONS } from "../data/products";
import { useToast } from "../context/ToastContext";

export default function Cart({ cart, setCart }) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
 // Calculate order amounts
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round(subtotal * appliedCoupon.value / 100)
      : appliedCoupon.value
    : 0;

  const total = Math.max(0, subtotal - discount);
  // Remove product from cart
  const removeItem = (id) => {
    setCart(cart.filter(i => i.id !== id));
    toast("Item removed", "info");
  };
  // Increase or decrease product quantity
  const updateQty = (id, delta) => {
    setCart(cart.map(i =>
      i.id === id
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    ));
  };
 // Validate and apply coupon code
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(COUPONS[code]);
      toast(`Coupon applied: ${COUPONS[code].label}`, "success");
    } else {
      toast("Invalid coupon code", "error");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast("Coupon removed", "info");
  };
  // Render empty cart state
  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">Your cart is empty</div>
          <div className="empty-state-text">Add some products to get started</div>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Cart</h1>
      <p className="page-subtitle">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>

      <div className="cart-layout">
        {/* Left: items */}
        <div className="card">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">Rs. {item.price.toLocaleString()} each</div>
              </div>
              <div className="cart-item-right">
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                </div>
                <span className="cart-item-total">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: sidebar */}
        <div className="cart-sidebar">
          {/* Coupon */}
          <div className="card">
            <div className="card-title">Coupon Code</div>
            {appliedCoupon ? (
              <div className="coupon-applied">
                <span className="badge badge-success">✓ {couponCode.toUpperCase()} — {appliedCoupon.label}</span>
                <button className="btn btn-secondary btn-sm" onClick={removeCoupon}>Remove</button>
              </div>
            ) : (
              <div className="coupon-row">
                <input
                  className="form-input"
                  placeholder="Enter code (try SAVE10)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                />
                <button className="btn btn-secondary" onClick={applyCoupon}>Apply</button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="card">
            <div className="card-title">Order Summary</div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            {appliedCoupon && (
              <div className="summary-row">
                <span>Discount</span>
                <span className="discount">− Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <div className="checkout-btn-wrap">
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={() => navigate("/checkout", { state: { total, discount, coupon: couponCode.toUpperCase() || null } })}
              >
                Proceed to Checkout →
              </button>
            </div>

            <Link to="/products" className="continue-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}