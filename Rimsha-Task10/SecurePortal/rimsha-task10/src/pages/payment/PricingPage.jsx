// useNavigate — checkout pe jaane ke liye
import { useNavigate } from "react-router-dom";

// useStripe hook — payment logic ke liye
import useStripe from "../../hooks/payment/useStripe";

// React Icons
import {
  FiCheck,
  FiX,
  FiShield,
  FiBell,
  FiUser,
  FiZap,
  FiLock,
  FiTrendingUp,
} from "react-icons/fi";

// Framer Motion
import { motion } from "framer-motion";

const PricingPage = () => {
  const navigate = useNavigate();

  // useStripe hook sy plans aur handlePlanSelect lo
  const { plans, handlePlanSelect, loading } = useStripe();

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      {/* ========================================== */}
      {/* TOP NAVBAR */}
      {/* ========================================== */}
      <div className="bg-[#0D0D1A] border-b border-purple-900/50 px-4 md:px-6 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-white font-bold text-lg">SecurePortal</span>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/dashboard"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/pricing"
              className="text-white text-sm font-semibold border-b-2 border-purple-500 pb-1"
            >
              Pricing
            </a>
            <a
              href="/search"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Documentation
            </a>
            <a
              href="/contact"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Support
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiBell className="text-lg" />
            </button>
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiUser className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* HERO SECTION */}
      {/* ========================================== */}
      <div className="text-center py-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-4xl md:text-5xl font-bold mb-4"
        >
          Choose Your Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-purple-400 text-sm md:text-base max-w-xl mx-auto"
        >
          Secure your digital infrastructure with enterprise-grade protection.
          Scalable solutions for developers and global teams.
        </motion.p>
      </div>

      {/* ========================================== */}
      {/* PRICING CARDS */}
      {/* ========================================== */}
      <div className="max-w-6xl mx-auto px-4 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
                plan.highlighted
                  ? "bg-[#1A1A2E] border-2 border-purple-500 shadow-xl shadow-purple-900/30 scale-105"
                  : "bg-[#1A1A2E] border border-purple-900/60"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-linear-to-r from-purple-600 to-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name + Price */}
              <div>
                <p className="text-purple-400 text-sm font-semibold mb-1">
                  {plan.name}
                </p>
                <p className="text-white text-4xl font-bold">
                  {plan.price === 0 ? "Free" : `$${plan.price}`}
                  {plan.price > 0 && (
                    <span className="text-purple-500 text-sm font-normal">
                      /mo
                    </span>
                  )}
                </p>
                <p className="text-purple-500 text-xs mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-2 flex-1">
                {plan.features.map((feature, i) => {
                  const isDisabled = plan.disabledFeatures.includes(feature);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      {isDisabled ? (
                        <FiX className="text-purple-800 shrink-0" />
                      ) : (
                        <FiCheck
                          className={`shrink-0 ${plan.highlighted ? "text-purple-400" : "text-purple-500"}`}
                        />
                      )}
                      <span
                        className={`text-sm ${isDisabled ? "text-purple-800" : "text-purple-300"}`}
                      >
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect(plan)}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.highlighted
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-transparent border border-purple-700 text-purple-300 hover:border-purple-500 hover:text-white"
                }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* BOTTOM FEATURES SECTION */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <div className="bg-purple-900/30 p-3 rounded-xl w-fit">
              <FiLock className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-semibold">End-to-End Encryption</h3>
            <p className="text-purple-500 text-sm leading-relaxed">
              We use AES-256 bit encryption for all data at rest and TLS 1.3 for
              all data in transit, ensuring your sensitive information stays
              private.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="bg-yellow-900/30 p-3 rounded-xl w-fit">
              <FiZap className="text-yellow-400 text-2xl" />
            </div>
            <h3 className="text-white font-semibold">Low Latency</h3>
            <p className="text-purple-500 text-sm leading-relaxed">
              Global edge networks minimize authentication lag. Your users get
              instant access without compromising security.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <div className="bg-purple-900/30 p-3 rounded-xl w-fit">
              <FiTrendingUp className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-semibold">Deep Insights</h3>
            <p className="text-purple-500 text-sm leading-relaxed">
              Real-time threat monitoring and behavioral analysis to keep your
              enterprise one step ahead.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-purple-900/50 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="text-purple-700 text-xs">
            SecurePortal © 2024. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Cookies
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiShield className="text-purple-700 text-xs" />
            <span className="text-purple-700 text-xs">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
