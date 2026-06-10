// useState — to track whether the scroll-to-top button should be visible or hidden.
// useEffect — to register and clean up the scroll event listener when the component mounts.
import { useState, useEffect } from "react";

// motion — used on the button to animate it appearing and disappearing smoothly.
// AnimatePresence — required wrapper that enables exit animations.
// Without AnimatePresence, the exit prop on motion elements does not work —
// the element would just instantly disappear instead of animating out.
import { motion, AnimatePresence } from "framer-motion";

// MdKeyboardArrowUp — an upward pointing arrow icon shown inside the button
// to visually communicate "scroll back to top".
import { MdKeyboardArrowUp } from "react-icons/md";

// ScrollToTop Component
// Renders a floating button in the bottom-right corner of the screen.
// The button is hidden by default and only appears after the user has
// scrolled more than 300px down the page.
// Clicking it smoothly scrolls the page back to the very top.
const ScrollToTop = () => {
  // isVisible controls whether the button is rendered on screen or not.
  // Starts as false so the button is hidden when the page first loads.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // handleScroll is called every time the user scrolls the page.
    // window.scrollY gives the current vertical scroll position in pixels.
    // If the user has scrolled more than 300px down, set isVisible to true
    // to show the button. If they scroll back above 300px, hide it again.
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Attach the scroll event listener to the browser window.
    // This means handleScroll will fire continuously as the user scrolls.
    window.addEventListener("scroll", handleScroll);

    // Cleanup function — runs when the component is removed from the DOM.
    // Removes the scroll event listener to prevent memory leaks.
    // Without this, the listener would keep running even after the component unmounts.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Empty dependency array [] means this effect runs only once when the
  // component first mounts — we only need to register the listener one time.

  // scrollToTop
  // Called when the user clicks the button.
  // window.scrollTo scrolls the page to the specified position.
  // top: 0 means scroll all the way to the very top of the page.
  // behavior: "smooth" makes it animate smoothly instead of jumping instantly.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // AnimatePresence watches its children and enables exit animations
    // when a child is conditionally removed from the DOM (when isVisible becomes false).
    // Without this wrapper, the button would disappear instantly with no animation.
    <AnimatePresence>
      {/* Only render the button when isVisible is true.
          AnimatePresence detects when this condition becomes false
          and plays the exit animation before removing the button from the DOM. */}
      {isVisible && (
        <motion.button
          // initial — button starts invisible (opacity 0) and small (scale 0.5)
          // before it appears on screen.
          initial={{ opacity: 0, scale: 0.5 }}
          // animate — button fades in to full opacity and grows to its normal size (scale 1).
          // framer-motion automatically transitions from initial → animate.
          animate={{ opacity: 1, scale: 1 }}
          // exit — when isVisible becomes false, button fades out and shrinks back
          // to the same small size it started at before being removed from the DOM.
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          // Calls scrollToTop when the button is clicked.

          // fixed         — keeps the button locked to the same spot on screen while scrolling.
          // bottom-6 right-6 — positions it in the bottom-right corner with some spacing.
          // z-50          — ensures it floats above all other page content.
          // w-12 h-12     — makes it a 48x48px square.
          // rounded-xl    — gives it rounded corners.
          // shadow-lg     — adds a drop shadow so it stands out from the page background.
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all"
        >
          {/* Upward arrow icon — visually tells the user this button scrolls to the top */}
          <MdKeyboardArrowUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
// Exporting so this component can be imported and placed inside the root App layout,
// making the scroll-to-top button available across all pages of the application.
