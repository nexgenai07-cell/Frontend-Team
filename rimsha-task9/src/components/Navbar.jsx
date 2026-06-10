// React Router hooks for navigation without page reload
import { Link, useNavigate } from "react-router-dom";

// Global state - user data, logout function, and saved places count
import { useApp } from "../context/AppContext";

// Icons from React Icons library
import { FaGlobe } from "react-icons/fa";
import {
  MdLogout,
  MdLogin,
  MdFavorite,
  MdPerson,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";

// Framer Motion for smooth animations and exit transitions
import { motion, AnimatePresence } from "framer-motion";

// SearchBar handles debounced search, autocomplete and history
import SearchBar from "./SearchBar";

// useState to manage dropdown and mobile menu visibility
import { useState } from "react";

// Navbar receives onSearch from Home.jsx
// When user searches, term is passed up to parent component
const Navbar = ({ onSearch }) => {
  // user — logged in user object or null if not authenticated
  // logout — clears user from LocalStorage and resets state
  // savedPlaces — array of saved destinations for badge count
  const { user, logout, savedPlaces } = useApp();

  // Hook for programmatic navigation after logout
  const navigate = useNavigate();

  // Controls whether mobile hamburger dropdown is visible
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Controls whether user profile dropdown is visible
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Logout handler — clears session and redirects to login page
  const handleLogout = () => {
    // Remove user from LocalStorage via Context
    logout();
    // Close both menus if they were open
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    // Send user to login page
    navigate("/login");
  };

  // Search handler — receives term from SearchBar
  // Passes it up to Home.jsx via onSearch prop
  const handleSearch = (searchTerm) => {
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <>
      {/* ======================== */}
      {/* MAIN NAVBAR WRAPPER      */}
      {/* fixed — stays on screen  */}
      {/* while user scrolls       */}
      {/* z-50 — above all content */}
      {/* ======================== */}
      <motion.nav
        // Slide down from top on page load
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass morphism background */}
        {/* backdrop-blur creates frosted glass effect */}
        {/* bg-white/95 = white with 95% opacity */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Main flex row — logo | search | nav */}
            {/* h-16 = fixed 64px navbar height */}
            <div className="flex items-center gap-4 h-16">
              {/* =================== */}
              {/* LEFT SECTION: Logo  */}
              {/* =================== */}

              {/* shrink-0 prevents logo from compressing */}
              <Link to="/" className="flex items-center gap-2 shrink-0 group">
                {/* Globe icon container */}
                {/* Rotates 360 degrees on hover */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200"
                >
                  {/* Globe represents world travel theme */}
                  <FaGlobe className="text-white text-lg" />
                </motion.div>

                {/* Brand name hidden on mobile to save space */}
                {/* sm:block shows it from 640px and above */}
                <div className="hidden sm:block">
                  {/* First word in dark color */}
                  <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Wander
                  </span>
                  {/* Second word in brand blue */}
                  <span className="text-lg font-bold text-blue-600">
                    Search
                  </span>
                </div>
              </Link>

              {/* ========================= */}
              {/* CENTER SECTION: Search    */}
              {/* flex-1 fills all          */}
              {/* remaining space           */}
              {/* ========================= */}
              <div className="flex-1">
                {/* SearchBar handles debounce, autocomplete, history */}
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* ============================= */}
              {/* RIGHT SECTION: Desktop Nav    */}
              {/* hidden on mobile, visible     */}
              {/* from md breakpoint (768px) up */}
              {/* ============================= */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                {/* Saved Places button with dynamic count badge */}
                <Link
                  to="/favorites"
                  className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium px-3 py-2 rounded-xl hover:bg-red-50 relative"
                >
                  {/* Heart icon for favorites */}
                  <MdFavorite className="text-lg text-red-400" />
                  <span>Saved</span>

                  {/* Badge — only renders when places are saved */}
                  {savedPlaces.length > 0 && (
                    <motion.span
                      // Pop in animation when badge first appears
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {/* Show actual count — no cap */}
                      {savedPlaces.length}
                    </motion.span>
                  )}
                </Link>

                {/* Visual separator between nav links and user section */}
                <div className="w-px h-6 bg-gray-200" />

                {/* ========================== */}
                {/* USER AUTHENTICATION SECTION */}
                {/* Shows different UI based    */}
                {/* on login status             */}
                {/* ========================== */}
                {user ? (
                  // USER IS LOGGED IN — show avatar button with dropdown
                  <div className="relative">
                    {/* Clickable user pill — opens dropdown on click */}
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 transition-colors"
                    >
                      {/* Avatar circle showing first letter of name */}
                      <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Show only first word of name eg: "Rimsha Ahmed" → "Rimsha" */}
                      <span className="text-sm font-semibold text-gray-700">
                        {user.name.split(" ")[0]}
                      </span>

                      {/* Arrow rotates 180deg when dropdown is open */}
                      <motion.div
                        animate={{ rotate: userDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdKeyboardArrowDown className="text-gray-400 text-lg" />
                      </motion.div>
                    </button>

                    {/* ======================== */}
                    {/* USER DROPDOWN MENU       */}
                    {/* AnimatePresence needed   */}
                    {/* for exit animation       */}
                    {/* ======================== */}
                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          // Scale up from top right corner
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          // Positioned below the avatar button
                          // right-0 aligns dropdown to right edge of button
                          className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-w-55"
                          style={{ zIndex: 99999 }}
                        >
                          {/* Dropdown header — shows full user info */}
                          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                            <div className="flex items-center gap-3">
                              {/* Larger avatar for dropdown header */}
                              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </div>

                              <div>
                                {/* Full display name */}
                                <p className="text-sm font-bold text-gray-800">
                                  {user.name}
                                </p>
                                {/* Email address — truncated if too long */}
                                <p className="text-xs text-gray-500 truncate max-w-32.5">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Dropdown menu items */}
                          <div className="p-2">
                            {/* My Profile button — placeholder for future feature */}
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                              <MdPerson className="text-gray-400 text-lg" />
                              <span className="text-sm text-gray-600">
                                My Profile
                              </span>
                            </button>

                            {/* Saved Places shortcut with live count badge */}
                            <Link
                              to="/favorites"
                              onClick={() => setUserDropdownOpen(false)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <MdFavorite className="text-red-400 text-lg" />
                              <span className="text-sm text-gray-600">
                                Saved Places
                              </span>
                              {/* Live count updates when places are saved or removed */}
                              {savedPlaces.length > 0 && (
                                <span className="ml-auto bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                                  {savedPlaces.length}
                                </span>
                              )}
                            </Link>

                            {/* Horizontal divider before logout */}
                            <div className="h-px bg-gray-100 my-1" />

                            {/* Logout button — clears session */}
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left"
                            >
                              <MdLogout className="text-red-400 text-lg" />
                              <span className="text-sm font-medium text-red-500">
                                Logout
                              </span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // USER IS NOT LOGGED IN — show login button
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                    >
                      <MdLogin className="text-lg" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* ========================== */}
              {/* MOBILE HAMBURGER BUTTON    */}
              {/* Only visible below 768px   */}
              {/* md:hidden hides it above   */}
              {/* ========================== */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              >
                <HiMenuAlt3 className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================== */}
        {/* MOBILE DROPDOWN MENU       */}
        {/* Slides down when hamburger */}
        {/* button is clicked          */}
        {/* ========================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              // Animate from 0 height to full height
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              // Collapse back to 0 height when closing
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                {/* User info card — only shown when authenticated */}
                {user && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mb-2">
                    {/* Avatar with gradient */}
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      {/* Full name */}
                      <p className="text-sm font-bold text-gray-800">
                        {user.name}
                      </p>
                      {/* Email */}
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Saved Places menu item */}
                {/* Closes menu after navigation */}
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <MdFavorite className="text-red-400 text-xl" />
                  <span className="text-sm font-medium text-gray-700">
                    Saved Places
                  </span>
                  {/* Live count badge */}
                  {savedPlaces.length > 0 && (
                    <span className="ml-auto bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                      {savedPlaces.length}
                    </span>
                  )}
                </Link>

                {/* Divider line */}
                <div className="h-px bg-gray-100 my-1" />

                {/* Auth section — logout or login based on state */}
                {user ? (
                  // Logged in — show logout button
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-left"
                  >
                    <MdLogout className="text-red-400 text-xl" />
                    <span className="text-sm font-medium text-red-500">
                      Logout
                    </span>
                  </button>
                ) : (
                  // Not logged in — show login button
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-600 transition-colors"
                  >
                    <MdLogin className="text-white text-xl" />
                    <span className="text-sm font-semibold text-white">
                      Login
                    </span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Invisible full screen overlay */}
      {/* Clicking outside closes both menus */}
      {(userDropdownOpen || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserDropdownOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
