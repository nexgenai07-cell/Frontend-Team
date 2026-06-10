// Cache — store previously searched values in memory
// So the same search does not make another API call
// This is Rate Limiting Awareness — saves Geoapify free tier requests

// Map() is used instead of a plain object — better for key/value storage
// Lives only in JavaScript memory — clears on page reload, not visible in DevTools
const cache = new Map();

// Read a value from cache
// Pass a key — get back the value or null
export const getCache = (key) => {
  // First check if this key exists in cache at all
  if (cache.has(key)) {
    const { value, timestamp } = cache.get(key);
    // value = the stored API result
    // timestamp = the exact time it was saved

    // Check if the cache has expired
    // 600000 milliseconds = 10 minutes
    // Date.now() is current time — timestamp was the time it was saved
    // If difference is more than 10 min — it is expired
    const isExpired = Date.now() - timestamp > 600000;

    if (!isExpired) {
      // Cache is still valid — return it immediately, no API call needed
      console.log("Cache hit:", key);
      return value;
    }

    // Cache has expired — delete the old data
    // Next time this key is requested, a fresh API call will be made
    cache.delete(key);
  }

  // Key was not found or was expired — return null
  // The calling function will know it needs to make an API call
  return null;
};

// Save a value into cache
// Pass key and value — timestamp is added automatically
export const setCache = (key, value) => {
  cache.set(key, {
    value, // the actual API result to store
    timestamp: Date.now(), // current time — used later to check expiry
  });
};
