// ============================================================
// Fake/Mock API Data File
// This file contains all mock data used instead of real APIs
// It simulates backend responses for UI development
// ============================================================

// ─── PROFILE DATA ───────────────────────────────────────────
// This object stores all user profile information
export const mockProfile = {
  firstName: "Rimsha", // User's first name
  lastName: "Naeem", // User's last name (short form)
  email: "rimsha.naeem@security.dev", // User's email address
  bio: "Security analyst specializing in cloud infrastructure and identity management.", // Short professional bio
  role: "Account Administrator", // User's role or designation
  memberSince: "2021", // Year when user joined
  securityTier: "GOLD", // Security level (GOLD tier account)
  verified: true, // Account verification status (true = verified)
};

// ─── SECURITY SETTINGS DATA ─────────────────────────────────
// This object contains all security-related settings for the user
export const mockSecuritySettings = {
  twoFactorEnabled: false, // Two-factor authentication status (false = disabled)

  // Notification preferences (security alerts on/off)
  notifications: {
    loginAlerts: true, // Alert when user logs in
    suspiciousActivity: true, // Alert for suspicious activity
    newDeviceLogin: false, // Alert when a new device logs in
  },

  // Account recovery methods (email + phone)
  recovery: {
    email: "ri****@gmail.com", // Masked recovery email for privacy
    emailVerified: true, // Whether recovery email is verified
    phone: "+1 (•••) •••-4592", // Masked recovery phone number
    phoneVerified: false, // Whether phone is verified
  },
};

// ─── ACTIVITY LOGS DATA ─────────────────────────────────────
// This array contains user activity history logs
export const mockActivityLogs = [
  {
    id: 1, // Unique log ID
    dateTime: "Oct 24, 2023 • 14:23", // Date and time of activity
    action: "Account Login", // Type of action performed
    ip: "192.168.1.104", // IP address used
    location: "San Francisco, US", // Geographical location
    status: "SUCCESS", // Status of action (SUCCESS / FAILED)
  },
  {
    id: 2,
    dateTime: "Oct 24, 2023 • 11:05",
    action: "Password Change", // User changed password
    ip: "192.168.1.104",
    location: "San Francisco, US",
    status: "SUCCESS",
  },
  {
    id: 3,
    dateTime: "Oct 23, 2023 • 22:15",
    action: "Failed Login Attempt", // Unsuccessful login attempt
    ip: "45.12.89.201", // Suspicious IP address
    location: "Moscow, RU", // Suspicious location
    status: "FAILED", // Login failed
  },
  {
    id: 4,
    dateTime: "Oct 22, 2023 • 09:44",
    action: "Device Authorized", // New device was authorized
    ip: "192.168.1.104",
    location: "San Francisco, US",
    status: "SUCCESS",
  },
];

// ─── DEVICES DATA ────────────────────────────────────────────
// This array stores all registered devices for the user
export const mockDevices = [
  {
    id: 1, // Unique device ID
    name: 'MacBook Pro 16"', // Device name
    os: "macOS Sonoma 14.2", // Operating system
    lastActive: "Active Now", // Currently active device status
    location: "San Francisco, CA", // Device location
    isCurrent: true, // This is the current logged-in device
    icon: "laptop", // Icon type for UI rendering
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    os: "iOS 17.1",
    lastActive: "2 hours ago", // Last active time
    location: "San Francisco, CA",
    isCurrent: false, // Not the current device
    icon: "phone",
  },
  {
    id: 3,
    name: "iPad Air",
    os: "iPadOS 17.0",
    lastActive: "Oct 20, 2023", // Last active date
    location: "San Francisco, CA",
    isCurrent: false,
    icon: "tablet",
  },
];
