import { getCache, setCache } from "./apiCache";
// import two functions from apiCache — one to read cache, one to write cache

const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
// load Geoapify API key from .env file

// =====================
// GEOCODING
// Address → Coordinates
// User types "Lahore" — we convert it to { lat, lng }
// =====================
export const geocodeAddress = async (address) => {
  // Check cache first before making any API call
  // If this address was searched before, return stored result immediately
  // toLowerCase so "Lahore" and "lahore" produce the same cache key
  const cacheKey = `geocode_${address.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached; // found in cache — return early, skip API call

  try {
    // Call Geoapify Geocoding API
    // encodeURIComponent — makes spaces and special characters URL safe
    // limit=1 — we only need the single best match
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${GEO_KEY}`,
    );

    // If response is not OK, handle specific error codes
    // 429 = too many requests, rate limit hit
    // anything else = general API failure
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests — please wait a moment");
      }
      throw new Error(`API Error: ${response.status}`);
    }

    // Convert raw response into a JavaScript object
    const data = await response.json();

    // API returns results inside data.features array
    // If array exists and has at least one result, process it
    if (data.features && data.features.length > 0) {
      const place = data.features[0].properties;
      // take the first result — all place info lives inside properties

      const result = {
        lat: place.lat, // latitude
        lng: place.lon, // longitude — API uses "lon" not "lng"
        // try city first, fall back to name, then town if city is missing
        city: place.city || place.name || place.town || "",
        country: place.country || "",
        address: place.formatted || "", // full address in one line
      };

      // Save result to cache so the same search skips the API next time
      setCache(cacheKey, result);
      return result;
    }

    // No results found — return null
    return null;
  } catch (error) {
    // Log the error and throw it up so the calling component can handle it too
    console.error("Geocoding error:", error.message);
    throw error;
  }
};

// ========================
// REVERSE GEOCODING
// Coordinates → Address
// User clicks on map — we convert { lat, lng } to a readable address
// ========================
export const reverseGeocode = async ({ lat, lng }) => {
  // Build cache key from coordinates
  // toFixed(4) keeps 4 decimal places — precise enough, no need for more
  // example key: "reverse_31.5234_74.3456"
  const cacheKey = `reverse_${lat.toFixed(4)}_${lng.toFixed(4)}`;
  const cached = getCache(cacheKey);
  if (cached) return cached; // found in cache — return early, skip API call

  try {
    // Call Geoapify Reverse Geocoding API
    // We send lat and lon — API sends back address info
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEO_KEY}`,
    );

    // Same error handling as above
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests — please wait a moment");
      }
      throw new Error(`API Error: ${response.status}`);
    }

    // Convert raw response into a JavaScript object
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const place = data.features[0].properties;

      const result = {
        // Try city first, then town, then village, then county
        // If none exist, fall back to "Unknown City"
        city:
          place.city ||
          place.town ||
          place.village ||
          place.county ||
          "Unknown City",
        country: place.country || "Unknown Country",
        address: place.formatted || "", // full address in one line
        lat, // same coordinates the user clicked
        lng,
      };

      // Save to cache so the same coordinates skip the API next time
      setCache(cacheKey, result);
      return result;
    }

    // No results found — return null
    return null;
  } catch (error) {
    console.error("Reverse Geocoding error:", error.message);
    throw error;
  }
};
