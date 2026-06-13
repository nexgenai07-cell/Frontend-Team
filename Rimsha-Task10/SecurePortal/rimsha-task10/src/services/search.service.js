// Backend server ka URL
// React 5173 pe — Backend 3001 pe
const BACKEND_URL = "http://localhost:3001";

// ==========================================
// SEARCH FUNCTION
// ==========================================
// query string leta hai
// Backend ko call karta hai
// Backend SerpAPI ko call karta hai — CORS issue nahi

export const searchGoogle = async (query) => {
  // Query empty hai — kuch mat karo
  if (!query || query.trim() === "") return [];

  // Backend ka search endpoint call karo
  const response = await fetch(
    `${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`,
  );

  // Response sahi nahi — error throw karo
  if (!response.ok) {
    throw new Error("Search failed. Please try again.");
  }

  // Results return karo
  const data = await response.json();
  return data;
};

// ==========================================
// AUTOCOMPLETE FUNCTION
// ==========================================
// query string leta hai
// Backend ka autocomplete endpoint call karta hai

export const getAutocompleteSuggestions = async (query) => {
  // Query 2 characters se kam — suggestions mat lo
  if (!query || query.trim().length < 2) return [];

  // Backend ka autocomplete endpoint call karo
  const response = await fetch(
    `${BACKEND_URL}/api/autocomplete?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) return [];

  const data = await response.json();
  return data;
};
