import { motion } from "framer-motion";
// Importing the motion component from framer-motion library.
// motion.div is a regular HTML div but with animation superpowers —
// it accepts special props like initial, animate, exit, and transition
// to define how the element should appear, stay, and disappear.

// PageTransition Component
// This is a reusable wrapper component. Any page you wrap with this
// component will automatically get a smooth fade + slide animation
// when it enters the screen and when it leaves the screen.
// Usage: <PageTransition> <YourPage /> </PageTransition>
const PageTransition = ({ children }) => {
  // children is whatever JSX you pass between the opening and closing
  // tags of this component. For example if you wrap <HomePage /> inside
  // <PageTransition>, then children = <HomePage />.

  return (
    <motion.div
      // initial — defines the starting state of the element BEFORE it appears on screen.
      // opacity: 0 means the page is fully invisible at the start.
      // y: 10 means the page starts 10px below its final position (slight slide up effect).
      initial={{ opacity: 0, y: 10 }}
      // animate — defines the final state the element should reach AFTER it appears.
      // opacity: 1 means the page becomes fully visible.
      // y: 0 means the page slides back to its natural/original position.
      // framer-motion automatically animates from initial → animate.
      animate={{ opacity: 1, y: 0 }}
      // exit — defines the state the element should animate TO when it is removed from the screen.
      // opacity: 0 means the page fades out to fully invisible.
      // y: -10 means the page slides 10px upward as it disappears (opposite of entry).
      // Note: exit only works if this component is wrapped inside <AnimatePresence> in the parent.
      exit={{ opacity: 0, y: -10 }}
      // transition — controls the timing and style of the animation.
      // duration: 0.3 means the entire animation (both enter and exit) takes 0.3 seconds.
      transition={{ duration: 0.3 }}
    >
      {/* Render whatever page or component was passed as children inside this animated div */}
      {children}
    </motion.div>
  );
};

export default PageTransition;
// Exporting so this component can be imported and used in any page file across the project.
