// useState — states ke liye
// useEffect — debounce ke liye
// useCallback — function memoize karne ke liye
import { useState, useEffect, useCallback } from "react";

// search.service.js sy functions import kar rahy hain
import {
  searchGoogle,
  getAutocompleteSuggestions,
} from "../../services/search.service";

// LocalStorage keys — yahan save hongi searches
const RECENT_SEARCHES_KEY = "secureportal_recent_searches";
const SAVED_SEARCHES_KEY = "secureportal_saved_searches";

const useSearch = () => {
  // Search query — user jo type kar raha hai
  const [query, setQuery] = useState("");

  // Search results — SerpAPI se aaye results
  const [results, setResults] = useState([]);

  // Autocomplete suggestions — dropdown mein dikhenge
  const [suggestions, setSuggestions] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  // Suggestions dropdown dikhana hai ya nahi
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Recent searches — LocalStorage sy load karo
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Saved searches — LocalStorage sy load karo
  const [savedSearches, setSavedSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SAVED_SEARCHES_KEY)) || [];
    } catch {
      return [];
    }
  });

  // ==========================================
  // DEBOUNCED AUTOCOMPLETE
  // ==========================================
  // User type kar raha hai — har letter pe call nahi
  // 300ms baad suggestions fetch karo

  useEffect(() => {
    // Query 2 characters se kam — suggestions clear karo
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // 300ms ka timer set karo
    const debounceTimer = setTimeout(async () => {
      try {
        // Autocomplete suggestions fetch karo
        const data = await getAutocompleteSuggestions(query);
        setSuggestions(data);
        // Suggestions hain — dropdown dikhao
        setShowSuggestions(data.length > 0);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    // Cleanup — agar user dobara type kare
    // pehla timer cancel ho jaye
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // ==========================================
  // SEARCH FUNCTION
  // ==========================================
  // SearchPage.jsx is function ko call karegi
  // query leta hai — results fetch karta hai

  const handleSearch = useCallback(async (searchQuery) => {
    // Query empty — kuch mat karo
    if (!searchQuery || searchQuery.trim() === "") return;

    try {
      setLoading(true);
      setError(null);

      // Suggestions dropdown band karo
      setShowSuggestions(false);

      // SerpAPI ko call karo
      const data = await searchGoogle(searchQuery);

      // Results state mein save karo
      setResults(data);

      // Recent searches mein add karo
      saveToRecentSearches(searchQuery);
    } catch (err) {
      setError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // SAVE TO RECENT SEARCHES
  // ==========================================
  // Har search LocalStorage mein save hoga
  // Maximum 5 recent searches rakhenge

  const saveToRecentSearches = (searchQuery) => {
    setRecentSearches((prev) => {
      // Pehle se hai toh remove karo — duplicate na ho
      const filtered = prev.filter((s) => s !== searchQuery);

      // Naya search upar add karo
      const updated = [searchQuery, ...filtered];

      // Sirf 5 rakhenge
      const limited = updated.slice(0, 5);

      // LocalStorage mein save karo
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));

      return limited;
    });
  };

  // ==========================================
  // SAVE SEARCH — BOOKMARK
  // ==========================================
  // User ne bookmark icon dabaya — search save karo

  const handleSaveSearch = (searchQuery) => {
    setSavedSearches((prev) => {
      // Pehle se saved hai — remove karo (toggle)
      if (prev.includes(searchQuery)) {
        const updated = prev.filter((s) => s !== searchQuery);
        localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(updated));
        return updated;
      }

      // Naya save karo
      const updated = [searchQuery, ...prev];
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // ==========================================
  // REMOVE RECENT SEARCH
  // ==========================================
  // X button dabane pe recent search remove karo

  const handleRemoveRecentSearch = (searchQuery) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== searchQuery);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // ==========================================
  // CLEAR ALL RECENT SEARCHES
  // ==========================================

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // SearchPage.jsx ko ye cheezein mileingi
  return {
    query,
    setQuery,
    results,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    loading,
    error,
    recentSearches,
    savedSearches,
    handleSearch,
    handleSaveSearch,
    handleRemoveRecentSearch,
    handleClearRecentSearches,
  };
};

export default useSearch;
