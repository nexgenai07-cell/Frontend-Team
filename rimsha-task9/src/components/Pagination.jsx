import { motion } from "framer-motion";
// Importing motion from framer-motion to add animations on page number buttons.
// We use whileTap on each page number button to give a press/click feel.

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Importing left and right chevron (arrow) icons from react-icons.
// MdChevronLeft  → used for the "Previous" button (←)
// MdChevronRight → used for the "Next" button (→)

// Pagination Component
// Renders a row of page number buttons with Previous and Next controls.
// Handles which page is active, which buttons are disabled, and notifies
// the parent when the user wants to change the page.
//
// Props:
//   currentPage  — the page number that is currently active (e.g. 2)
//   totalPages   — total number of pages available (e.g. 5)
//   onPageChange — callback function called with the new page number whenever user clicks a button
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Early return — if there is only 1 page (or 0), there is nothing to paginate.
  // Returning null means this component renders nothing at all in that case.
  if (totalPages <= 1) return null;

  // Build an array of page numbers from 1 to totalPages.
  // Array.from({ length: totalPages }) creates an empty array of that length.
  // The second argument (_, i) => i + 1 fills each slot with its 1-based index.
  // Example: totalPages = 4 → pages = [1, 2, 3, 4]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    // Outer wrapper — centers all buttons horizontally with equal spacing.
    // mt-8 adds top margin so pagination sits below the content list.
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* ── Previous Button ──────────────────────────────────────
          Clicking this calls onPageChange with currentPage - 1,
          moving the user one page back.
          disabled when currentPage === 1 because there is no page 0.
          disabled:opacity-40 fades it out visually when disabled.
          disabled:cursor-not-allowed shows a "not allowed" cursor on hover when disabled. */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {/* Left chevron icon — visually represents "go back" */}
        <MdChevronLeft className="text-xl" />
      </button>

      {/* ── Page Number Buttons ──────────────────────────────────
          Looping over the pages array [1, 2, 3 ...] to render one button per page.
          Each button is a motion.button so we can add the whileTap animation. */}
      {pages.map((page) => (
        <motion.button
          key={page}
          // key tells React to uniquely identify each button in the list —
          // required whenever you render elements inside a .map()

          onClick={() => onPageChange(page)}
          // When clicked, tell the parent to switch to this page number

          whileTap={{ scale: 0.9 }}
          // whileTap is a framer-motion prop — shrinks the button to 90% size
          // while the user is pressing it, giving a satisfying "press" feedback

          className={`
            w-10 h-10 rounded-xl text-sm font-semibold transition-all
            ${
              currentPage === page
                ? // Active page styling — solid blue background with white text
                  // so the user can clearly see which page they are on
                  "bg-blue-600 text-white"
                : // Inactive page styling — white background with gray border
                  // turns blue on hover to indicate it is clickable
                  "border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600"
            }
          `}
        >
          {/* Display the page number as the button label */}
          {page}
        </motion.button>
      ))}

      {/* ── Next Button ──────────────────────────────────────────
          Clicking this calls onPageChange with currentPage + 1,
          moving the user one page forward.
          disabled when currentPage === totalPages because there is no next page after the last one.
          Same disabled styling as the Previous button for visual consistency. */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {/* Right chevron icon — visually represents "go forward" */}
        <MdChevronRight className="text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
// Exporting so this component can be imported and used anywhere pagination is needed in the project.
