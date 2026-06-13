// useLocation — error data lene ke liye
// useNavigate — retry ke liye
import { useLocation, useNavigate } from "react-router-dom";

// useEffect — payment stat save karne ke liye
import { useEffect } from "react";

// savePaymentStat — local storage mein save karne ke liye
import { savePaymentStat } from "../../services/payment.service";

// React Icons
import {
  FiShield,
  FiAlertCircle,
  FiRefreshCw,
  FiMessageSquare,
} from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

const PaymentFailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Error data lo
  const plan = location.state?.plan;
  const errorMessage =
    location.state?.error || "Your payment could not be processed.";

  // Payment stat local storage mein save karo
  useEffect(() => {
    savePaymentStat("failed", plan?.name || "Unknown", plan?.price || 0);
  }, []);

  // Transaction ID
  const transactionId = `SEC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0D0D1A] border-b border-purple-900/50 px-4 md:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-white font-bold">SecurePortal</span>
          <div className="flex items-center gap-3">
            <FiShield className="text-purple-400" />
            <span className="text-purple-700 text-xs">©</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#1A1A2E] border border-red-900/50 rounded-2xl p-8"
        >
          {/* Failure Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="bg-red-500/20 p-4 rounded-full"
            >
              <FiAlertCircle className="text-red-400 text-5xl" />
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">
            Payment Failed
          </h1>
          <p className="text-purple-400 text-sm text-center mb-6">
            We were unable to process your transaction. Your bank may have
            declined the authorization request due to insufficient funds or a
            security block.
          </p>

          {/* Error Reason */}
          <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-xs font-semibold mb-1 flex items-center gap-1">
              <FiAlertCircle className="text-xs" />
              Error Reason
            </p>
            <p className="text-red-300 text-xs leading-relaxed">
              {errorMessage} Please verify with your financial institution or
              try an alternative payment method.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Try Again */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/checkout", { state: { plan } })}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <FiRefreshCw className="text-sm" />
              Try Again
            </motion.button>

            {/* Contact Support */}
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center justify-center gap-1 text-purple-400 hover:text-purple-200 text-sm transition-colors"
            >
              <FiMessageSquare className="text-xs" />
              Contact Support
            </button>

            {/* Return to Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="text-purple-600 hover:text-purple-400 text-sm transition-colors text-center"
            >
              Return to Dashboard
            </button>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-purple-900/40">
            <div>
              <p className="text-purple-700 text-xs">AMOUNT DUE</p>
              <p className="text-white text-sm font-semibold">
                ${plan?.price || "0"}.00 USD
              </p>
            </div>
            <div className="text-right">
              <p className="text-purple-700 text-xs">TRANSACTION ID</p>
              <p className="text-white text-sm font-mono">{transactionId}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-purple-900/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="text-purple-700 text-xs">SecurePortal</span>
          <div className="flex items-center gap-4">
            <span className="text-purple-700 text-xs cursor-pointer">
              Terms
            </span>
            <span className="text-purple-700 text-xs cursor-pointer">
              Privacy
            </span>
          </div>
          <span className="text-purple-700 text-xs">
            © 2024 SecurePortal. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
