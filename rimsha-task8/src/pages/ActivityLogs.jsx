// ============================================================
// This page displays the user's login and activity history.
// Users can filter activities by status and search logs
// using action name, IP address, or location.
// ============================================================

// Import React and useState hook
// useState is used to manage component state
import React, { useState } from "react";

// Import mock activity log data
// This data is used to populate the activity table
import { mockActivityLogs } from "../data/mockData";

// Import StatusBadge component
// Used to display SUCCESS or FAILED status labels
import StatusBadge from "../components/ui/StatusBadge";

// Import icons from React Icons
// FiSearch → search icon
// FiShield → security-related icon (currently unused)
import { FiSearch, FiShield } from "react-icons/fi";

// Main ActivityLogs component
export default function ActivityLogs() {
  // Stores the currently selected filter
  // Possible values: "All", "Success", "Failed"
  const [filter, setFilter] = useState("All");

  // Stores the text entered in the search field
  const [search, setSearch] = useState("");

  // Create a filtered list of logs
  // Applies both filter and search conditions
  const filtered = mockActivityLogs.filter((log) => {
    // Check whether the current log matches the selected filter
    // If "All" is selected, every log is allowed
    // Otherwise only matching status logs are shown
    const matchFilter = filter === "All" || log.status === filter.toUpperCase();

    // Check whether the search text matches
    // the action, IP address, or location
    // Search is case-insensitive for text fields
    const matchSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search) ||
      log.location.toLowerCase().includes(search.toLowerCase());

    // Display the log only if both conditions are true
    return matchFilter && matchSearch;
  });

  // Render component UI
  return (
    /*
      Main page container

      w-full      → use full available width
      max-w-5xl   → maximum width constraint
      mx-auto     → center horizontally
    */
    <div className="w-full max-w-5xl mx-auto">
      {/*
        Main content card

        bg-white             → white background
        rounded-2xl          → rounded corners
        shadow-sm            → subtle shadow
        border-gray-100      → light border
        p-5 md:p-6           → responsive padding
      */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
        {/* ==================================================
            Search Input + Filter Buttons Section
            ================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Search field container */}
          <div className="relative w-full sm:max-w-xs">
            {/* Search icon positioned inside input field */}
            <FiSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

            {/* Search input field */}
            <input
              value={search}
              // Update search state whenever user types
              onChange={(e) => setSearch(e.target.value)}
              // Placeholder text shown when input is empty
              placeholder="Search activity..."
              // Tailwind styling classes
              className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition"
            />
          </div>

          {/* Filter buttons section */}
          <div className="flex gap-2">
            {/* Generate filter buttons dynamically */}
            {["All", "Success", "Failed"].map((tab) => (
              <button
                key={tab}
                // Change active filter when button is clicked
                onClick={() => setFilter(tab)}
                className={`
                  px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold
                  transition cursor-pointer
                  ${
                    filter === tab
                      ? "bg-[#1a3c34] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                {/* Display filter label */}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================
            Desktop Table View
            Hidden on small screens
            ================================================== */}
        <div className="overflow-x-auto hidden sm:block">
          {/* Activity logs table */}
          <table className="w-full border-collapse min-w-150">
            {/* Table header */}
            <thead>
              <tr className="border-b-2 border-gray-100">
                {/* Generate column headers dynamically */}
                {[
                  "DATE & TIME",
                  "ACTION",
                  "IP ADDRESS",
                  "LOCATION",
                  "STATUS",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-3 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {/* Show empty state if no matching logs exist */}
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-gray-400 text-sm"
                  >
                    No activity found.
                  </td>
                </tr>
              ) : (
                // Render each filtered activity log
                filtered.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    {/* Date and time column */}
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {log.dateTime}
                    </td>

                    {/* Action column */}
                    <td className="px-3 py-4 text-sm font-semibold text-gray-800">
                      {log.action}
                    </td>

                    {/* IP address column */}
                    <td className="px-3 py-4 text-sm text-gray-500 font-mono">
                      {log.ip}
                    </td>

                    {/* Location column */}
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {log.location}
                    </td>

                    {/* Status badge column */}
                    <td className="px-3 py-4">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ==================================================
            Mobile Card View
            Visible only on small screens
            ================================================== */}
        <div className="sm:hidden space-y-3">
          {/* Empty state message */}
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-gray-400 text-sm">
              No activity found.
            </p>
          ) : (
            // Create a card for each activity log
            filtered.map((log) => (
              <div
                key={log.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  {/* Activity action name */}
                  <p className="text-sm font-semibold text-gray-800">
                    {log.action}
                  </p>

                  {/* Activity status badge */}
                  <StatusBadge status={log.status} />
                </div>

                {/* Activity details */}
                <div className="space-y-1">
                  {/* Date and time */}
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-600">Time:</span>{" "}
                    {log.dateTime}
                  </p>

                  {/* IP address */}
                  <p className="text-xs text-gray-500 font-mono">
                    <span className="font-medium text-gray-600 font-sans">
                      IP:
                    </span>{" "}
                    {log.ip}
                  </p>

                  {/* Location */}
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-600">Location:</span>{" "}
                    {log.location}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ==================================================
            Footer Section
            Displays visible activity count
            ================================================== */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Result counter */}
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {mockActivityLogs.length} activities
          </p>
        </div>
      </div>
    </div>
  );
}
