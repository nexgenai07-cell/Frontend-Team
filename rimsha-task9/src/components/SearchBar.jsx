// useState — manages multiple pieces of local UI state in this component
// useEffect — triggers the autocomplete API call whenever the debounced value changes
// useRef — holds a direct reference to the input DOM element for programmatic focus control
import { useState, useEffect, useRef } from "react";

// useApp — custom context hook that provides access to global app state.
// We use it here to read and update the recent search history.
import { useApp } from "../context/AppContext";

// useDebounce — a custom hook that delays updating a value until the user
// stops typing for a specified duration (400ms here).
// This prevents firing an API call on every single keystroke,
// which would be wasteful and could hit rate limits.
import useDebounce from "../hooks/useDebounce";

// motion — adds entry and exit animations to HTML elements via special props.
// AnimatePresence — a required wrapper component that detects when a child
// is conditionally removed from the DOM and lets it finish its exit animation
// before actually being removed. Without it, the dropdown would vanish instantly.
import { motion, AnimatePresence } from "framer-motion";

// MdSearch      — magnifier icon displayed on the left side of the input
// MdMic         — microphone icon on the right side (represents voice search)
// MdHistory     — clock icon shown next to each recent search item
// MdClose       — X icon inside the clear button
// MdLocationOn  — location pin icon shown next to each autocomplete result
// MdTrendingUp  — trending arrow icon shown next to trending suggestion items
import {
  MdSearch,
  MdMic,
  MdHistory,
  MdClose,
  MdLocationOn,
  MdTrendingUp,
} from "react-icons/md";

// FaCompass — compass icon used as the illustration in the autocomplete empty state
import { FaCompass } from "react-icons/fa";

// Geoapify API key loaded from the .env environment file.
// The VITE_ prefix is required by Vite to expose environment variables to the browser.
// Keeping the key in .env prevents it from being hardcoded and accidentally committed to version control.
const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

// DEFAULT_SUGGESTIONS — shown when input is empty and user has no search history.
// These are static fallback suggestions only shown before the user types anything.
// In a real production app these would be fetched from a backend analytics API
// based on what other users are searching most frequently.
const DEFAULT_SUGGESTIONS = [
  "Best beaches in Maldives",
  "Mountain retreats in Switzerland",
  "Historic cities in Europe",
  "Tropical forests in Bali",
  "Desert safari in Dubai",
  "Northern Lights in Norway",
  "Street food in Bangkok",
  "Ancient temples in Japan",
];

// getDynamicSuggestions — generates context-aware search suggestions
// based on whatever the user has currently typed in the input field.
// This replaces the static array when the user is actively typing,
// making the suggestions feel relevant and personalized to their query.
//
// Parameters:
//   input — the current raw text value from the search input field
//
// Returns:
//   An array of 4 suggestion strings that include the user's typed text
const getDynamicSuggestions = (input) => {
  // If input is empty or too short, fall back to the default static suggestions
  if (!input || input.trim().length < 2) return DEFAULT_SUGGESTIONS;

  const term = input.trim();

  // Return 4 suggestions that combine the typed term with popular travel intents.
  // Each suggestion follows a "travel intent + location" pattern that mirrors
  // how real users phrase location-based searches.
  return [
    `Best places to visit in ${term}`,
    `Hotels and stays in ${term}`,
    `Restaurants and food in ${term}`,
    `Tourist attractions in ${term}`,
  ];
};

// SearchBar Component
// A fully featured search input that includes real-time city autocomplete,
// recent search history, dynamic context-aware suggestions, and full keyboard navigation.
// When the user confirms a search, the extracted location term is passed up to the parent
// component (Navbar → Home.jsx) via the onSearch callback prop.
//
// Props:
//   onSearch — callback function called with the confirmed location term string
//              so the parent can trigger geocoding and move the map
const SearchBar = ({ onSearch }) => {
  // Stores the current text value typed inside the search input field.
  // Updated on every keystroke via handleInputChange.
  const [inputValue, setInputValue] = useState("");

  // Controls whether the suggestions dropdown is currently visible.
  // true = show dropdown, false = hide dropdown.
  const [isOpen, setIsOpen] = useState(false);

  // Holds the array of city suggestion objects returned by the Geoapify autocomplete API.
  // Each object contains name, country, formatted address, lat, and lng.
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  // True while an autocomplete API request is currently in progress.
  // Used to show and hide the spinning loader inside the input field.
  const [acLoading, setAcLoading] = useState(false);

  // Tracks which dropdown item is currently highlighted during keyboard navigation.
  // -1 means no item is selected and the cursor is effectively in the input field.
  // 0 and above correspond to items in the dropdown list.
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // A direct reference to the input DOM element.
  // Used to programmatically return focus to the input after the user clears it.
  const inputRef = useRef(null);

  // Pull the recent search history and its handler functions from global context.
  // recentSearches            — array of past search terms persisted in LocalStorage
  // handleAddRecentSearch     — saves a new search term to LocalStorage
  // handleClearRecentSearches — removes the entire search history from LocalStorage
  const { recentSearches, handleAddRecentSearch, handleClearRecentSearches } =
    useApp();

  // Apply a 400ms debounce to the raw input value.
  // debouncedValue only updates after the user has stopped typing for 400ms.
  // The autocomplete API is triggered by this debounced value, not the raw one,
  // so rapid keystrokes do not each fire a separate API request.
  const debouncedValue = useDebounce(inputValue, 400);

  // Compute the dynamic suggestions based on the current raw input value.
  // This updates instantly on every keystroke (not debounced) so the
  // suggestion chips feel responsive and update as the user types.
  // When input is empty this returns DEFAULT_SUGGESTIONS as a fallback.
  const dynamicSuggestions = getDynamicSuggestions(inputValue);

  // ─────────────────────────────────────────────────────────────
  // EFFECT: AUTOCOMPLETE API CALL
  // Runs every time debouncedValue changes.
  // Calls the Geoapify geocode autocomplete endpoint to fetch real city suggestions
  // matching whatever the user has typed so far.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAutocomplete = async () => {
      // Skip the API call entirely if the input is fewer than 2 characters.
      // Single character queries return too many irrelevant results and waste API quota.
      if (debouncedValue.trim().length < 2) {
        setAutocompleteResults([]);
        return;
      }

      // Show the loading spinner while the request is in flight
      setAcLoading(true);

      try {
        // Call the Geoapify autocomplete endpoint.
        // encodeURIComponent ensures spaces and special characters in the query are URL-safe.
        // limit=5 caps the response at 5 suggestions to keep the dropdown compact.
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(debouncedValue)}&limit=5&apiKey=${GEO_KEY}`,
        );

        const data = await response.json();

        if (data.features) {
          // The API response contains many fields per result.
          // Extract only the fields we actually display in the dropdown.
          // city, name, and town are all tried in order since different
          // location types use different property names.
          const results = data.features.map((f) => ({
            name:
              f.properties.city || f.properties.name || f.properties.town || "",
            country: f.properties.country || "",
            formatted: f.properties.formatted || "", // Full human-readable address string
            lat: f.properties.lat,
            lng: f.properties.lon,
          }));

          // Filter out any results where name ended up empty
          // to avoid rendering blank rows in the dropdown.
          setAutocompleteResults(results.filter((r) => r.name));
        }
      } catch (error) {
        // Handle errors silently — the dropdown simply shows no results.
        // Showing an error message for autocomplete failure would be disruptive.
        console.error("Autocomplete error:", error);
        setAutocompleteResults([]);
      }

      // Hide the loading spinner whether the request succeeded or failed
      setAcLoading(false);
    };

    fetchAutocomplete();
  }, [debouncedValue]);

  // ─────────────────────────────────────────────────────────────
  // handleSearch
  // Called when the user clicks a suggestion or presses Enter.
  // Extracts the location name from natural language phrases like
  // "restaurants in lahore" before passing the term to the parent.
  // This allows the geocoding API to receive a clean city name
  // instead of a full sentence it cannot resolve to coordinates.
  // ─────────────────────────────────────────────────────────────
  const handleSearch = (searchTerm) => {
    // Ignore searches that are empty or contain only whitespace
    if (!searchTerm.trim()) return;

    // Persist the full original search term to LocalStorage via the context handler.
    // We save the full phrase (e.g. "restaurants in lahore") so the history
    // shows what the user actually typed, not the extracted location.
    handleAddRecentSearch(searchTerm);

    // Extract just the location part from natural language phrases.
    // If the term contains " in " (e.g. "restaurants in lahore"),
    // split on " in " and take the last segment as the location name.
    // If " in " is not present (e.g. user typed "lahore" directly),
    // use the full term as-is since it is already a plain location name.
    // This extracted locationTerm is what gets passed to the geocoding API
    // so it can return valid coordinates for the map to fly to.
    const locationTerm = searchTerm.toLowerCase().includes(" in ")
      ? searchTerm
          .split(/\s+in\s+/i)
          .pop()
          .trim()
      : searchTerm.trim();

    // Pass the clean location term up to the parent (Navbar → Home.jsx).
    // Home.jsx will call the geocoding API with this term and fly the map to the result.
    if (onSearch) onSearch(locationTerm);

    // Update the input field to show the original full phrase the user typed
    // so they can see what they searched, not the extracted location.
    setInputValue(searchTerm);

    // Close the dropdown and reset keyboard selection state
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // ─────────────────────────────────────────────────────────────
  // handleInputChange
  // Fires on every keystroke inside the input field.
  // ─────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    // Update the input value with the latest typed text
    setInputValue(e.target.value);
    // Open the dropdown so autocomplete results appear as the user types
    setIsOpen(true);
    // Reset keyboard selection so the previous highlight does not carry over
    // to a new set of autocomplete results
    setSelectedIndex(-1);
  };

  // ─────────────────────────────────────────────────────────────
  // handleKeyDown
  // Handles keyboard navigation within the dropdown.
  // ArrowDown/Up move the highlight, Enter confirms, Escape closes.
  // ─────────────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    // Total number of keyboard-navigable items =
    // autocomplete results + recent search items combined
    const totalItems = autocompleteResults.length + recentSearches.length;

    if (e.key === "ArrowDown") {
      // Move the highlight one item downward.
      // Math.min prevents the index from going past the last item in the list.
      setSelectedIndex((prev) => Math.min(prev + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      // Move the highlight one item upward.
      // Math.max(-1) allows the user to move back up past the first item
      // to -1, which represents the input field itself being focused.
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < autocompleteResults.length) {
        // Enter was pressed while an autocomplete result was highlighted —
        // search using that result's city name.
        handleSearch(autocompleteResults[selectedIndex].name);
      } else if (selectedIndex >= autocompleteResults.length) {
        // Enter was pressed while a recent search item was highlighted.
        // Subtract the autocomplete results count from selectedIndex
        // to get the correct index within the recentSearches array.
        handleSearch(
          recentSearches[selectedIndex - autocompleteResults.length],
        );
      } else {
        // No dropdown item was highlighted (selectedIndex is -1).
        // Search using whatever raw text is currently in the input field.
        handleSearch(inputValue);
      }
    } else if (e.key === "Escape") {
      // Close the dropdown without performing any search
      setIsOpen(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // handleClear
  // Resets all search-related state and returns focus to the input.
  // Called when the user clicks the X clear button.
  // ─────────────────────────────────────────────────────────────
  const handleClear = () => {
    setInputValue(""); // Empty the input field
    setAutocompleteResults([]); // Remove any displayed autocomplete results
    setIsOpen(false); // Close the dropdown
    inputRef.current?.focus(); // Return keyboard focus to the input so the user can type again immediately
    // The ?. optional chaining operator prevents a crash if inputRef.current is null
  };

  // ─────────────────────────────────────────────────────────────
  // DROPDOWN SECTION VISIBILITY FLAGS
  // These three booleans determine which section of the dropdown is rendered.
  // They are mutually exclusive — only one can be true at a time.
  // ─────────────────────────────────────────────────────────────

  // Show the live autocomplete results section when the user has typed 2 or more characters.
  const showAutocomplete = inputValue.trim().length >= 2;

  // Show the recent searches section when the input is empty
  // but the user has at least one item in their search history.
  const showRecent = !showAutocomplete && recentSearches.length > 0;

  // Show the static trending suggestions section when the input is empty
  // and the user has no search history at all (first-time or cleared history).
  const showSuggestions = !showAutocomplete && recentSearches.length === 0;

  return (
    // The relative wrapper is required so the absolutely positioned dropdown
    // is positioned relative to this container rather than the entire page.
    <div className="relative w-full max-w-2xl mx-auto">
      {/* ── Search Input Container ───────────────────────────────
          Switches between a blue border with shadow when the dropdown is open
          and a subtle gray border when it is closed.
          This gives the user a clear visual signal that the search bar is active. */}
      <div
        className={`
          flex items-center bg-white rounded-full px-4 py-2.5 gap-3
          border transition-all duration-200
          ${
            isOpen
              ? "border-blue-400 shadow-lg shadow-blue-100"
              : "border-gray-200 shadow-md"
          }
        `}
      >
        {/* Magnifier icon on the left — purely decorative, indicates this is a search input */}
        <MdSearch className="text-gray-400 text-2xl shrink-0" />

        {/* The main text input element.
            ref={inputRef} stores the DOM reference for focus control after clearing.
            onFocus opens the dropdown whenever the user clicks into or tabs into the field.
            outline-none removes the default browser blue focus ring.
            bg-transparent lets the parent container's white background show through. */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations, experiences..."
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />

        {/* Spinning loader — only visible while the autocomplete API call is in progress.
            The transparent top border on one side creates the spinning arc effect. */}
        {acLoading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
        )}

        {/* Clear button — only rendered when there is text in the input and the API is not loading.
            Clicking it calls handleClear which resets all search state. */}
        {inputValue && !acLoading && (
          <button onClick={handleClear} className="shrink-0">
            <MdClose className="text-gray-400 text-xl hover:text-gray-600 transition-colors" />
          </button>
        )}

        {/* Microphone icon — represents voice search capability.
            Currently decorative only; actual voice search API can be wired up here later. */}
        <MdMic className="text-blue-600 text-2xl shrink-0 cursor-pointer hover:text-blue-700 transition-colors" />
      </div>

      {/* ── Suggestions Dropdown ─────────────────────────────────
          AnimatePresence watches for isOpen becoming false and allows
          the motion.div inside to complete its exit animation before
          being removed from the DOM. Without this the dropdown would
          disappear instantly with no fade-out animation. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            style={{ zIndex: 999999 }}
          >
            {/* max-h-80 caps the dropdown height to prevent it from extending off screen.
                overflow-y-auto adds a scrollbar when the content exceeds that height. */}
            <div className="max-h-80 overflow-y-auto">
              {/* ══════════════════════════════════════════════════════
                  SECTION 1 — AUTOCOMPLETE RESULTS
                  Shown when the user has typed 2 or more characters.
                  Displays real city suggestions fetched from Geoapify.
              ══════════════════════════════════════════════════════ */}
              {showAutocomplete && (
                <>
                  {autocompleteResults.length > 0 ? (
                    <>
                      {/* Section label — sticky so it stays visible while scrolling results */}
                      <div className="px-4 py-2.5 border-b border-gray-50 sticky top-0 bg-white">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Destinations
                        </p>
                      </div>

                      {/* Render one clickable row for each autocomplete result.
                          The selectedIndex highlight is applied via a conditional class. */}
                      {autocompleteResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(result.name)}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3
                            hover:bg-blue-50 transition-colors text-left
                            ${selectedIndex === index ? "bg-blue-50" : ""}
                          `}
                        >
                          {/* Blue circle with a location pin icon as the row's leading visual */}
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <MdLocationOn className="text-blue-600 text-sm" />
                          </div>

                          {/* min-w-0 on the flex child is required for text truncation to work
                              inside a flex container — without it truncate has no effect. */}
                          <div className="flex-1 min-w-0">
                            {/* Primary city name in bold — truncated if too long */}
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {result.name}
                            </p>
                            {/* Full formatted address in smaller gray text below the name */}
                            <p className="text-xs text-gray-400 truncate">
                              {result.formatted}
                            </p>
                          </div>

                          {/* Country name pinned to the right side of the row */}
                          <span className="text-xs text-gray-400 shrink-0">
                            {result.country}
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    // Empty state — shown when the API returned zero results for the typed query.
                    // Only rendered after loading completes (acLoading is false).
                    !acLoading && (
                      <div className="px-4 py-6 text-center">
                        <FaCompass className="text-gray-300 text-3xl mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          No destinations found for "{inputValue}"
                        </p>
                      </div>
                    )
                  )}

                  {/* Dynamic suggestion chips shown below the autocomplete results.
                      These update in real time as the user types — showing travel intent
                      combinations like "Hotels in Paris" or "Restaurants in Paris".
                      Clicking any chip calls handleSearch which extracts the location
                      from the phrase before passing it to the geocoding API. */}
                  <div className="border-t border-gray-50 px-4 py-2.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Suggested Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dynamicSuggestions
                        .slice(0, 4)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 rounded-full text-xs text-gray-600 hover:text-blue-600 transition-colors border border-gray-100"
                          >
                            <MdTrendingUp className="text-xs" />
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>
                </>
              )}

              {/* ══════════════════════════════════════════════════════
                  SECTION 2 — RECENT SEARCHES
                  Shown when the input is empty and the user has at
                  least one item saved in their search history.
              ══════════════════════════════════════════════════════ */}
              {showRecent && (
                <>
                  {/* Header row with section label on the left and a Clear All button on the right.
                      sticky top-0 keeps the header visible when the history list is scrollable. */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 sticky top-0 bg-white">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Searches
                    </p>
                    {/* Clear All removes every item from the search history in LocalStorage */}
                    <button
                      onClick={handleClearRecentSearches}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Render one clickable row for each saved search term.
                      The selectedIndex offset accounts for the autocomplete results
                      that come before recent searches in the keyboard navigation order. */}
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3
                        hover:bg-gray-50 transition-colors text-left
                        ${selectedIndex === autocompleteResults.length + index ? "bg-gray-50" : ""}
                      `}
                    >
                      {/* Gray circle with a history/clock icon as the row's leading visual */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <MdHistory className="text-gray-500 text-sm" />
                      </div>
                      {/* The saved search term text */}
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </>
              )}

              {/* ══════════════════════════════════════════════════════
                  SECTION 3 — DEFAULT TRENDING SUGGESTIONS
                  Shown when the input is empty and the user has no
                  search history at all (new user or cleared history).
                  Displays the DEFAULT_SUGGESTIONS static array as full-width rows.
              ══════════════════════════════════════════════════════ */}
              {showSuggestions && (
                <>
                  {/* Section label — sticky so it stays visible while scrolling */}
                  <div className="px-4 py-2.5 border-b border-gray-50 sticky top-0 bg-white">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Trending Searches
                    </p>
                  </div>

                  {/* Render all DEFAULT_SUGGESTIONS as full-width clickable rows */}
                  {DEFAULT_SUGGESTIONS.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      {/* Orange circle with a trending arrow icon as the row's leading visual */}
                      <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                        <MdTrendingUp className="text-orange-400 text-sm" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible full-screen overlay rendered behind the dropdown.
          Clicking anywhere outside the dropdown area triggers setIsOpen(false)
          to close it. z-40 keeps it below the dropdown (z-[999999])
          but above the rest of the page content so clicks are captured correctly. */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default SearchBar;
