// useSearch hook — search logic ke liye
import useSearch from "../../hooks/search/useSearch";

// React Icons
import {
  FiSearch,
  FiX,
  FiBookmark,
  FiClock,
  FiExternalLink,
  FiLoader,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { BsBookmarkFill, BsShare } from "react-icons/bs";

// Framer Motion — animations ke liye
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  const {
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
  } = useSearch();

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  // Suggestion click handler
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  // Recent search click handler
  const handleRecentSearchClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  // Check if search is saved
  const isSearchSaved = (searchQuery) => {
    return savedSearches.includes(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col">
      {/* ========================================== */}
      {/* TOP NAVBAR */}
      {/* ========================================== */}
      <div className="bg-[#0D0D1A] border-b border-purple-900/50 px-4 md:px-6 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <span className="text-white font-bold text-lg">SecurePortal</span>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/dashboard"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/search"
              className="text-white text-sm font-semibold border-b-2 border-purple-500 pb-1"
            >
              Search
            </a>
            <a
              href="/pricing"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Payments
            </a>
            <a
              href="/settings"
              className="text-purple-400 hover:text-white text-sm transition-colors"
            >
              Settings
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiBell className="text-lg" />
            </button>
            <button className="text-purple-400 hover:text-white transition-colors">
              <FiUser className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN LAYOUT — SIDEBAR + CONTENT */}
      {/* ========================================== */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* ========================================== */}
        {/* LEFT SIDEBAR — SEARCH HISTORY */}
        {/* Desktop pe dikhega — mobile pe hide */}
        {/* ========================================== */}
        <div className="hidden lg:flex flex-col w-52 shrink-0 border-r border-purple-900/50 px-4 py-6 gap-6">
          {/* Recent Searches */}
          <div>
            <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Search History
            </p>

            {recentSearches.length === 0 ? (
              <p className="text-purple-800 text-xs">No recent searches</p>
            ) : (
              <div className="flex flex-col gap-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <button
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center gap-2 text-white hover:text-purple-300 text-xs transition-colors truncate flex-1"
                    >
                      <FiClock className="shrink-0 text-purple-600" />
                      <span className="truncate">{search}</span>
                    </button>
                    <button
                      onClick={() => handleRemoveRecentSearch(search)}
                      className="text-purple-800 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-1"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ))}

                {recentSearches.length > 0 && (
                  <button
                    onClick={handleClearRecentSearches}
                    className="text-purple-700 hover:text-purple-500 text-xs transition-colors text-left mt-1"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Saved Searches */}
          <div>
            <p className="text-purple-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Saved Searches
            </p>

            {savedSearches.length === 0 ? (
              <p className="text-purple-800 text-xs">No saved searches</p>
            ) : (
              <div className="flex flex-col gap-2">
                {savedSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-300 text-xs transition-colors text-left"
                  >
                    <BsBookmarkFill className="shrink-0" />
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN CONTENT */}
        {/* ========================================== */}
        <div className="flex-1 px-4 md:px-8 py-8">
          {/* Page Title */}
          <h1 className="text-white text-4xl font-bold text-center mb-8">
            Universal Search
          </h1>

          {/* ========================================== */}
          {/* SEARCH BAR */}
          {/* ========================================== */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center bg-[#1A1A2E] border border-purple-900/70 rounded-full px-5 gap-3 focus-within:border-purple-500 transition-colors shadow-lg shadow-purple-900/20">
                <FiSearch className="text-purple-500 text-lg shrink-0" />
                <input
                  type="text"
                  placeholder="Find security reports, assets, or policies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() =>
                    suggestions.length > 0 && setShowSuggestions(true)
                  }
                  // 200ms delay — suggestion click hone do pehle
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="bg-transparent text-white py-4 w-full outline-none placeholder-purple-700 text-sm"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setShowSuggestions(false);
                    }}
                    className="text-purple-500 hover:text-purple-300 transition-colors"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </form>

            {/* ========================================== */}
            {/* AUTOCOMPLETE DROPDOWN */}
            {/* max-h-60 + overflow-y-auto — scroll hoga */}
            {/* ========================================== */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A2E] border border-purple-900 rounded-2xl overflow-y-auto max-h-60 z-50 shadow-xl"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-white hover:bg-purple-900/30 text-sm transition-colors text-left border-b border-purple-900/30 last:border-0"
                    >
                      <FiSearch className="text-purple-500 shrink-0" />
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <FiLoader className="text-purple-400 text-4xl animate-spin" />
            </div>
          )}

          {/* ========================================== */}
          {/* SEARCH RESULTS — 2 column grid */}
          {/* ========================================== */}
          {!loading && results.length > 0 && (
            <div>
              {/* Results count + Save Search */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-purple-500 text-sm">
                  {results.length} results found
                </p>
                <button
                  onClick={() => handleSaveSearch(query)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isSearchSaved(query)
                      ? "text-yellow-400"
                      : "text-purple-400 hover:text-yellow-400"
                  }`}
                >
                  {isSearchSaved(query) ? <BsBookmarkFill /> : <FiBookmark />}
                  <span>{isSearchSaved(query) ? "Saved" : "Save Search"}</span>
                </button>
              </div>

              {/* 2 Column Grid — mobile pe 1 column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-[#1A1A2E] border border-purple-900/60 rounded-xl p-5 hover:border-purple-600/60 transition-colors flex flex-col gap-3"
                  >
                    {/* Top row — URL */}
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Favicon placeholder */}
                      <div className="w-5 h-5 rounded-full bg-purple-900 shrink-0 flex items-center justify-center">
                        <FiSearch className="text-purple-400 text-xs" />
                      </div>
                      <p className="text-gray-100 text-xs truncate">
                        {result.displayed_link || result.link}
                      </p>
                    </div>

                    {/* Result Title */}
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-300 font-semibold text-sm leading-snug transition-colors line-clamp-2"
                    >
                      {result.title}
                    </a>

                    {/* Result Description */}
                    <p className="text-purple-400 text-xs leading-relaxed line-clamp-3">
                      {result.snippet}
                    </p>

                    {/* Bottom row — date + action icons */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-purple-900/40">
                      <p className="text-purple-700 text-xs">
                        {result.date || "Recent"}
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="text-purple-600 hover:text-purple-400 transition-colors">
                          <BsShare className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleSaveSearch(result.title)}
                          className="text-purple-600 hover:text-yellow-400 transition-colors"
                        >
                          <FiBookmark className="text-xs" />
                        </button>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-400 transition-colors"
                        >
                          <FiExternalLink className="text-xs" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && results.length === 0 && query && !error && (
            <div className="text-center py-20">
              <FiSearch className="text-purple-800 text-5xl mx-auto mb-4" />
              <p className="text-purple-500 text-sm">
                No results found for &quot;{query}&quot;
              </p>
            </div>
          )}

          {/* Initial State */}
          {!loading && results.length === 0 && !query && (
            <div className="text-center py-20">
              <FiSearch className="text-purple-800 text-6xl mx-auto mb-4" />
              <p className="text-purple-600 text-sm">
                Enter a search query to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}
      <div className="border-t border-purple-900/50 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <span className="text-purple-700 text-xs">SecurePortal</span>
          <div className="flex items-center gap-4">
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="text-purple-700 text-xs hover:text-purple-500 cursor-pointer transition-colors">
              Help Center
            </span>
          </div>
          <span className="text-purple-700 text-xs">
            © 2024 Enterprise Security
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
