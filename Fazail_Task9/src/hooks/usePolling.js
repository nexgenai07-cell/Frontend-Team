import { useEffect, useRef } from "react";

/*
|--------------------------------------------------------------------------
| usePolling Hook
|--------------------------------------------------------------------------
|
| Repeatedly executes a callback function after
| a specified delay.
|
| Example:
|
| usePolling(fetchDashboardData, 10000);
|
| This will call fetchDashboardData every 10 seconds.
|
*/

const usePolling = (
  callback,
  delay = 10000
) => {
  /*
  --------------------------------------------------------------------------
  | Store Latest Callback
  --------------------------------------------------------------------------
  |
  | Prevents stale closures when callback changes.
  |
  */

  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  /*
  --------------------------------------------------------------------------
  | Polling Logic
  --------------------------------------------------------------------------
  |
  | Creates an interval and automatically
  | clears it when component unmounts.
  |
  */

  useEffect(() => {
    // Disable polling if delay is null
    if (delay === null) return;

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    // Execute immediately on mount
    tick();

    // Execute repeatedly
    const interval = setInterval(
      tick,
      delay
    );

    // Cleanup
    return () =>
      clearInterval(interval);
  }, [delay]);
};

export default usePolling;