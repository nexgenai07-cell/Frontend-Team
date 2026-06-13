// useState — loading, error state ke liye
import { useState } from "react";

// useNavigate — pages ke beech navigate karne ke liye
import { useNavigate } from "react-router-dom";

// payment.service.js sy functions import kar rahy hain
import { redirectToCheckout, PLANS } from "../../services/payment.service";

const useStripe = () => {
  // Loading state — Stripe load hone tak
  const [loading, setLoading] = useState(false);

  // Error state — payment fail hone pe
  const [error, setError] = useState(null);

  // Selected plan — user ne kaunsa plan choose kiya
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();

  // ==========================================
  // HANDLE PLAN SELECT
  // ==========================================
  // PricingPage.jsx is function ko call karegi
  // plan object leta hai

  const handlePlanSelect = async (plan) => {
    // Basic plan — free hai — checkout nahi hoga
    if (plan.priceId === null) {
      navigate("/dashboard");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Selected plan save karo
      setSelectedPlan(plan);

      // Checkout page pe jao — plan info ke saath
      navigate("/checkout", { state: { plan } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE CHECKOUT
  // ==========================================
  // CheckoutPage.jsx is function ko call karegi
  // plan object leta hai — Stripe Checkout pe redirect karta hai

  const handleCheckout = async (plan) => {
    try {
      setLoading(true);
      setError(null);

      // Stripe Checkout pe redirect karo
      // payment.service.js ne handle karega
      await redirectToCheckout(plan);
    } catch (err) {
      // Stripe price ID real nahi hai — test ke liye
      // Payment failure page pe bhejo
      navigate("/payment-failure", {
        state: {
          error: err.message,
          plan: plan,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // PricingPage aur CheckoutPage ko ye cheezein mileingi
  return {
    loading,
    error,
    selectedPlan,
    plans: PLANS,
    handlePlanSelect,
    handleCheckout,
  };
};

export default useStripe;
