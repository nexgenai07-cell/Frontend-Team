// useState — form fields ke liye
import { useState } from "react";

// useEmail hook — email logic ke liye
import useEmail from "../../hooks/email/useEmail";

// React Icons
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";

// Framer Motion — animations ke liye
import { motion } from "framer-motion";

const ContactForm = () => {
  // Form fields ki states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // useEmail hook sy functions aur states le rahy hain
  const { loading, error, success, resetSuccess, handleContactEmail } =
    useEmail();

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    // Page reload hone sy rokna
    e.preventDefault();

    // useEmail ka handleContactEmail function call karo
    await handleContactEmail(name, email, message);
  };

  // ==========================================
  // SUCCESS STATE
  // ==========================================
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1A2E] border border-purple-900 rounded-2xl p-8 text-center"
      >
        {/* Success icon */}
        <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="text-green-400 text-4xl" />
        </div>

        <h2 className="text-white text-xl font-bold mb-3">Message Sent!</h2>
        <p className="text-purple-300 text-sm mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>

        {/* Send another message */}
        <button
          onClick={() => {
            // Form reset karo
            setName("");
            setEmail("");
            setMessage("");
            // Success state reset karo
            resetSuccess();
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1A1A2E] border border-purple-900 rounded-2xl p-8"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-700 p-2 rounded-lg">
          <FiMail className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-white text-xl font-bold">Contact Us</h2>
          <p className="text-purple-400 text-sm">
            We'll respond within 24 hours
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label className="text-purple-300 text-sm">Full Name</label>
          <div className="flex items-center bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors">
            <FiUser className="text-purple-400" />
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800"
            />
          </div>
          <p className="text-purple-600 text-xs mt-1">Enter your full name</p>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-purple-300 text-sm">Email Address</label>
          <div className="flex items-center bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors">
            <FiMail className="text-purple-400" />
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent text-white text-sm py-3 w-full outline-none placeholder-purple-800"
            />
          </div>
          <p className="text-purple-600 text-xs mt-1">
            We'll reply to this email address
          </p>
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1">
          <label className="text-purple-300 text-sm">Message</label>
          <div className="flex items-start bg-[#0D0D1A] border border-purple-900 rounded-lg px-3 gap-2 focus-within:border-purple-500 transition-colors pt-3">
            <FiMessageSquare className="text-purple-400 mt-0.5" />
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="bg-transparent text-white text-sm py-0 w-full outline-none placeholder-purple-800 resize-none"
            />
          </div>
          <p className="text-purple-600 text-xs mt-1">
            Describe your issue or question in detail
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
        >
          <FiSend />
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;

// ## EmailJS — Complete Running Flow

// ---

// ### Jab Contact Form Submit Hota Hai

// ```
// User ne /contact page khola
//         ↓
// App.jsx ne ContactForm.jsx render kiya
//         ↓
// ContactForm.jsx ne useEmail() hook call kiya
//         ↓
// User ne name, email, message fill kiya
// Send Message button dabaya
//         ↓
// ContactForm.jsx ne handleSubmit() call kiya
//         ↓
// useEmail.js — handleContactEmail(name, email, message) chala:
// validateName() — sahi hai?
// validateEmail() — sahi hai?
// message empty toh nahi?
//         ↓
// Sab theek — loading true kiya
//         ↓
// email.service.js — sendContactEmail() call hua:
// templateParams banaya:
//   from_name: name
//   from_email: email
//   message: message
//         ↓
// emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams, PUBLIC_KEY) call hua
//         ↓
// EmailJS ke servers pe request gayi
// EmailJS ne Gmail service se connect kiya
// Email actually deliver ho gayi — teri Gmail pe ✅
//         ↓
// Response aaya — control wapas useEmail.js ko
// setSuccess(true)
// loading false
//         ↓
// ContactForm.jsx ne success screen dikhai:
// "Message Sent!" ✅
// ```

// ---

// ### Jab Signup Hota Hai — Welcome Email

// ```
// User ne SignupPage.jsx pe form fill kiya
// Signup button dabaya
//         ↓
// useSignup.js — signup() chala:
// validate kiya — sab theek
//         ↓
// auth.service.js — signupUser() call hua
// Supabase ne user save kiya ✅
//         ↓
// Control wapas useSignup.js ko aaya
//         ↓
// handleWelcomeEmail(name, email) call hua
//         ↓
// useEmail.js — handleWelcomeEmail() chala:
//         ↓
// email.service.js — sendWelcomeEmail() call hua:
// templateParams banaya:
//   to_name: name
//   to_email: email
//         ↓
// emailjs.send(SERVICE_ID, WELCOME_TEMPLATE_ID, templateParams, PUBLIC_KEY) call hua
//         ↓
// EmailJS ke servers pe request gayi
// Welcome email user ki email pe deliver ho gayi ✅
//         ↓
// Control wapas useSignup.js ko aaya
// setSuccess(true)
//         ↓
// SignupPage.jsx ne "Account Created!" screen dikhai ✅
// ```

// ---

// ### File Flow Summary

// ```
// ContactForm.jsx / SignupPage.jsx
//         ↓
// useEmail.js — validate, loading, error, success
//         ↓
// email.service.js — EmailJS ko call karta hai
//         ↓
// EmailJS servers — email deliver karte hain
// ```

// ---

// flow
// Kya Hoga Is Component Mein
// User ne name, email, message daala
//         ↓
// Send Message button dabaya
//         ↓
// useEmail.js ne validate kiya
//         ↓
// email.service.js ne EmailJS ko call kiya
//         ↓
// Email actually deliver ho gayi
//         ↓
// Success message dikha

// Test Steps
// Contact Form:
// Step 1: http://localhost:5173/contact pe jao
// Step 2: Name, Email, Message fill karo
// Step 3: Send Message button dabao
// Step 4: "Message Sent!" screen dikhe ✅
// Step 5: Teri Gmail inbox check karo — email aai hogi ✅

// Welcome Email:
// Step 1: http://localhost:5173/signup pe jao
// Step 2: Naya account banao
// Step 3: Teri Gmail inbox check karo
// Step 4: Welcome email aai hogi ✅
