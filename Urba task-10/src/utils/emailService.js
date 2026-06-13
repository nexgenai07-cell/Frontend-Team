import emailjs from "@emailjs/browser";
import { incrementCounter } from "./statsTracker";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_OTP = import.meta.env.VITE_EMAILJS_TEMPLATE_OTP;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;

export const sendOTPEmail = (toEmail, otpCode) => {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_OTP,
    { to_email: toEmail, otp_code: otpCode },
    PUBLIC_KEY
  ).then((res) => {
    incrementCounter("emailsSent");
    return res;
  });
};


export const sendContactEmail = (fromName, fromEmail, message) => {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_CONTACT,
    {
      from_name: fromName,
      from_email: fromEmail,
      message: message,
    },
    PUBLIC_KEY
  ).then((res) => {
    incrementCounter("emailsSent");
    return res;
  });
};
