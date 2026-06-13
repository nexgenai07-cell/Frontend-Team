# 🔐 SecurePortal

A modern React-based secure user portal with authentication, OTP verification, Two-Factor Authentication (2FA), email services, search functionality, payment integration, dashboard analytics, and account management.

---

## 🚀 Features

### Authentication & Security

- User Registration
- User Login
- Forgot Password
- Reset Password
- Password Validation
- Password Suggestions
- Password Generator
- Protected Routes
- Session Management
- Account Recovery Flow
- Toast Notifications

### OTP & Two-Factor Authentication

- OTP Verification
- Enable 2FA
- Disable 2FA
- QR Code Generation
- Google Authenticator Support

### Email System

- Contact Form
- Welcome Emails
- Password Reset Emails
- Email Statistics Tracking

### Search System

- Search Functionality
- Recent Searches
- Saved Searches
- Search History

### Payments

- Pricing Page
- Checkout Flow
- Payment Success Page
- Payment Failure Page
- Payment Statistics Tracking

### Dashboard

- Login Statistics
- OTP Statistics
- Email Statistics
- Search Statistics
- Payment Statistics
- 2FA Status Monitoring
- Recent Activities

### Settings

- Profile Update
- Change Password
- Security Preferences
- Notification Preferences
- Active Sessions
- Delete Account
- Logout

---

# 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Icons

### Backend Services

- Supabase Authentication
- Supabase Database

### APIs & Services

- EmailJS
- SerpAPI
- Stripe Payment Gateway

### Storage

- LocalStorage
- SessionStorage

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd SecurePortal
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

# 📌 Main Functionalities

### Authentication Flow

```text
Signup
   ↓
Login
   ↓
OTP Verification
   ↓
2FA Setup
   ↓
Dashboard Access
```

---

### Payment Flow

```text
Pricing Page
     ↓
Checkout
     ↓
Stripe Payment
     ↓
Success / Failure Page
```

---

### Password Recovery Flow

```text
Forgot Password
      ↓
Reset Email
      ↓
New Password
      ↓
Login
```

---

### Dashboard Flow

```text
LocalStorage
SessionStorage
Supabase
Payment Stats
Search Stats
Email Stats
        ↓
Dashboard Analytics
```

---

# 📊 Statistics Tracking

The application tracks:

- Login Attempts
- OTP Requests
- Email Activity
- Search Activity
- Saved Searches
- Successful Payments
- Failed Payments
- Session Information

---

# 🔒 Security Features

- Protected Routes
- Session Management
- Two-Factor Authentication
- Password Validation
- Password Recovery
- Toast Notifications
- Secure Authentication with Supabase

---
