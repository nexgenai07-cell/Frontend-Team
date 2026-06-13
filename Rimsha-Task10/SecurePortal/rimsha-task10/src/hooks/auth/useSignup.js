// useState — loading, error, aur success state ke liye
import { useState } from "react";

// signupUser — auth.service.js sy Supabase call
import { signupUser } from "../../services/auth.service";

// validateSignupForm — validators.js sy form validation
import { validateSignupForm } from "../../utils/validators";

// useEmail hook import kar rahy hain — welcome email ke liye
import useEmail from "../email/useEmail";
// import karo
import { useToast } from "../../context/ToastContext";

const useSignup = () => {
  // Loading state — Supabase sy jawab aany tak
  // true — button disable rahega
  // false — sab normal
  const [loading, setLoading] = useState(false);

  // Error state — field wise errors
  // jaise: { name: 'Name is required', email: null, ... }
  const [errors, setErrors] = useState({});

  // Success state — signup ho gaya
  // true — success message dikhao
  // false — form dikhao
  const [success, setSuccess] = useState(false);
  // hook mein lo
  const { showToast } = useToast();

  // useEmail hook sy handleWelcomeEmail le rahy hain
  // Signup ke baad welcome email bhejna hai
  const { handleWelcomeEmail } = useEmail();

  // ==========================================
  // SIGNUP FUNCTION
  // ==========================================
  // SignupPage.jsx is function ko call karegi
  // name, email, password, confirmPassword leta hai

  const signup = async (name, email, password, confirmPassword) => {
    // Pehle form validate karo
    // validateSignupForm — validators.js sy import kiya tha
    const { errors: validationErrors, hasErrors } = validateSignupForm({
      name,
      email,
      password,
      confirmPassword,
    });

    // Errors hain — state mein save karo aur rukjao
    // Supabase ko call mat karo
    if (hasErrors) {
      setErrors(validationErrors);
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    try {
      // Loading shuru — button disable karo
      setLoading(true);

      // Pehle wale errors clear karo
      setErrors({});

      // auth.service.js ko call karo
      // name bhi bhej rahy hain — Supabase user metadata mein save karega
      await signupUser(email, password, name);

      // Signup successful — welcome email bhejo
      // Background mein quietly — error aaye toh signup flow interrupt na ho
      await handleWelcomeEmail(name, email);

      // success pe
      showToast("Account created! Welcome aboard.", "success");
      // Supabase ne user save kar liya
      // Success true karo — success message dikhega
      setSuccess(true);
    } catch (err) {
      // Kuch galat hua — error save karo
      // jaise: email already exists
      setErrors({ general: err.message });

      // error pe
      showToast(err.message || "Signup failed. Please try again.", "error");
    } finally {
      // Chahe success ho ya error —
      // loading hamesha false karo
      setLoading(false);
    }
  };

  // SignupPage.jsx ko ye cheezein mileingi
  return { signup, loading, errors, success };
};

export default useSignup;

// supabase+email js colllectively use
// User ne signup kiya
//         ↓
// Supabase ne user save kiya
//         ↓
// useSignup.js ne success true kiya
//         ↓
// Saath mein Welcome Email bhi bhejo
// handleWelcomeEmail() call karo
//         ↓
// EmailJS ne welcome email deliver kar di
