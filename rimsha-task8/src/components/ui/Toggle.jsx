// ============================================================

// Reusable toggle switch component used for enabling or
// disabling settings throughout the application.
//
// Features:
// • Reusable component
// • ON / OFF state support
// • Smooth sliding animation
// • Dynamic background color
// • Controlled through props
// ============================================================

// Import React to use JSX
import React from "react";

// ============================================================
// Toggle Component
//
// Props:
// checked  -> Current toggle state (true = ON, false = OFF)
// onChange -> Function called when toggle state changes
// ============================================================
export default function Toggle({ checked, onChange }) {
  return (
    /*
      ========================================================
      TOGGLE TRACK (OUTER CONTAINER)

      This is the background area of the switch.

      onClick:
      - Triggered when the user clicks the toggle
      - Sends the opposite value to the parent component

      Styling:
      w-11 h-6       -> Toggle size (44px × 24px)
      rounded-full   -> Pill shape
      transition     -> Smooth color animation
      cursor-pointer -> Shows clickable cursor
      shrink-0       -> Prevents shrinking inside flex layouts
      relative       -> Required for positioning the knob

      Background Color:
      checked = true  -> Green (ON state)
      checked = false -> Gray (OFF state)
      ========================================================
    */
    <div
      onClick={() => onChange(!checked)}
      className={`
        w-11 h-6 rounded-full transition-colors duration-200
        cursor-pointer shrink-0 relative
        ${checked ? "bg-[#0f6e56]" : "bg-gray-300"}
      `}
    >
      {/*
        ======================================================
        TOGGLE KNOB (INNER CIRCLE)

        This white circle moves left and right depending
        on the current toggle state.

        Styling:
        absolute      -> Positioned inside the track
        top-0.5       -> Small top spacing
        w-5 h-5       -> 20px circle
        bg-white      -> White knob
        rounded-full  -> Perfect circle
        shadow-sm     -> Small shadow effect
        transition    -> Smooth sliding animation

        Position:
        ON  -> Moves to the right side
        OFF -> Stays on the left side
        ======================================================
      */}
      <div
        className={`
          absolute top-0.5 w-5 h-5 bg-white rounded-full
          shadow-sm transition-all duration-200
          ${checked ? "left-5.5" : "left-0.5"}
        `}
      />
    </div>
  );
}
