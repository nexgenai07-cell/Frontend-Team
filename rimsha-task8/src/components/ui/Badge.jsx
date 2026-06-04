// ============================================================

// Reusable badge component used to display small labels,
// tags, or status indicators throughout the application.
//
// Common Examples:
// • SECURITY TIER: GOLD
// • VERIFIED USER
// • Account Status
// • User Labels
//
// Features:
// • Reusable design
// • Multiple color variants
// • Lightweight and flexible
// • Consistent styling across the application
// ============================================================

// Import React for JSX support
import React from "react";

// ============================================================
// BADGE VARIANTS
//
// Defines the visual appearance of each badge type.
//
// gold     -> Used for security tier badges
// verified -> Used for verified account badges
// default  -> Fallback style for any other badge
// ============================================================
const variants = {
  // Gold / Security Tier Badge
  gold: "bg-amber-50 text-amber-700 border border-amber-300",

  // Verified User Badge
  verified: "bg-emerald-50 text-emerald-700 border border-emerald-300",

  // Default Generic Badge
  default: "bg-gray-100 text-gray-600 border border-gray-300",
};

// ============================================================
// Badge Component
//
// Props:
// label   -> Text displayed inside the badge
// variant -> Visual style to apply
//
// Example:
// <Badge label="VERIFIED USER" variant="verified" />
// ============================================================
export default function Badge({ label, variant = "default" }) {
  // ==========================================================
  // SELECT BADGE STYLE
  //
  // Retrieves the matching style based on the provided
  // variant name.
  //
  // If the variant does not exist, the default style
  // is applied automatically.
  // ==========================================================
  const style = variants[variant] || variants.default;

  return (
    /*
      ========================================================
      BADGE ELEMENT

      Displays a small pill-shaped label.

      Styling:
      inline-flex     -> Align content horizontally
      items-center    -> Vertically center content
      px-3 py-0.5     -> Internal spacing
      rounded-full    -> Creates pill shape
      text-xs         -> Small font size
      font-semibold   -> Semi-bold text
      tracking-wide   -> Extra spacing between letters

      Dynamic Styling:
      ${style}
      Applies colors and borders based on the selected variant.
      ========================================================
    */
    <span
      className={`
        inline-flex items-center
        px-3 py-0.5
        rounded-full
        text-xs
        font-semibold
        tracking-wide
        ${style}
      `}
    >
      {/* Badge text received from props */}
      {label}
    </span>
  );
}
