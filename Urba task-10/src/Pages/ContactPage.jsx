import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiUserLine,
  RiMailLine,
  RiMessage2Line,
  RiErrorWarningLine,
  RiCheckLine,
} from "react-icons/ri";
import { sendContactEmail } from "../utils/emailService";
import { useAuth } from "../context/authcontext";
import "../styles/auth.css";
import "../styles/contact.css";

function ContactPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all fields");
      return;
    }

    setSending(true);
    try {
      await sendContactEmail(name, email, message);
      setSuccess(true);
      setName("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send contact email:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "480px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div className="auth-logo" style={{ marginBottom: 0 }}>
            <RiMessage2Line size={22} color="#fff" />
          </div>
          <a
            className="auth-link"
            onClick={() => navigate("/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem" }}
          >
            <RiArrowLeftLine size={14} /> Back to Dashboard
          </a>
        </div>

        <h1 className="auth-title">Contact Us</h1>
        <p className="auth-subtitle">Have a question or feedback? Send us a message.</p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="field-group">
            <label className="field-label">Your Name</label>
            <div className="input-icon-wrapper">
              <RiUserLine className="input-icon" size={16} />
              <input
                className="auth-input auth-input--icon"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Your Email</label>
            <div className="input-icon-wrapper">
              <RiMailLine className="input-icon" size={16} />
              <input
                className="auth-input auth-input--icon"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Message</label>
            <textarea
              className="contact-textarea"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </div>

          {error && (
            <div className="auth-error">
              <RiErrorWarningLine size={16} /> {error}
            </div>
          )}

          {success && (
            <div className="contact-success">
              <RiCheckLine size={16} /> Message sent successfully!
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactPage;