import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose, MdExplore } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import Navbar from "../components/Navbar";
import PlaceCard from "../components/PlaceCard";
import { useState } from "react";

// Filter tabs — id is used in logic, label shows on screen
const FILTERS = [
  { id: "all", label: "✨ All" },
  { id: "Beach Resort", label: "🏖️ Beaches" },
  { id: "City Hotel", label: "🏙️ Cities" },
  { id: "Boutique Hotel", label: "🏨 Hotels" },
  { id: "Experience", label: "🎯 Experiences" },
  { id: "Saved Location", label: "📍 Locations" },
];

const Favorites = () => {
  const { savedPlaces, handleRemovePlace } = useApp();
  const navigate = useNavigate();

  // Track which filter tab is active
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter logic
  // if "all" — show everything
  // otherwise — only show places matching the selected category
  const filteredPlaces =
    activeFilter === "all"
      ? savedPlaces
      : savedPlaces.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Decorative background blobs */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="pt-20 max-w-7xl mx-auto px-4 py-8 relative">
        {/* Page Header — fades in from top on mount */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Gradient banner card */}
          <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            {/* Decorative circles inside banner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/10 rounded-full translate-y-8" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <FaHeart className="text-white text-lg" />
                  </div>
                  <h1 className="text-3xl font-bold">My Saved Places</h1>
                </div>
                <p className="text-blue-100 text-sm">
                  {savedPlaces.length === 0
                    ? "Your travel wishlist is empty — start exploring!"
                    : `You have ${savedPlaces.length} destination${savedPlaces.length !== 1 ? "s" : ""} saved in your wishlist`}
                </p>
              </div>

              {/* Total count badge — top right of banner */}
              {savedPlaces.length > 0 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center border border-white/30">
                  <p className="text-3xl font-bold">{savedPlaces.length}</p>
                  <p className="text-xs text-blue-100">Saved</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs — horizontal scroll on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-5 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all border shadow-sm
                ${
                  activeFilter === filter.id
                    ? // Active tab — solid blue with shadow
                      "bg-blue-600 text-white border-blue-600 shadow-blue-200 shadow-md scale-105"
                    : // Inactive tab — white with gray border
                      "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* ============ EMPTY STATE — no places saved at all ============ */}
        {savedPlaces.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            {/* Animated heart icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-28 h-28 bg-linear-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-100"
            >
              <FaHeart className="text-red-400 text-5xl" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No favorites yet
            </h3>
            <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
              Start exploring the world and save your favorite destinations to
              build your personal travel wishlist.
            </p>

            {/* Go to home button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 hover:scale-105 transition-all"
            >
              <MdExplore className="text-lg" />
              Explore Destinations
            </button>
          </motion.div>
        ) : filteredPlaces.length === 0 ? (
          /* ============ FILTER EMPTY STATE — filter has no matches ============ */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-gray-300 text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-600 mb-2">
              No places in this category
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              You have not saved any places under this filter yet.
            </p>
            {/* Reset filter back to all */}
            <button
              onClick={() => setActiveFilter("all")}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              View all saved places
            </button>
          </motion.div>
        ) : (
          /* ============ PLACES GRID — normal state with saved places ============ */
          <>
            {/* Result count label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-6"
            >
              <HiSparkles className="text-blue-500" />
              <p className="text-sm text-gray-500 font-medium">
                Showing {filteredPlaces.length} place
                {filteredPlaces.length !== 1 ? "s" : ""}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* AnimatePresence — enables exit animation when a card is removed */}
              <AnimatePresence>
                {filteredPlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    // Entrance animation — cards fade in with slight upward movement
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Exit animation — card shrinks and fades when removed
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative group"
                  >
                    {/* Remove button — appears on hover, top right of card */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemovePlace(place.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 border border-gray-100"
                    >
                      <MdClose className="text-gray-500 text-sm hover:text-red-500" />
                    </motion.button>

                    {/* Reuse the same PlaceCard component from Home page */}
                    <PlaceCard place={place} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
