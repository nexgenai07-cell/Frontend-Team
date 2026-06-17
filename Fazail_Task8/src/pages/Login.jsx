import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { loginUser } from "../services/authService";

export default function Login() {
  // Controls password visibility (show/hide password)
  const [showPassword, setShowPassword] = useState(false);

  // Controls loading state during API request
  const [loading, setLoading] = useState(false);

  // Stores error messages from login failures
  const [error, setError] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Stores form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handles changes in input fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      // Updates the corresponding field dynamically
      [e.target.name]: e.target.value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Clear previous error messages
    setError("");

    try {
      // Show loading state
      setLoading(true);

      // Send login request to API
      const response = await loginUser(formData);

      // Log API response for debugging
      console.log(response);

      // Save authentication token in localStorage
      localStorage.setItem("token", response.token);

      // Redirect user to dashboard after successful login
      navigate("/dashboard");

    } catch (err) {
      // Display API error message if available
      setError(
        err.response?.data?.error ||
        "Login failed. Please try again."
      );
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-blue-600" size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          {error && (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
    {error}
  </div>
)}
          {/* Button */}
       <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
>
  {loading ? "Logging in..." : "Login"}
</button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-sm text-slate-400">
            OR
          </span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Register */}
        <p className="text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}