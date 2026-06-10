// ===============================================
// localStorage.js — Full Local Storage Manager
// This file handles all data saving, loading, and deleting for the entire app
// ===============================================

// =====================
// SAVED PLACES
// User's saved/favorite destinations
// =====================

// Load the saved places list from LocalStorage
// If nothing found, return empty array so the app doesn't crash
export const getSavedPlaces = () => {
  return JSON.parse(localStorage.getItem("savedPlaces")) || [];
};

// Save a new place to LocalStorage
// First check if it already exists — no duplicates allowed
export const savePlace = (place) => {
  const saved = getSavedPlaces(); // get everything already saved
  const alreadySaved = saved.find((p) => p.id === place.id); // duplicate check
  if (alreadySaved) return; // already exists — do nothing, exit early
  // merge new place with existing list and save back
  localStorage.setItem("savedPlaces", JSON.stringify([...saved, place]));
};

// Find a place by its ID and remove it from the saved list
export const removePlace = (placeId) => {
  const saved = getSavedPlaces(); // get everything already saved
  // keep only the places whose ID does NOT match
  const updated = saved.filter((p) => p.id !== placeId);
  localStorage.setItem("savedPlaces", JSON.stringify(updated));
};

// =====================
// RECENT SEARCHES
// History of everything the user has searched
// =====================

// Load recent searches list from LocalStorage
// If nothing found, return empty array
export const getRecentSearches = () => {
  return JSON.parse(localStorage.getItem("recentSearches")) || [];
};

// Add a new search term to history
// Rule 1: if this term already exists, remove it first (no duplicates)
// Rule 2: put the new search at the top (latest should appear first)
// Rule 3: keep only 5 searches max — older ones get cut off automatically
export const addRecentSearch = (search) => {
  const recent = getRecentSearches(); // load existing history
  const filtered = recent.filter((s) => s !== search); // remove duplicate if exists
  const updated = [search, ...filtered].slice(0, 5); // add to top, cut to 5
  localStorage.setItem("recentSearches", JSON.stringify(updated));
};

// Clear the entire search history at once
// This runs when user clicks the "Clear All" button
export const clearRecentSearches = () => {
  localStorage.removeItem("recentSearches");
};

// =====================
// AUTH — USER
// Handles login and logout data
// =====================

// Load the currently logged in user from LocalStorage
// Returns null if no user found — ProtectedRoute uses this to block access
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

// Save user object to LocalStorage when they log in
// Could be { name, email } for normal login or { name, isGuest: true } for guest
export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Remove user data from LocalStorage on logout
// Context will also set user to null, which blocks all protected routes
export const logoutUser = () => {
  localStorage.removeItem("user");
};
