# 🔐 Secure User Portal

A React-based authentication and security dashboard built to practice login systems, OTP verification, two-factor authentication, email integration, search APIs, and payment flows.

---

## 👩‍💻 Project Info

- **Created By:** Urba Zahid
- **Date:** 13 June 2026
- **Project Type:** React Intermediate — Secure User Portal (Authentication + Search + Email + Payments)

---

## 🚀 Features

- Signup, Login, Logout
- Forgot/Reset Password (with password strength meter + suggested password generator)
- OTP Verification on signup (with resend + expiry timer)
- Two-Factor Authentication (Enable/Disable with OTP confirmation, OTP required on every login once enabled)
- Protected Routes (Dashboard, Search, Pricing, Contact)
- EmailJS integration — OTP emails + Contact form emails
- Wikipedia Search — debounced autocomplete, results page, search history
- Stripe Checkout (sandbox) — Pricing page with Free/Pro plans, payment success page
- Dashboard with live stats (Login Attempts, OTP Requests, 2FA Status, Emails Sent, Recent Searches, Payments, Billing plan)
- Local Storage + Session Storage for users, sessions, history, and counters

---

## 🧩 Tech Stack

- React JS (Vite) + JavaScript (ES6+)
- React Hooks — useState, useEffect, useRef
- React Router (Protected Routes)
- Context API (AuthContext)
- Local Storage + Session Storage
- EmailJS (@emailjs/browser)
- Wikipedia OpenSearch API
- Stripe Payment Links (test mode)
- CSS (dark glassmorphism theme)
- react-icons

---

## 📦 Setup

```bash
npm install
```

---

## ▶️ Run Project

```bash
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

## 🔄 Authentication Flow
User signs up (email + password)

↓

OTP generated + emailed to user

↓

User enters OTP on verification page

↓

Account marked as verified

↓

User logs in

↓

Is 2FA enabled for this account?

↓ Yes              ↓ No

OTP sent + verified   Session created

↓                    ↓

Session created      → Dashboard

↓

→ Dashboard

---

## 📂 Storage Keys

| Key | Storage | Value |
|-----|---------|-------|
| `users` | localStorage | Array of `{id, email, password, isVerified, twoFAEnabled, createdAt}` |
| `currentUser` | sessionStorage | `{id, email}` |
| `otp` | sessionStorage | `{email, code, expiry}` |
| `searchHistory` | localStorage | Last 8 search queries |
| `loginAttempts` | localStorage | Count of login attempts |
| `otpRequests` | localStorage | Count of OTPs generated |
| `emailsSent` | localStorage | Count of emails sent |
| `successfulPayments` | localStorage | Count of successful payments |
| `currentPlan` | localStorage | `"free"` or `"pro"` |

---

## 🎯 Concepts Practiced

- OTP generation, verification, resend & expiry
- Two-Factor Authentication flow (enable/disable/verify)
- Password strength validation + password generator
- Protected routing with React Router
- EmailJS integration (real email sending)
- Debounced search with autocomplete
- Stripe Checkout (sandbox payment links)
- Tracking app stats using Local Storage counters
- Context API for global auth state