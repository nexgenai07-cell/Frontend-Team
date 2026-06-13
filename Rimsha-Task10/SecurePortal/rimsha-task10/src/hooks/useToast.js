// Toast context hook
import { useToast as useToastContext } from "../context/ToastContext";

// ============================================================
// CUSTOM HOOK
// ============================================================

const useToast = () => {
  const { showToast } = useToastContext();

  return {
    showToast,
  };
};

export default useToast;
