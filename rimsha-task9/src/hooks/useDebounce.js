// useState and useEffect — React built in hooks
import { useState, useEffect } from "react";

// value — the thing we want to debounce (search input)
// delay — how long to wait before updating the value (in milliseconds)
// default delay is 500ms if nothing is passed
const useDebounce = (value, delay = 500) => {
  // Store the debounced value in a separate state
  // This is the value that actually gets sent to the API
  // Not the live input value — the delayed one
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer — after delay is done, update debouncedValue
    // If user types "Lahore", the timer resets on every single letter
    // Value only updates when the user stops typing
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function — runs when:
    // 1. User types again — cancel the old timer, start a fresh one
    // 2. Component unmounts — stop the timer from running in the background
    // This is the whole point of debounce — prevent back to back API calls
    return () => clearTimeout(timer);
  }, [value, delay]);
  // value changes — effect runs again, timer resets
  // delay changes — effect runs again

  // Return the final debounced value
  // SearchBar will use this value to make the API call
  return debouncedValue;
};

export default useDebounce;
