// ============================================================
// This page manages account security settings including:
// • Password updates
// • Two-Factor Authentication (2FA)
// • Security notifications
// • Recovery methods
// ============================================================

// React and useState hook
import React, { useState } from "react";

// Mock security settings data
import { mockSecuritySettings } from "../data/mockData";

// Reusable toggle switch component
import Toggle from "../components/ui/Toggle";

// Security-related icons
import {
  FiMail,
  FiSmartphone,
  FiAlertCircle,
  FiShield,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function SecuritySettings() {
  // Stores password input values
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  // Controls password visibility for each password field
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  // Stores Two-Factor Authentication status
  const [twoFA, setTwoFA] = useState(mockSecuritySettings.twoFactorEnabled);

  // Stores notification preference settings
  const [notifications, setNotifications] = useState(
    mockSecuritySettings.notifications,
  );

  // Controls password update success state
  const [pwSaved, setPwSaved] = useState(false);

  // ============================================================
  // Password Strength Checker
  // Evaluates password using:
  // • Minimum length
  // • Uppercase letter
  // • Lowercase letter
  // • Number
  // • Special character
  // ============================================================
  const getStrength = (pw) => {
    if (!pw) return "";

    const checks = {
      length: pw.length >= 6,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
    };

    const score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  // Current password strength value
  const pwStrength = getStrength(passwords.newPass);

  // Configuration used by the password strength meter
  const strengthConfig = {
    weak: {
      color: "bg-red-500",
      width: "w-1/3",
      label: "Weak",
      text: "text-red-500",
    },
    medium: {
      color: "bg-yellow-500",
      width: "w-2/3",
      label: "Medium",
      text: "text-yellow-500",
    },
    strong: {
      color: "bg-green-500",
      width: "w-full",
      label: "Strong",
      text: "text-green-600",
    },
  };

  // ============================================================
  // Handles password update validation
  // Checks:
  // • Empty fields
  // • Password requirements
  // • Password confirmation match
  // ============================================================
  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) return;

    const reqs =
      passwords.newPass.length >= 6 &&
      /[A-Z]/.test(passwords.newPass) &&
      /[a-z]/.test(passwords.newPass) &&
      /[0-9]/.test(passwords.newPass) &&
      /[^A-Za-z0-9]/.test(passwords.newPass);

    if (!reqs) return;

    if (passwords.newPass !== passwords.confirm) return;

    // Show success message
    setPwSaved(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setPwSaved(false);
      setPasswords({ current: "", newPass: "", confirm: "" });
    }, 3000);
  };

  // Toggle password visibility for a selected field
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* ==================================================
            CARD 1 — CHANGE PASSWORD
            Allows users to update their account password
            ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-5">
            <FiShield size={20} className="text-[#0f6e56]" />
            <h3 className="text-base font-bold text-gray-800">
              Change Password
            </h3>
          </div>

          <div className="space-y-4">
            {/* Current Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      current: e.target.value,
                    })
                  }
                  placeholder="Enter Current Password"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
                />

                {/* Show / Hide Password Button */}
                <button
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPasswords.newPass ? "text" : "password"}
                  value={passwords.newPass}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      newPass: e.target.value,
                    })
                  }
                  placeholder="Enter New Password"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
                />

                {/* Show / Hide Password Button */}
                <button
                  onClick={() => togglePasswordVisibility("newPass")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.newPass ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {pwStrength && (
                <div className="mt-2">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300
                        ${strengthConfig[pwStrength].color}
                        ${strengthConfig[pwStrength].width}`}
                    />
                  </div>

                  <span
                    className={`text-xs font-semibold mt-1 inline-block uppercase tracking-wide ${strengthConfig[pwStrength].text}`}
                  >
                    {strengthConfig[pwStrength].label}
                  </span>
                </div>
              )}

              {/* Password Requirements Hint */}
              <div className="mt-1.5 px-2.5 py-1.5 bg-green-50 border-l-2 border-green-400 rounded-r-md">
                <p className="text-[11px] text-green-600 leading-relaxed">
                  Use 6+ characters with uppercase, lowercase, number, and
                  special character.
                </p>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirm: e.target.value,
                    })
                  }
                  placeholder="Enter Confirm Password"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
                />

                {/* Show / Hide Password Button */}
                <button
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>

              {/* Validation message if passwords do not match */}
              {passwords.confirm && passwords.newPass !== passwords.confirm && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          {/* Update Password Action Button */}
          <button
            onClick={handlePasswordUpdate}
            className="mt-5 w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1a3c34] hover:bg-[#0f6e56] transition cursor-pointer"
          >
            {pwSaved ? "✓ Password Updated!" : "Update Password"}
          </button>
        </div>
        {/* ==================================================
            CARD 2 — TWO-FACTOR AUTHENTICATION (2FA)
            Adds an extra layer of security to the account
            by requiring a verification code during login
            ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-5">
            <FiSmartphone size={20} className="text-[#0f6e56]" />
            <h3 className="text-base font-bold text-gray-800">
              Two-Factor Authentication
            </h3>
          </div>

          {/* Current 2FA Status Panel */}
          <div
            className={`
              flex items-center gap-3 p-3 rounded-xl border mb-4
              ${
                twoFA
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }
            `}
          >
            <FiAlertCircle
              size={18}
              className={twoFA ? "text-green-600" : "text-red-500"}
            />

            {/* Current status text */}
            <span
              className={`text-sm font-medium ${
                twoFA ? "text-green-700" : "text-red-600"
              }`}
            >
              2FA is currently <strong>{twoFA ? "ENABLED" : "DISABLED"}</strong>
            </span>

            {/* Toggle switch */}
            <div className="ml-auto">
              <Toggle checked={twoFA} onChange={setTwoFA} />
            </div>
          </div>

          {/* Security explanation */}
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Add an extra layer of security to your account by requiring a
            verification code from your phone along with your password.
          </p>

          {/* Enable / Disable 2FA Button */}
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`
              w-full py-2.5 rounded-lg text-sm font-semibold border transition cursor-pointer
              ${
                twoFA
                  ? "border-[#0f6e56] text-[#0f6e56] hover:bg-emerald-50"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            {twoFA ? "Disable 2FA" : "Enable 2FA"}
          </button>
        </div>

        {/* ==================================================
            CARD 3 — SECURITY NOTIFICATIONS
            Manage account security alerts and notifications
            ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-5">
            <FiMail size={20} className="text-[#0f6e56]" />
            <h3 className="text-base font-bold text-gray-800">
              Security Notifications
            </h3>
          </div>

          {/* Notification Settings List */}
          <div className="divide-y divide-gray-100">
            {[
              {
                key: "loginAlerts",
                label: "Login Alerts",
                desc: "Notify me every time someone logs in.",
              },
              {
                key: "suspiciousActivity",
                label: "Suspicious Activity",
                desc: "Alert me of unusual login patterns.",
              },
              {
                key: "newDeviceLogin",
                label: "New Device Login",
                desc: "Alert me when a new device is registered.",
              },
            ].map((item) => (
              /* Individual notification option */
              <div
                key={item.key}
                className="flex items-center justify-between py-4 gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.label}
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>

                {/* Toggle notification preference */}
                <Toggle
                  checked={notifications[item.key]}
                  onChange={(val) =>
                    setNotifications({
                      ...notifications,
                      [item.key]: val,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            CARD 4 — RECOVERY METHODS
            Displays available account recovery options
            ================================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-5">
            <FiShield size={20} className="text-[#0f6e56]" />
            <h3 className="text-base font-bold text-gray-800">
              Recovery Methods
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {/* Recovery Email Information */}
            <div className="bg-gray-50 rounded-xl p-3 md:p-4 flex items-center gap-3">
              <FiMail size={18} className="text-gray-500 shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Recovery Email
                </p>

                <p className="text-sm font-medium text-gray-800 truncate">
                  {mockSecuritySettings.recovery.email}
                </p>
              </div>

              {/* Verification status badge */}
              <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                VERIFIED
              </span>
            </div>

            {/* Recovery Phone Information */}
            <div className="bg-gray-50 rounded-xl p-3 md:p-4 flex items-center gap-3">
              <FiSmartphone size={18} className="text-gray-500 shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone Number
                </p>

                <p className="text-sm font-medium text-gray-800 truncate">
                  {mockSecuritySettings.recovery.phone}
                </p>
              </div>

              {/* Phone verification action */}
              <button className="shrink-0 text-xs font-bold text-red-500 hover:text-red-700 transition cursor-pointer">
                Verify Now
              </button>
            </div>
          </div>

          {/* Recovery Settings Action Button */}
          <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1a3c34] hover:bg-[#0f6e56] transition cursor-pointer">
            Update Recovery Settings
          </button>
        </div>
      </div>
    </div>
  );
}
