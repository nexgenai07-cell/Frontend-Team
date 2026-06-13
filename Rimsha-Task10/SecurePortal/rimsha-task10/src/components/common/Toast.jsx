// useToast — toasts array aur removeToast lene ke liye
import { useToast } from "../../context/ToastContext";

// React Icons
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

// Framer Motion — enter/exit animations ke liye
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// TOAST CONFIG
// ==========================================
// Har type ka alag color aur icon

const TOAST_CONFIG = {
  success: {
    icon: FiCheckCircle,
    bg: "bg-green-900/90",
    border: "border-green-700",
    text: "text-green-400",
    iconColor: "text-green-400",
  },
  error: {
    icon: FiAlertCircle,
    bg: "bg-red-900/90",
    border: "border-red-700",
    text: "text-red-300",
    iconColor: "text-red-400",
  },
  warning: {
    icon: FiAlertTriangle,
    bg: "bg-yellow-900/90",
    border: "border-yellow-700",
    text: "text-yellow-300",
    iconColor: "text-yellow-400",
  },
  info: {
    icon: FiInfo,
    bg: "bg-purple-900/90",
    border: "border-purple-700",
    text: "text-purple-300",
    iconColor: "text-purple-400",
  },
};

const Toast = () => {
  // ToastContext sy toasts array aur removeToast lo
  const { toasts, removeToast } = useToast();

  return (
    // Top right corner mein fixed position
    // Sab toasts yahan stack honge
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          // Is toast ka config lo
          const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              // Enter animation — right se aaye
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              // Exit animation — right ko jaye
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`
                flex items-center gap-3 px-4 py-3
                ${config.bg} ${config.border}
                border rounded-xl shadow-xl backdrop-blur-sm
                w-full
              `}
            >
              {/* Toast Icon */}
              <Icon className={`${config.iconColor} text-lg shrink-0`} />

              {/* Toast Message */}
              <p className={`${config.text} text-sm flex-1`}>{toast.message}</p>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/40 hover:text-white/80 transition-colors shrink-0"
              >
                <FiX className="text-sm" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
