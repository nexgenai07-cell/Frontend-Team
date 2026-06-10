import { useEffect, useRef } from "react";

// Custom hook — runs a function repeatedly at a set time interval
// callback — the function to run on every interval
// interval — how long to wait between each run (in milliseconds)
// enabled — turn polling on or off without removing the hook
const usePolling = (callback, interval = 30000, enabled = true) => {
  // useRef stores the timer ID
  // useRef instead of useState because saving the timer should NOT trigger a re-render
  const timerRef = useRef(null);

  useEffect(() => {
    // If polling is disabled, do nothing and exit early
    if (!enabled) return;

    // Run the callback immediately on the first mount
    // Without this, user would wait 30 seconds before seeing anything
    callback();

    // Then keep running it every [interval] milliseconds
    // Default is 30000ms = 30 seconds
    timerRef.current = setInterval(callback, interval);

    // Cleanup — when component unmounts, stop the timer
    // Without this the interval keeps running in the background forever — memory leak
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [enabled, interval]);
  // enabled changes — effect re-runs, polling starts or stops
  // interval changes — effect re-runs, new timer is set with updated delay
  // callback is NOT in the dependency array — adding it would reset the timer on every render
};

export default usePolling;
