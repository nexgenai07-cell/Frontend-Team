// useLocation — payment data lene ke liye
// useNavigate — dashboard pe jaane ke liye
import { useLocation, useNavigate, Link } from "react-router-dom";

// useEffect — payment stat save karne ke liye
import { useEffect } from "react";

// savePaymentStat — local storage mein save karne ke liye
import { savePaymentStat } from "../../services/payment.service";

// React Icons
import { FiShield, FiCheckCircle } from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL params se plan aur amount lo
  const params = new URLSearchParams(location.search);
  const planName = params.get("plan") || "Pro";
  const amount = params.get("amount") || "19";

  // Transaction ID generate karo
  const transactionId = `SP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Payment stat local storage mein save karo
  useEffect(() => {
    savePaymentStat("success", planName, amount);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      {/* Confetti background — colored dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              backgroundColor: [
                "#6C3FC5",
                "#F5A623",
                "#22C55E",
                "#E8D5FF",
                "#A855F7",
              ][Math.floor(Math.random() * 5)],
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#1A1A2E] border border-purple-900 rounded-2xl p-8 relative z-10"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="bg-green-500/20 p-4 rounded-full"
            >
              <FiCheckCircle className="text-green-400 text-5xl" />
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-2">
            Payment Successful!
          </h1>
          <p className="text-purple-400 text-sm text-center mb-8">
            Your transaction has been processed securely. A confirmation email
            has been sent to your inbox.
          </p>

          {/* Payment Details */}
          <div className="bg-[#0D0D1A] rounded-xl p-4 flex flex-col gap-4 mb-6">
            {/* Plan + Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-purple-600 text-xs mb-1">PLAN SELECTED</p>
                <div className="flex items-center gap-1">
                  <FiShield className="text-purple-400 text-xs" />
                  <p className="text-white text-sm font-semibold">
                    {planName} Pro
                  </p>
                </div>
              </div>
              <div>
                <p className="text-purple-600 text-xs mb-1">TOTAL AMOUNT</p>
                <p className="text-green-400 text-sm font-bold">${amount}.00</p>
              </div>
            </div>

            {/* Transaction ID + Date */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-900/40">
              <div>
                <p className="text-purple-600 text-xs mb-1">TRANSACTION ID</p>
                <p className="text-white text-sm font-mono">{transactionId}</p>
              </div>
              <div>
                <p className="text-purple-600 text-xs mb-1">DATE</p>
                <p className="text-white text-sm">{date}</p>
              </div>
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/dashboard")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Go to Dashboard →
          </motion.button>

          {/* Security Note */}
          <p className="text-purple-700 text-xs text-center mt-4 flex items-center justify-center gap-1">
            <FiShield className="text-xs" />
            Secured by SecurePortal 256-bit Encryption
          </p>
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

export default PaymentSuccessPage;
