import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine, RiArrowLeftLine, RiExternalLinkLine } from "react-icons/ri";
import { searchWikipedia } from "../utils/wikiSearch";
import "../styles/search.css";

const HISTORY_KEY = "searchHistory";
const MAX_HISTORY = 8;

function SearchPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    setHistory(stored);
  }, []);

const skipAutocomplete = useRef(false);

useEffect(() => {
  if (debounceRef.current) clearTimeout(debounceRef.current);

  if (skipAutocomplete.current) {
    skipAutocomplete.current = false;
    setShowDropdown(false);
    return;
  }

  if (!query.trim()) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  debounceRef.current = setTimeout(async () => {
    try {
      const data = await searchWikipedia(query);
      setSuggestions(data.slice(0, 6));
      setShowDropdown(true);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  }, 400);

  return () => clearTimeout(debounceRef.current);
}, [query]);

  const saveToHistory = (term) => {
    let updated = [term, ...history.filter((h) => h !== term)];
    updated = updated.slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const runSearch = async (term) => {
    if (!term.trim()) return;
    setShowDropdown(false);
    setLoading(true);
    try {
      const data = await searchWikipedia(term);
      setResults(data);
      saveToHistory(term);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleSuggestionClick = (title) => {
  skipAutocomplete.current = true;
  setQuery(title);
  runSearch(title);
};

const handleHistoryClick = (term) => {
  skipAutocomplete.current = true;
  setQuery(term);
  runSearch(term);
};

 const wrapperRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Search</h1>
        <a className="auth-link" onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <RiArrowLeftLine size={16} /> Back to Dashboard
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="search-box-wrapper" ref={wrapperRef}>
          <input
            className="search-input"
            type="text"
            placeholder="Search Wikipedia (e.g. React, Albert Einstein, Lahore)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length && setShowDropdown(true)}
          />

          {showDropdown && suggestions.length > 0 && (
            <div className="search-dropdown">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="search-dropdown-item"
                  onClick={() => handleSuggestionClick(s.title)}
                >
                  {s.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {history.length > 0 && (
        <div className="recent-searches">
          {history.map((term, i) => (
            <span key={i} className="recent-chip" onClick={() => handleHistoryClick(term)}>
              {term}
            </span>
          ))}
        </div>
      )}

      {loading && <p className="search-empty">Searching...</p>}

      {!loading && results.length === 0 && (
        <p className="search-empty">
          <RiSearchLine size={18} style={{ marginBottom: "-3px", marginRight: "6px" }} />
          Search for any topic to see results here
        </p>
      )}

      <div className="search-results">
        {results.map((r, i) => (
          <div className="result-card" key={i}>
            <p className="result-title">{r.title}</p>
            {r.description && <p className="result-description">{r.description}</p>}
            <a
              className="result-link"
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more <RiExternalLinkLine size={12} style={{ display: "inline" }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;