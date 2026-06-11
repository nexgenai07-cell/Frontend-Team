import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import PasswordStrength from "../components/PasswordStrength";
import { registerUser } from "../services/authService";

export default function Signup() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Controls password visibility
  const [showPassword, setShowPassword] =
    useState(false);

  // Controls confirm password visibility
  const [showConfirm, setShowConfirm] =
    useState(false);

  // Loading state during API call
  const [loading, setLoading] =
    useState(false);

  // Stores error messages
  const [error, setError] = useState("");

  // Form state containing all input values
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });

  // Handles all form input changes
  const handleChange = (e) => {
    const {
      name,      // input name
      value,     // input value
      type,      // input type
      checked,   // checkbox state
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      // For checkbox use checked,
      // otherwise use input value
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // Check if password and confirm password match
  const passwordsMatch =
    formData.password ===
    formData.confirmPassword;

  // Determines if form can be submitted
  const canSubmit =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.agree &&
    passwordsMatch;

  // Handles form submission
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate passwords
    if (!passwordsMatch) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {
      // Show loading state
      setLoading(true);

      // Send registration request
      const response =
        await registerUser({
          email: formData.email,
          password:
            formData.password,
        });

      // Save token in browser storage
      localStorage.setItem(
        "token",
        response.token
      );

      // Redirect to OTP verification page
      navigate("/otp");
    } catch (err) {
      // Display API error message
      setError(
        err.response?.data?.error ||
          "Registration failed"
      );
    } finally {
      // Hide loading spinner/button state
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join us today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-4 text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={
                handleChange
              }
              required
              className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-4 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={
                handleChange
              }
              required
              className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-4 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <div className="mt-3">
              <PasswordStrength
                password={
                  formData.password
                }
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                required
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-3 top-4 text-slate-500"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {formData.confirmPassword && (
              <p
                className={`mt-2 text-sm ${
                  passwordsMatch
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name="agree"
              checked={
                formData.agree
              }
              onChange={
                handleChange
              }
              required
            />
            I agree to Terms &
            Conditions
          </label>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={
              !canSubmit ||
              loading
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

