// ============================================================

// This component is the left sidebar of the dashboard.
// It includes navigation links, mobile responsiveness,
// and a user profile card with a dropdown menu.
// ============================================================

// React import (state management)
import React, { useState } from "react";

// React Router imports:
// NavLink → used for active link styling
// Link → used for navigation without active state
import { NavLink, Link } from "react-router-dom";

// Icons used in sidebar UI
import {
  FiUser,
  FiShield,
  FiActivity,
  FiMonitor,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

// Navigation items configuration (sidebar menu structure)
const navItems = [
  { to: "/profile", label: "Profile Settings", icon: <FiUser size={18} /> },
  { to: "/security", label: "Security Settings", icon: <FiShield size={18} /> },
  { to: "/activity", label: "Activity Logs", icon: <FiActivity size={18} /> },
  { to: "/devices", label: "Device Management", icon: <FiMonitor size={18} /> },
];

// Main Sidebar component
export default function Sidebar() {
  // isOpen → controls mobile sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // userMenuOpen → controls bottom user dropdown menu
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button (visible only on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1a3c34] text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Show close icon if open, otherwise menu icon */}
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile overlay (click outside to close sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:relative
          w-52 bg-[#1a3c34] flex flex-col
        `}
      >
        {/* Brand section */}
        <div className="pt-15 pb-4 px-5">
          <h2 className="text-white text-lg font-bold leading-tight">Rimsha</h2>

          <p className="text-[#7ecfb3] text-[10px] font-semibold tracking-widest mt-1 uppercase">
            Security Account
          </p>
        </div>

        {/* Navigation links */}
        <nav className="mt-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 px-5 py-3 text-sm font-medium
                  transition-all duration-150

                  ${
                    isActive
                      ? "bg-[#0f6e56] text-white rounded-lg mx-2 font-semibold"
                      : "text-[#a8c8be] hover:text-white hover:bg-white/10 rounded-lg mx-2"
                  }
                `
              }
            >
              {/* Menu icon */}
              {item.icon}

              {/* Menu label */}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User profile card (bottom section) */}
        <div className="relative m-3">
          {/* User button */}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full bg-[#0f6e56] rounded-xl p-3 flex items-center gap-3 hover:bg-[#13806a] transition"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#7ecfb3] flex items-center justify-center text-[#1a3c34] font-bold text-sm shrink-0">
              R
            </div>

            {/* User details */}
            <div className="min-w-0 text-left">
              <p className="text-white text-sm font-semibold truncate">
                Rimsha
              </p>

              <p className="text-[#7ecfb3] text-[10px] font-semibold tracking-wider uppercase mt-0.5">
                Verified Account
              </p>
            </div>
          </button>

          {/* Dropdown menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Logout option */}
              <Link
                to="/logout"
                onClick={() => {
                  setUserMenuOpen(false);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
              >
                <FiLogOut size={16} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
