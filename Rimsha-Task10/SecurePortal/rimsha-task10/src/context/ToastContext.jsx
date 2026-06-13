// React imports
import { createContext, useContext, useState, useCallback } from "react";

// Toast context banao
// Poori app ko toast dikhane ki ability milegi
const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  // Toasts array — multiple toasts ek saath dikh sakte hain
  const [toasts, setToasts] = useState([]);

  // ==========================================
  // SHOW TOAST FUNCTION
  // ==========================================
  // message — jo dikhana hai
  // type — success, error, warning, info
  // duration — kitne ms baad hatao — default 3000

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    // Unique ID — har toast ka alag ID
    const id = Date.now();

    // Toast array mein add karo
    setToasts((prev) => [...prev, { id, message, type }]);

    // Duration ke baad automatically hatao
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  // ==========================================
  // REMOVE TOAST FUNCTION
  // ==========================================
  // X button dabane pe toast hatao

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook — har jagah sirf useToast() likhna pade
export const useToast = () => {
  return useContext(ToastContext);
};
