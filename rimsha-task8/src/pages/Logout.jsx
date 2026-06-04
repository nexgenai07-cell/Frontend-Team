// ============================================================
// Displays a confirmation screen before logging out.
// Users can either cancel the action or confirm logout.
// ============================================================

// Import React library
import React from "react";

// Import logout icon
import { FiLogOut } from "react-icons/fi";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Main Logout component
export default function Logout() {
  // Hook used for programmatic navigation between routes
  const navigate = useNavigate();

  // Handles logout confirmation
  const handleLogout = () => {
    // Display success message
    alert("Logged Out Successfully");

    // Redirect user back to profile page
    navigate("/profile");
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Main logout confirmation card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col items-center text-center">
          {/* Logout icon container */}
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-5">
            <FiLogOut size={34} className="text-red-600" />
          </div>

          {/* Page heading */}
          <h2 className="text-2xl font-bold text-[#1a3c34] mb-2">Logout</h2>

          {/* Confirmation message */}
          <p className="text-gray-500 mb-8">
            Are you sure you want to logout from your account?
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Cancel button - returns user to profile page */}
            <button
              onClick={() => navigate("/profile")}
              className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            {/* Confirm logout button */}
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-lg bg-[#1a3c34] hover:bg-[#0f6e56] text-white font-medium transition"
            >
              Confirm Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
