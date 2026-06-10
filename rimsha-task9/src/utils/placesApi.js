// Get the Geoapify API key from environment variables (.env file)
const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

// =====================
// Nearby Places Fetch
// Find places around given coordinates
// =====================
export const fetchNearbyPlaces = async ({
  lat,
  lng,
  category = "accommodation", // default category if none is passed
}) => {
  try {
    // Call Geoapify Places API with 3 filters:
    // 1. categories — what type of place to search (hotel, beach, etc.)
    // 2. filter=circle — search within a 5km radius around lat/lng
    // 3. limit=20 — return maximum 20 results
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lng},${lat},5000&limit=20&apiKey=${GEO_KEY}`,
    );

    // Convert the raw response into a JavaScript object
    const data = await response.json();
    console.log("Nearby Places:", data);

    // API returns results inside data.features array
    // If array exists and has at least 1 place, process it
    if (data.features && data.features.length > 0) {
      // Loop through each place and extract only the fields we need
      return data.features.map((f) => ({
        // Use place_id from API, if missing generate a random id
        id: f.properties.place_id || Math.random().toString(),

        // Place name, fallback to "Unknown Place" if API returns nothing
        name: f.properties.name || "Unknown Place",

        // First category from the array, fallback to what user searched
        category: f.properties.categories?.[0] || category,

        // Full formatted address
        address: f.properties.formatted || "",

        // Coordinates — lat is latitude, lon is longitude (note: API uses "lon" not "lng")
        lat: f.properties.lat,
        lng: f.properties.lon,

        // These three may or may not exist — null if API doesn't return them
        rating: f.properties.rating || null,
        website: f.properties.website || null,
        phone: f.properties.phone || null,
      }));
    }

    // If no places found, return empty array so app doesn't crash
    return [];
  } catch (error) {
    // If API call fails for any reason, log it and return empty array
    console.error("Places API error:", error);
    return [];
  }
};

// Yeh file sirf ek kaam karti hai — kisi bhi location ke aas paas ki jagahein Geoapify API se fetch karna.
// Tum isko lat, lng, aur category dete ho, yeh API call karta hai 5km ke daire mein search karta hai, aur tumhe ek clean array return karta hai jisme har jagah ka id, name, address, coordinates, rating, website, phone hota hai.
// Agar koi jagah na mile ya API fail ho — empty array return hoti hai, app crash nahi karta.
