// useLocation — pricing page se plan data lene ke liye
// useNavigate — pages ke beech navigate karne ke liye
import { useLocation, useNavigate } from "react-router-dom";

// useState — cardholder name ke liye
import { useState } from "react";

// useStripe hook — checkout logic ke liye
import useStripe from "../../hooks/payment/useStripe";

// React Icons
import {
  FiShield,
  FiArrowLeft,
  FiLock,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

const CheckoutPage = () => {
  // Pricing page se plan data lo
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  // Cardholder name state
  const [cardholderName, setCardholderName] = useState("");

  // useStripe hook
  const { handleCheckout, loading, error } = useStripe();

  // Plan nahi mila — pricing pe bhejo
  if (!plan) {
    navigate("/pricing");
    return null;
  }

  // Annual price calculate karo — 15% discount
  const annualPrice = (plan.price * 12 * 0.85).toFixed(2);
  const discount = (plan.price * 12 * 0.15).toFixed(2);

  // ==========================================
  // CHECKOUT SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCheckout(plan);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A]">
      {/* ========================================== */}
      {/* TOP BAR */}
      {/* ========================================== */}
      <div className="bg-[#0D0D1A] border-b border-purple-900/50 px-4 md:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 text-purple-400 hover:text-white text-sm transition-colors"
          >
            <FiArrowLeft />
            Back to Dashboard
          </button>
          <span className="text-white font-bold">SecurePortal</span>
          <span className="text-purple-700 text-xs">Support Center</span>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CONTENT */}
      {/* ========================================== */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ========================================== */}
          {/* LEFT — PAYMENT DETAILS */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white text-2xl font-bold mb-6">
              Payment Details
            </h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                <FiAlertCircle />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Cardholder Name */}
              <div className="flex flex-col gap-1">
                <label className="text-purple-300 text-sm">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  required
                  className="bg-[#1A1A2E] border border-purple-900 text-white text-sm py-3 px-4 rounded-xl outline-none focus:border-purple-500 transition-colors placeholder-purple-800"
                />
              </div>

              {/* Card Information — Static UI */}
              <div className="flex flex-col gap-1">
                <label className="text-purple-300 text-sm">
                  Card Information
                </label>
                <div className="bg-[#1A1A2E] border border-purple-900 rounded-xl overflow-hidden">
                  {/* Card Number */}
                  <div className="flex items-center px-4 py-3 border-b border-purple-900/50">
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="bg-transparent text-white text-sm w-full outline-none placeholder-purple-800"
                    />
                  </div>
                  {/* Expiry + CVC */}
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="bg-transparent text-white text-sm w-1/2 px-4 py-3 outline-none placeholder-purple-800 border-r border-purple-900/50"
                    />
                    <div className="flex items-center px-4 py-3 w-1/2 gap-2">
                      <input
                        type="text"
                        placeholder="CVC"
                        className="bg-transparent text-white text-sm w-full outline-none placeholder-purple-800"
                      />
                      <FiLock className="text-purple-600 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Card Hint */}
              <div className="bg-yellow-900/20 border border-yellow-700/50 text-yellow-400 text-xs px-4 py-2 rounded-lg flex items-center gap-2">
                <FiAlertCircle className="shrink-0" />
                Test card: Use{" "}
                <span className="font-mono font-bold ml-1">
                  4242 4242 4242 4242
                </span>
              </div>

              {/* Pay Now Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors mt-2"
              >
                <FiLock className="text-sm" />
                {loading ? "Processing..." : `Pay Now — $${annualPrice}`}
              </motion.button>

              {/* Terms */}
              <p className="text-purple-700 text-xs text-center">
                By clicking Pay Now, you agree to the SecurePortal Terms of
                Service and Privacy Policy. Your subscription will renew
                automatically.
              </p>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-1 text-purple-600 text-xs">
                  <FiShield className="text-xs" />
                  PCI-DSS COMPLIANT
                </div>
                <div className="flex items-center gap-1 text-purple-600 text-xs">
                  <FiLock className="text-xs" />
                  256-BIT ENCRYPTION
                </div>
                <div className="flex items-center gap-1 text-purple-600 text-xs">
                  <FiShield className="text-xs" />
                  FRAUD PROTECTION
                </div>
              </div>
            </form>
          </motion.div>

          {/* ========================================== */}
          {/* RIGHT — ORDER SUMMARY */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="bg-[#1A1A2E] border border-purple-900/60 rounded-2xl p-6 flex flex-col gap-4">
              {/* Plan Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-purple-900/40">
                <div className="bg-purple-900/40 p-2 rounded-lg">
                  <FiShield className="text-purple-400 text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">{plan.name} Pro</p>
                  <p className="text-purple-500 text-xs">Annual Subscription</p>
                </div>
                <p className="text-white font-bold ml-auto">${plan.price}.00</p>
              </div>

              {/* Billing Details */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-purple-400 text-sm">Billing Cycle</span>
                  <span className="text-white text-sm">Billed Yearly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400 text-sm">Subtotal</span>
                  <span className="text-white text-sm">
                    ${(plan.price * 12).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400 text-sm">
                    Annual Discount (15%)
                  </span>
                  <span className="text-green-400 text-sm">-${discount}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between pt-4 border-t border-purple-900/40">
                <span className="text-white font-bold">Total Due</span>
                <span className="text-white font-bold text-xl">
                  ${annualPrice}
                </span>
              </div>
            </div>

            {/* Help Section */}
            <div className="flex items-center gap-3 mt-6 bg-[#1A1A2E] border border-purple-900/60 rounded-xl p-4">
              <div className="bg-purple-900/40 p-2 rounded-lg shrink-0">
                <FiMessageSquare className="text-purple-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Need help?</p>
                <p className="text-purple-500 text-xs">
                  Chat with a security expert
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-purple-900/50 px-6 py-4 mt-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="text-purple-700 text-xs">
            SecurePortal © 2024. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-purple-700 text-xs cursor-pointer hover:text-purple-500 transition-colors">
              Terms
            </span>
            <span className="text-purple-700 text-xs cursor-pointer hover:text-purple-500 transition-colors">
              Privacy
            </span>
            <span className="text-purple-700 text-xs cursor-pointer hover:text-purple-500 transition-colors">
              Contact Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
