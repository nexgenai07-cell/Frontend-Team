import { createContext, useContext, useState } from "react";
import { sendOTPEmail,sendContactEmail} from "../utils/emailService";
import { incrementCounter } from "../utils/statsTracker";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")) || null
  );

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) return { error: "An account with this email already exists" };

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      isVerified: false,
      twoFAEnabled: false, 
      createdAt: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  const login = (email, password) => {
    incrementCounter("loginAttempts");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email);
    if (!user) return { error: "Email not found" };
    if (!user.isVerified) return { error: "Please verify your email first" };
    if (user.password !== password) return { error: "Wrong password" };

    if (user.twoFAEnabled) {
    generateOTP(email);
    return { requires2FA: true, email };
    }

    return completeLogin(email);
  };

const completeLogin = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);
  if (!user) return { error: "User not found" };

  const sessionUser = { id: user.id, email: user.email };
  sessionStorage.setItem("currentUser", JSON.stringify(sessionUser));
  setCurrentUser(sessionUser);
  return { success: true };
};

const setTwoFA = (email, enabled) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updated = users.map((u) =>
    u.email === email ? { ...u, twoFAEnabled: enabled } : u
  );
  localStorage.setItem("users", JSON.stringify(updated));
  return { success: true };
};

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const resetPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updated = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    return { success: true };
  };

  const generateOTP = (email) => {
  incrementCounter("otpRequests");
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem("otp", JSON.stringify({
    email,
    code: otp,
    expiry: Date.now() + 60 * 1000,
  }));

  sendOTPEmail(email, otp).catch((err) => {
    console.error("Failed to send OTP email:", err);
  });

  return otp;
};

const verifyOTP = (email, enteredCode) => {
  const stored = JSON.parse(sessionStorage.getItem("otp"));

  if (!stored) return { error: "OTP not found, please resend" };
  if (stored.email !== email) return { error: "Invalid OTP session" };
  if (Date.now() > stored.expiry) return { error: "OTP expired, please resend" };
  if (stored.code !== enteredCode) return { error: "Incorrect OTP" };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updated = users.map((u) =>
    u.email === email ? { ...u, isVerified: true } : u
  );
  localStorage.setItem("users", JSON.stringify(updated));
  sessionStorage.removeItem("otp");
  return { success: true };
};

  return (
    <AuthContext.Provider value={{ currentUser, signup, login,completeLogin, logout, resetPassword,generateOTP, verifyOTP,setTwoFA }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}