// Supabase client import kar rahy hain
// Ye wahi connection hai jo humny lib/supabase.js mein banaya tha
import { supabase } from "../lib/supabase";

// ==========================================
// LOGIN FUNCTION
// ==========================================
// email aur password leta hai
// Supabase ko call karta hai
// data ya error return karta hai

export const loginUser = async (email, password) => {
  // Supabase ki signInWithPassword function call kar rahy hain
  // Ye internally JWT banata hai aur session save karta hai
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Agar error aaya — throw kar do
  // useLogin.js mein catch ho jaega
  if (error) throw error;

  // Sab theek — data return karo
  return data;
};

// ==========================================
// SIGNUP FUNCTION
// ==========================================
// email, password aur name leta hai
// Supabase mein naya user banata hai
// name — Supabase ke user metadata mein save hoga

export const signupUser = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // User ka naam Supabase ke user metadata mein save hoga
        full_name: name,
      },
    },
  });

  if (error) throw error;
  return data;
};

// ==========================================
// LOGOUT FUNCTION
// ==========================================
// Supabase ki session delete karta hai
// AuthContext automatically update ho jaega

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// ==========================================
// FORGOT PASSWORD FUNCTION
// ==========================================
// email leta hai
// Supabase ko call karta hai
// Supabase khud reset email bhejta hai

export const forgotPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
};

// ==========================================
// RESET PASSWORD FUNCTION
// ==========================================
// newPassword leta hai
// Supabase session mein jo user hai us ka password update karta hai

export const resetPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
};

// ==========================================
// SEND OTP FUNCTION
// ==========================================
// email leta hai
// Supabase khud OTP generate karke email bhejta hai

export const sendOTP = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) throw error;
};

// ==========================================
// VERIFY OTP FUNCTION
// ==========================================
// email aur otp code leta hai
// Supabase se verify karta hai

export const verifyOTP = async (email, token) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;
  return data;
};

// ==========================================
// 2FA ENROLL FUNCTION
// ==========================================
// 2FA setup shuru karta hai
// Supabase secret key banata hai
// QR code aur secret key return karta hai

export const enroll2FA = async () => {
  const { data, error } = await supabase.auth.mfa.enroll({
    // TOTP — Time based One Time Password
    // Google Authenticator is type ko support karta hai
    factorType: "totp",
    // Authenticator app mein ye naam dikhega
    issuer: "SecurePortal",
    friendlyName: "SecurePortal Authenticator",
  });

  if (error) throw error;

  // data mein ye hoga:
  // data.totp.qr_code — QR code image URL
  // data.totp.secret — secret key text
  // data.id — factor id — verify karne ke liye chahiye
  return data;
};

// ==========================================
// VERIFY 2FA SETUP FUNCTION
// ==========================================
// setup ke waqt QR scan ke baad code verify karta hai
// factorId aur code leta hai

export const verify2FASetup = async (factorId, code) => {
  // Pehle challenge banao — Supabase se permission lo verify karne ki
  const { data: challengeData, error: challengeError } =
    await supabase.auth.mfa.challenge({ factorId });

  if (challengeError) throw challengeError;

  // Ab code verify karo
  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challengeData.id,
    code,
  });

  if (error) throw error;
  return data;
};

// ==========================================
// VERIFY 2FA LOGIN FUNCTION
// ==========================================
// login ke waqt 2FA code verify karta hai
// factorId aur code leta hai

export const verify2FALogin = async (factorId, code) => {
  // Challenge banao
  const { data: challengeData, error: challengeError } =
    await supabase.auth.mfa.challenge({ factorId });

  if (challengeError) throw challengeError;

  // Code verify karo
  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challengeData.id,
    code,
  });

  if (error) throw error;
  return data;
};

// ==========================================
// DISABLE 2FA FUNCTION
// ==========================================
// factorId leta hai
// Supabase se 2FA remove karta hai

export const disable2FA = async (factorId) => {
  const { error } = await supabase.auth.mfa.unenroll({
    factorId,
  });

  if (error) throw error;
};

// ==========================================
// GET 2FA STATUS FUNCTION
// ==========================================
// check karta hai 2FA enabled hai ya nahi
// factors list return karta hai

export const get2FAStatus = async () => {
  const { data, error } = await supabase.auth.mfa.listFactors();

  if (error) throw error;
  // data.totp ki jagah data.all use karna hai
  const allFactors = data?.all || [];

  // Verified factors — matlab 2FA properly setup hai
  const verifiedFactors = allFactors.filter(
    (factor) => factor.status === "verified",
  );

  return {
    // 2FA enabled hai ya nahi
    isEnabled: verifiedFactors.length > 0,
    // Factor id — disable karne ke liye chahiye
    factorId: verifiedFactors[0]?.id || null,
  };
};

// use2FA.js ka useEffect
//         ↓
// Jab TwoFactorPage.jsx pehli baar khulta hai
//         ↓
// get2FAStatus() call hota hai
//         ↓
// Supabase se check karta hai —
// "is user ka 2FA pehle se ON hai?"
//         ↓
// Haan — isEnabled = true — "2FA Active" screen dikho
// Nahi — isEnabled = false — "Enable 2FA" screen dikho

// emailjs topic

// ✅ Template 1 — Contact Form  by emailjs
// ✅ Template 2 — Welcome Email   by eamiljs
// Verification Email — Supabase khud bhejta hai ✅  by supabase
// Password Reset Email — Supabase khud bhejta hai ✅  by supabase
