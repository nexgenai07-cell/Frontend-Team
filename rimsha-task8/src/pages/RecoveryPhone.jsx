// ============================================================
// Allows users to add a recovery phone number
// for additional account security and recovery.
// ============================================================

// React hook for managing input state
import React, { useState } from "react";

// React Router hook for page navigation
import { useNavigate } from "react-router-dom";

export default function RecoveryPhone() {
  // Stores the phone number entered by the user
  const [phone, setPhone] = useState("");

  // Used to navigate between routes programmatically
  const navigate = useNavigate();

  return (
    // Main container card
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* Page title */}
      <h2 className="text-xl font-semibold text-green-700 mb-2">
        Recovery Phone
      </h2>

      {/* Page description */}
      <p className="text-gray-500 mb-4">
        Add a recovery phone number for account security.
      </p>

      {/* Phone number input field */}
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        // Update phone state when user types
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        {/* Return to Security Settings without saving */}
        <button
          onClick={() => navigate("/security")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        {/* Save phone number and return to Security Settings */}
        <button
          onClick={() => navigate("/security")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Phone
        </button>
      </div>
    </div>
  );
}
