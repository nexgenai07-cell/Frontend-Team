import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import OrderHistory from "./pages/OrderHistory";
import "./index.css";

export default function App() {
  // global cart state
  const [cart, setCart] = useState([]);

  // stored orders history
  const [orders, setOrders] = useState([]);

  // total items in cart (navbar badge)
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // add new order to history
  const addOrder = (order) => setOrders(prev => [order, ...prev]);

  return (
    <BrowserRouter>
      <ToastProvider>

        {/* top navigation */}
        <Navbar cartCount={cartCount} />

        {/* app routes */}
        <Routes>

          {/* default redirect */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route
            path="/products"
            element={<Products cart={cart} setCart={setCart} />}
          />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
                addOrder={addOrder}
              />
            }
          />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

          <Route
            path="/order-history"
            element={<OrderHistory orders={orders} />}
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}