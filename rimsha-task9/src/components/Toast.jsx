// useApp — custom context hook to access the global toast notification state.
// We read the current toast object and the function to clear it from here.
import { useApp } from "../context/AppContext";

// motion — adds entry and exit animations to the toast notification element.
// AnimatePresence — required wrapper that allows the exit animation to play
// before the toast is removed from the DOM when toast becomes null.
// Without AnimatePresence the toast would disappear instantly with no slide-out.
import { motion, AnimatePresence } from "framer-motion";

// MdCheckCircle — green checkmark icon shown for success notifications
// MdError        — red error icon shown for error/failure notifications
// MdClose        — X icon inside the manual close button
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

// Toast Component
// A floating notification bar that slides in from the top-right of the screen.
// It reads the current toast state from global context and displays it.
// The toast can be either a success type (green) or an error type (red).
// It disappears automatically when the parent sets toast to null (via a timer
// in AppContext), or immediately when the user clicks the close button manually.
//
// toast object shape:
//   { message: string, type: "success" | "error" }
// toast is null when there is no active notification to display.
const Toast = () => {
  // toast   — the current notification object, or null if nothing should be shown.
  // setToast — function to update the toast state; called with null to dismiss it.
  const { toast, setToast } = useApp();

  return (
    // AnimatePresence monitors whether toast is truthy or null.
    // When toast becomes null, it lets the motion.div inside complete
    // its exit animation before the element is removed from the DOM.
    <AnimatePresence>
      {toast && (
        // motion.div — the visible toast notification bar.
        // Only rendered when toast is not null.
        <motion.div
          // initial — toast starts 50px above its final position and fully transparent.
          initial={{ opacity: 0, y: -50 }}
          // animate — toast slides down to y:0 and fades in to full opacity.
          // framer-motion automatically interpolates between initial and animate.
          animate={{ opacity: 1, y: 0 }}
          // exit — when toast is dismissed, it slides back upward and fades out.
          // This mirrors the entry animation for a consistent feel.
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          // fixed        — keeps the toast locked to the same screen position while scrolling.
          // top-6 right-6 — positions it in the top-right corner with spacing from the edges.
          // z-[999999]   — ensures it floats above every other element on the page.
          // min-w-[280px] — prevents the toast from becoming too narrow on short messages.
          className="fixed top-6 right-6 z-999999 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg min-w-70"
          style={{
            // Background and border color both change based on the toast type.
            // success → light green background with a green border
            // error   → light red background with a red border
            backgroundColor: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${toast.type === "success" ? "#86efac" : "#fca5a5"}`,
          }}
        >
          {/* Icon section — conditionally renders the correct icon based on toast type.
              shrink-0 prevents the icon from being squeezed if the message text is long. */}
          {toast.type === "success" ? (
            // Green checkmark — shown for positive actions like saving a place
            <MdCheckCircle className="text-green-500 text-2xl shrink-0" />
          ) : (
            // Red error icon — shown for failures like a failed API call
            <MdError className="text-red-500 text-2xl shrink-0" />
          )}

          {/* Message text — displays the notification message string from the toast object.
              flex-1 allows it to take all available horizontal space between the icon and close button.
              Text color switches between green and red based on toast type to match the theme. */}
          <p
            className={`text-sm font-medium flex-1 ${
              toast.type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {toast.message}
          </p>

          {/* Close button — allows the user to manually dismiss the toast immediately.
              Calls setToast(null) which sets the toast state to null in context,
              causing AnimatePresence to trigger the exit animation and remove the element.
              The auto-dismiss timer in AppContext will also call setToast(null) after a delay. */}
          <button
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-gray-600 transition-all"
          >
            <MdClose />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
// Exporting so this component can be placed once in the root App layout,
// making toast notifications available and visible across all pages.
