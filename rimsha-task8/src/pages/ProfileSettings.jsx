// ============================================================

// This page allows users to view and update their profile
// information such as first name, last name, email address,
// and professional bio.
//
// Features:
// • Editable profile form
// • User avatar with edit icon
// • Security tier badge
// • Verified user badge
// • Save and Cancel actions
// • Temporary success feedback after saving
// • Fully responsive layout
// ============================================================

import React, { useState } from "react";

// Mock profile data used as the initial form values
import { mockProfile } from "../data/mockData";

// Reusable badge component for security and verification status
import Badge from "../components/ui/Badge";

// Edit icon displayed on the profile avatar
import { FiEdit2 } from "react-icons/fi";

export default function ProfileSettings() {
  // ==========================================================
  // FORM STATE
  // Stores all editable profile fields
  // ==========================================================
  const [form, setForm] = useState({
    firstName: mockProfile.firstName,
    lastName: mockProfile.lastName,
    email: mockProfile.email,
    bio: mockProfile.bio,
  });

  // ==========================================================
  // SAVE STATUS
  // Controls the temporary success message on save
  // ==========================================================
  const [saved, setSaved] = useState(false);

  // ==========================================================
  // HANDLE INPUT CHANGES
  // Updates the corresponding field in state whenever
  // the user types into an input or textarea
  // ==========================================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Hide saved state when new changes are made
    setSaved(false);
  };

  // ==========================================================
  // SAVE PROFILE CHANGES
  // Shows a success state for a short period
  // ==========================================================
  const handleSave = () => {
    setSaved(true);

    // Automatically remove success state after 2.5 seconds
    setTimeout(() => setSaved(false), 2500);
  };

  // ==========================================================
  // RESET FORM
  // Restores all fields to the original profile values
  // ==========================================================
  const handleCancel = () => {
    setForm({
      firstName: mockProfile.firstName,
      lastName: mockProfile.lastName,
      email: mockProfile.email,
      bio: mockProfile.bio,
    });

    setSaved(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ======================================================
          MAIN PROFILE CARD
          Contains profile header and editable form
          ====================================================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
        {/* ==================================================
            PROFILE HEADER SECTION
            Displays avatar, user details, and badges
            ================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 md:mb-8">
          {/* User Avatar */}
          <div className="relative shrink-0">
            {/* Profile Avatar Circle */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-[#1a3c34] to-[#0f6e56] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              R
            </div>

            {/* Avatar Edit Button */}
            <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
              <FiEdit2 size={11} className="text-white" />
            </button>
          </div>

          {/* User Information */}
          <div className="min-w-0">
            {/* Full Name */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
              {form.firstName} {form.lastName}
            </h2>

            {/* Role and Membership Information */}
            <p className="text-sm text-gray-500 mb-3">
              {mockProfile.role} · Member since {mockProfile.memberSince}
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              {/* Security Tier Badge */}
              <Badge
                label={`SECURITY TIER: ${mockProfile.securityTier}`}
                variant="gold"
              />

              {/* Verified User Badge */}
              {mockProfile.verified && (
                <Badge label="VERIFIED USER" variant="verified" />
              )}
            </div>
          </div>
        </div>

        {/* Visual Divider */}
        <hr className="border-gray-100 mb-6 md:mb-8" />

        {/* ==================================================
            PROFILE FORM SECTION
            Editable user information
            ================================================== */}
        <div className="space-y-5">
          {/* Name Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {/* First Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                First Name
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Last Name
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
            />
          </div>

          {/* Professional Bio Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Professional Bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition resize-y"
            />
          </div>
        </div>

        {/* ==================================================
            ACTION BUTTONS
            Save or discard profile changes
            ================================================== */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 md:mt-8">
          {/* Reset Form Button */}
          <button
            onClick={handleCancel}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>

          {/* Save Changes Button */}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1a3c34] hover:bg-[#0f6e56] transition cursor-pointer"
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
