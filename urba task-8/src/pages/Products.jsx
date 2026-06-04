import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useToast } from "../context/ToastContext";

export default function Products({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});
  const toast = useToast();

  // get current quantity for a product (default = 1)
  const getQty = (id) => quantities[id] ?? 1;

  // increase / decrease quantity (min = 1)
  const changeQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  // add product to cart or update quantity if already exists
  const addToCart = (product) => {
    const qty = getQty(product.id);
    const exists = cart.find(i => i.id === product.id);

    if (exists) {
      setCart(cart.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
      ));
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }

    toast(`${product.name} added to cart!`, "success");
  };

  // check if product is already in cart
  const inCart = (id) => cart.find(i => i.id === id);

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Products</h1>
      <p className="page-subtitle">Pick what you need — your cart is waiting.</p>

      <div className="products-grid">
        {PRODUCTS.map(p => (
          <div key={p.id} className="product-card">

            {/* product image */}
            <img src={p.image} alt={p.name} className="product-img" />

            <div className="product-name">{p.name}</div>
            <div className="product-desc">{p.desc}</div>
            <div className="product-price">
              Rs. {p.price.toLocaleString()}
            </div>

            {/* quantity + add actions */}
            <div className="product-actions">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => changeQty(p.id, -1)}>−</button>
                <span className="qty-num">{getQty(p.id)}</span>
                <button className="qty-btn" onClick={() => changeQty(p.id, +1)}>+</button>
              </div>

              <button
                className={`btn ${inCart(p.id) ? "btn-secondary" : "btn-primary"}`}
                onClick={() => addToCart(p)}
              >
                {inCart(p.id) ? "Add More" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* cart shortcut (only if cart has items) */}
      {cart.length > 0 && (
        <div className="cart-cta">
          <Link to="/cart" className="btn btn-primary btn-lg">
            View Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items) →
          </Link>
        </div>
      )}
    </div>
  );
}