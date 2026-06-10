// createContext — creates the global AppContext object that holds shared app state.
// useContext    — lets any child component read values from AppContext without prop drilling.
// useState      — manages all the reactive state pieces inside the provider.
// useEffect     — available here for any side effects that may be added in the future.
import { createContext, useContext, useState, useEffect } from "react";

// Importing all LocalStorage utility functions.
// These functions handle reading and writing persistent data to the browser's LocalStorage
// so that saved places, search history, and login state survive page refreshes.
//
// getSavedPlaces       — reads the saved places array from LocalStorage
// savePlace            — adds a new place to the saved places array in LocalStorage
// removePlace          — removes a place by id from the saved places array in LocalStorage
// getRecentSearches    — reads the recent searches array from LocalStorage
// addRecentSearch      — adds a new search term to the recent searches array in LocalStorage
// clearRecentSearches  — deletes all recent searches from LocalStorage
// getUser              — reads the currently logged-in user object from LocalStorage
// loginUser            — writes the user object to LocalStorage to persist the session
// logoutUser           — removes the user object from LocalStorage to end the session
import {
  getSavedPlaces,
  savePlace,
  removePlace,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  getUser,
  loginUser,
  logoutUser,
} from "../utils/localStorage";

// Create the context object.
// This is what components consume via useApp() to access global state.
// The actual value is provided by AppProvider below.
const AppContext = createContext();

// AppProvider Component
// Wraps the entire application (placed in main.jsx or App.jsx around all routes).
// Any component inside this wrapper can call useApp() to access the shared state
// and action functions without needing props passed down through every level.
//
// Props:
//   children — all the components nested inside <AppProvider> in the component tree
export const AppProvider = ({ children }) => {
  // user — the currently logged-in user object, or null if no one is logged in.
  // Initialized directly from LocalStorage so the login state persists on page refresh.
  const [user, setUser] = useState(getUser());

  // savedPlaces — array of place objects the user has bookmarked.
  // Initialized from LocalStorage so saved places persist across sessions.
  const [savedPlaces, setSavedPlaces] = useState(getSavedPlaces());

  // recentSearches — array of past search term strings.
  // Initialized from LocalStorage so search history survives page refreshes.
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());

  // toast — the currently active notification object, or null when no notification is showing.
  // Shape: { message: string, type: "success" | "error" }
  // Consumed by the Toast component to render the floating notification bar.
  const [toast, setToast] = useState(null);

  // ─────────────────────────────────────────────────────────────
  // TOAST NOTIFICATION
  // ─────────────────────────────────────────────────────────────

  // showToast
  // Displays a floating notification at the top of the screen for 3 seconds.
  // Sets the toast state to show the message, then automatically clears it
  // after 3000ms using setTimeout so the user does not have to dismiss it manually.
  //
  // @param {string} message  — the text to display inside the notification
  // @param {string} type     — "success" (green) or "error" (red), defaults to "success"
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-dismiss after 3 seconds
  };

  // ─────────────────────────────────────────────────────────────
  // AUTHENTICATION
  // ─────────────────────────────────────────────────────────────

  // login
  // Called when the user submits the login form successfully.
  // Persists the user object to LocalStorage so the session survives a refresh,
  // updates the in-memory user state so the UI reacts immediately,
  // and shows a personalized welcome toast using the user's first name.
  //
  // @param {object} userData — user object containing at minimum a name field
  const login = (userData) => {
    loginUser(userData); // Write to LocalStorage for persistence
    setUser(userData); // Update state so protected routes unlock immediately
    showToast(`Welcome back, ${userData.name.split(" ")[0]}! `);
    // .split(" ")[0] extracts just the first name from the full name string
  };

  // logout
  // Called when the user clicks the logout button.
  // Removes the user object from LocalStorage to end the session,
  // sets user state to null so all protected routes redirect to login,
  // and shows a confirmation toast.
  const logout = () => {
    logoutUser(); // Remove from LocalStorage
    setUser(null); // Clear in-memory state — triggers redirect in ProtectedRoute
    showToast("Logged out successfully");
  };

  // ─────────────────────────────────────────────────────────────
  // SAVED PLACES
  // ─────────────────────────────────────────────────────────────

  // handleSavePlace
  // Adds a place to the user's saved list.
  // Writes to LocalStorage first, then re-reads LocalStorage to sync
  // the in-memory state so the UI reflects the change immediately.
  // Shows a success toast to confirm the action to the user.
  //
  // @param {object} place — the full place object to save
  const handleSavePlace = (place) => {
    savePlace(place); // Persist to LocalStorage
    setSavedPlaces(getSavedPlaces()); // Re-read LocalStorage to sync state
    showToast("Destination saved! ❤️");
  };

  // handleRemovePlace
  // Removes a place from the user's saved list by its id.
  // Same pattern as handleSavePlace — write to LocalStorage then re-sync state.
  // Shows a toast confirming the removal.
  //
  // @param {string|number} placeId — the id of the place to remove
  const handleRemovePlace = (placeId) => {
    removePlace(placeId); // Delete from LocalStorage
    setSavedPlaces(getSavedPlaces()); // Re-read LocalStorage to sync state
    showToast("Removed from saved places");
  };

  // isPlaceSaved
  // Checks whether a specific place is currently in the saved places list.
  // Used by PlaceCard to decide whether to show a filled or outlined heart icon.
  // Returns true if found, false if not.
  //
  // @param {string|number} placeId — the id to check against the saved places array
  const isPlaceSaved = (placeId) => {
    return savedPlaces.some((p) => p.id === placeId);
    // .some() returns true as soon as it finds one match, false if none found
  };

  // ─────────────────────────────────────────────────────────────
  // RECENT SEARCHES
  // ─────────────────────────────────────────────────────────────

  // handleAddRecentSearch
  // Saves a new search term to the recent searches history.
  // Writes to LocalStorage for persistence, then re-syncs the in-memory state.
  // No toast shown here — search history updates silently in the background.
  //
  // @param {string} search — the search term string to add to history
  const handleAddRecentSearch = (search) => {
    addRecentSearch(search); // Persist to LocalStorage
    setRecentSearches(getRecentSearches()); // Re-read LocalStorage to sync state
  };

  // handleClearRecentSearches
  // Removes all items from the recent searches history.
  // Clears LocalStorage and resets in-memory state to an empty array
  // so the SearchBar dropdown immediately shows no history items.
  const handleClearRecentSearches = () => {
    clearRecentSearches(); // Delete all history from LocalStorage
    setRecentSearches([]); // Reset in-memory state immediately without re-reading LocalStorage
  };

  return (
    // AppContext.Provider makes all values in the value prop available
    // to every component in the tree that calls useApp().
    <AppContext.Provider
      value={{
        user, // Current logged-in user object or null
        login, // Function to log in and persist session
        logout, // Function to log out and clear session
        savedPlaces, // Array of saved place objects
        handleSavePlace, // Function to add a place to saved list
        handleRemovePlace, // Function to remove a place from saved list
        isPlaceSaved, // Function to check if a place is saved
        recentSearches, // Array of recent search term strings
        handleAddRecentSearch, // Function to add a term to search history
        handleClearRecentSearches, // Function to clear all search history
        toast, // Current toast notification object or null
        setToast, // Direct state setter to clear toast (used in Toast component)
        showToast, // Helper function to show a timed toast notification
      }}
    >
      {/* Render all child components that are wrapped inside AppProvider */}
      {children}
    </AppContext.Provider>
  );
};

// useApp — custom hook that wraps useContext(AppContext).
// Any component that needs global state calls useApp() instead of
// useContext(AppContext) directly, keeping the code cleaner and shorter.
// Example: const { user, savedPlaces } = useApp();
export const useApp = () => useContext(AppContext);
