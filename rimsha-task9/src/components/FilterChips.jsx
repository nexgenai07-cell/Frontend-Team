// useState hook to track which filter chip is currently selected
import { useState } from "react";

// Framer Motion for scale animations on hover and tap
import { motion } from "framer-motion";

// Filter categories array — each item has a unique id, display label and emoji icon
// id is used internally for logic, label is shown to user, icon adds visual context
const FILTERS = [
  { id: "all", label: "All", icon: "🌍" },
  { id: "mountains", label: "Mountains", icon: "🏔️" },
  { id: "beaches", label: "Beaches", icon: "🏖️" },
  { id: "forests", label: "Forests", icon: "🌲" },
  { id: "cities", label: "Urban", icon: "🏙️" },
  { id: "heritage", label: "Heritage", icon: "🏛️" },
];

// FilterChips component receives onFilterChange prop from parent (Home.jsx)
// When a filter is selected, it notifies the parent so it can update results
const FilterChips = ({ onFilterChange }) => {
  // Tracks which filter chip is currently active
  // Defaults to "all" so all results show on initial load
  const [activeFilter, setActiveFilter] = useState("all");

  // Called when user clicks a filter chip
  // Updates local active state and notifies parent component
  const handleFilter = (filterId) => {
    // Update local state to highlight the selected chip
    setActiveFilter(filterId);

    // Notify parent component (Home.jsx) about the selected filter
    // Parent uses this to filter place cards and update map markers
    if (onFilterChange) onFilterChange(filterId);
  };

  return (
    // Horizontal scrollable container for filter chips
    // overflow-x-auto enables horizontal scroll on smaller screens
    // scrollbar-hide removes the visible scrollbar for cleaner look
    // pb-2 adds bottom padding so chips dont get clipped by scrollbar
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* Render a button for each filter category */}
      {FILTERS.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => handleFilter(filter.id)}
          // Scale up slightly when user hovers over chip
          whileHover={{ scale: 1.05 }}
          // Scale down slightly when user clicks for tactile feel
          whileTap={{ scale: 0.95 }}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            whitespace-nowrap transition-all border
            ${
              activeFilter === filter.id
                ? // Active chip — solid blue background with white text
                  "bg-blue-600 text-white border-blue-600"
                : // Inactive chip — white background with gray border
                  // Border turns blue on hover to hint it is clickable
                  "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
            }
          `}
        >
          {/* Emoji icon for visual category identification */}
          <span>{filter.icon}</span>

          {/* Text label for the filter category */}
          <span>{filter.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default FilterChips;
