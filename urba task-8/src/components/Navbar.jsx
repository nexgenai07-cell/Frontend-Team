import { Link, useLocation } from "react-router-dom";

export default function Navbar({ cartCount }) {
  // Get current URL path
  const { pathname } = useLocation();

  // Navigation links
  const links = [
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/order-history", label: "Orders" },
  ];

  return (
    <nav className="navbar">
      {/* Logo / Brand */}
      <Link to="/products" className="navbar-brand">
        ⚡ ShopUI
      </Link>

      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            // Add active class for current page
            className={`nav-link ${pathname === l.to ? "active" : ""}`}
          >
            {l.label}

            {/* Show cart item count */}
            {l.to === "/cart" && cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}