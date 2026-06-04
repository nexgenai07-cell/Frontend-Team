// ============================================================
// This is the header bar shown on every page.
// It contains a notification icon and a user dropdown menu.
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function TopBar() {
  // Controls dropdown open/close state
  const [open, setOpen] = useState(false);

  // Reference to dropdown wrapper for outside click detection
  const dropdownRef = useRef();

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between relative">
        {/* Dashboard title */}
        <h1 className="text-lg md:text-xl font-bold text-[#1a3c34] pl-10 md:pl-0">
          Security Dashboard
        </h1>

        {/* Right side actions (notifications + user menu) */}
        <div className="flex items-center gap-4">
          {/* Notification button */}
          <button className="relative text-gray-600 hover:text-[#0f6e56] transition">
            <FiBell size={22} />
          </button>

          {/* User dropdown container */}
          <div className="relative" ref={dropdownRef}>
            {/* User avatar button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1a3c34] to-[#0f6e56] flex items-center justify-center text-white">
                <FiUser />
              </div>
            </button>

            {/* Dropdown menu */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                {/* Profile settings link */}
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                >
                  <FiSettings />
                  Profile Settings
                </Link>

                {/* Logout link */}
                <Link
                  to="/logout"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <FiLogOut />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
