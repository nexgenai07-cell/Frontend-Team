// ============================================================

// Reusable status badge component used to display activity
// status throughout the application.
//
// Supported Statuses:
// • SUCCESS -> Green badge
// • FAILED  -> Red badge
//
// Common Usage:
// • Activity Logs page
// • Login history
// • Security events
// • Action status indicators
// ============================================================

// Import React for JSX support
import React from "react";

// ============================================================
// StatusBadge Component
//
// Props:
// status -> Status text received from parent component
//           Example: "SUCCESS" or "FAILED"
// ============================================================
export default function StatusBadge({ status }) {
  // ==========================================================
  // STATUS CHECK
  //
  // Determines whether the current status represents
  // a successful action.
  //
  // true  -> Use success styling
  // false -> Use failed/error styling
  // ==========================================================
  const isSuccess = status === "SUCCESS";

  return (
    /*
      ========================================================
      STATUS BADGE

      Displays the current status with different colors
      depending on the result.

      Styling:
      inline-block  -> Allows padding while staying inline
      px-3 py-1     -> Horizontal and vertical spacing
      rounded-full  -> Pill-shaped badge
      text-xs       -> Small text size
      font-bold     -> Bold text
      tracking-wide -> Extra letter spacing

      Color States:
      SUCCESS -> Green background and text
      FAILED  -> Red background and text
      ========================================================
    */
    <span
      className={`
        inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide
        ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}
      `}
    >
      {/* Display the status text received through props */}
      {status}
    </span>
  );
}
