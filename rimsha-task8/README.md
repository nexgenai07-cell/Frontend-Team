# 🔐 Security Settings Dashboard

A modern **Account Security Management Portal** built with React and Tailwind CSS.  
This project simulates a real-world security center where users can manage and control their account security settings, devices, and activity logs using a clean and responsive UI.

---

## 🚀 Project Overview

This project is a frontend-only **Security Dashboard** designed to practice real-world UI development patterns.

It focuses on building a complete **Account Security System UI** including profile management, password security, device tracking, and activity monitoring.

---

## 📌 Pages Included

### 👤 Profile Settings

- Update user profile (first name, last name, email, bio)
- Avatar with edit button UI
- Security tier badge display
- Verified user badge
- Save / cancel form handling

---

### 🔐 Security Settings

A complete security control center with 4 main sections:

#### 1️⃣ Change Password

- Current password input
- New password input
- Confirm password input
- Password visibility toggle
- Password strength meter (Weak / Medium / Strong)
- Password validation rules:
  - Minimum 6 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character

#### 2️⃣ Two-Factor Authentication (2FA)

- Enable / disable toggle switch
- Security status indicator
- Explanation of 2FA benefit

#### 3️⃣ Security Notifications

- Login alerts toggle
- Suspicious activity alerts toggle
- New device login alerts toggle

#### 4️⃣ Recovery Methods

- Recovery email display
- Recovery phone display
- Verification status UI
- Update recovery settings button

---

### 📜 Activity Logs

- Login activity history UI
- Status badges (SUCCESS / FAILED)
- Device information
- Location tracking
- Time-based activity records

---

### 💻 Device Management

- List of registered devices
- Device type icons (Laptop / Phone / Tablet)
- Last active time display
- Location display
- Remove device functionality
- Protection for current active device

---

### 🚪 Logout Page

- Confirmation UI before logout
- Cancel / confirm actions
- Clean security-style UX

---

## ⚙️ Features

### 🔒 Security Features

- Strong password validation
- Password strength indicator
- Show/hide password toggle
- Two-factor authentication toggle
- Account recovery system UI

### 📱 Device Features

- Active device tracking
- Remove inactive devices
- Current device protection

### 🔔 Notification Features

- Security alerts toggles
- Login activity notifications
- Device login alerts

### 🎨 UI Features

- Fully responsive design
- Modern card-based layout
- Clean Tailwind styling
- Reusable components (Badge, Toggle, StatusBadge)

---

## 🧪 Mock Data (No Backend)

This project uses fake/mock data to simulate APIs:

- `mockProfile` → User profile data
- `mockSecuritySettings` → Security configuration
- `mockDevices` → Device list
- `mockActivityLogs` → Activity history

---

## 🧱 Tech Stack

- ⚛️ React.js (Functional Components)
- 🎨 Tailwind CSS (Styling)
- 🔀 React Router DOM (Navigation)
- 🎯 React Icons (UI Icons)

---

## 📂 Project Structure
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │
│   ├── ui/
│   │   ├── Badge.jsx
│   │   ├── Toggle.jsx
│   │   ├── StatusBadge.jsx
│
├── pages/
│   ├── ProfileSettings.jsx
│   ├── SecuritySettings.jsx
│   ├── ActivityLogs.jsx
│   ├── DeviceManagement.jsx
│   ├── Logout.jsx
│
├── data/
│   ├── mockData.js
│
├── App.jsx
├── index.css

---

## 🚀 How to Run

```bash
npm install
npm run dev
```
