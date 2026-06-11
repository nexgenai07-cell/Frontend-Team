import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  // State for storing user's email input
  const [email, setEmail] = useState("");

  // State to show success message after reset request
  const [success, setSuccess] = useState(false);

  // State for loading button while request is processing
  const [loading, setLoading] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handles form submission
  const handleReset = (e) => {
    e.preventDefault();

    // Show loading state
    setLoading(true);

    // Navigate to reset password page
    navigate("/reset-password");

    // Simulate API request delay
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail
              size={36}
              className="text-blue-600"
            />
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Forgot Password?
          </h1>

          <p className="text-slate-500 mt-3">
            Don't worry. Enter your email and we'll
            send you a password reset link.
          </p>
        </div>

        {/* Show success message after email is sent */}
        {success ? (
          <div className="space-y-5">
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-center">
              Password reset link has been sent to
              your email.
            </div>

            {/* Navigate back to login page */}
            <Link
              to="/"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          /* Reset Password Form */
          <form
            onSubmit={handleReset}
            className="space-y-5"
          >
            {/* Email Input Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">
                {/* Email Icon inside input */}
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

            {/* Back to Login Link */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 text-sm"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}