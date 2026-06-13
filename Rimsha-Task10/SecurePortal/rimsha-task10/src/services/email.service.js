// EmailJS browser library import kar rahy hain
import emailjs from "@emailjs/browser";

// .env file sy EmailJS credentials le rahy hain
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ==========================================
// SEND CONTACT FORM EMAIL
// ==========================================
// Contact form ka data leta hai
// EmailJS ko call karta hai
// Email actually deliver hoti hai

export const sendContactEmail = async ({ name, email, message }) => {
  // EmailJS ko ye variables bhej rahy hain
  // Template mein {{from_name}}, {{from_email}}, {{message}} se match karte hain
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  // EmailJS send function call kar rahy hain
  const response = await emailjs.send(
    SERVICE_ID,
    CONTACT_TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY,
  );

  // Response return karo
  return response;
};

// ==========================================
// SEND WELCOME EMAIL
// ==========================================
// Naye user ka naam aur email leta hai
// Signup ke baad welcome email bhejta hai

export const sendWelcomeEmail = async ({ name, email }) => {
  // EmailJS ko ye variables bhej rahy hain
  // Template mein {{to_name}}, {{to_email}} se match karte hain
  const templateParams = {
    to_name: name,
    to_email: email,
  };

  const response = await emailjs.send(
    SERVICE_ID,
    WELCOME_TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY,
  );

  return response;
};
