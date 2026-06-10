import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import PlaceCard from "../components/PlaceCard";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import { geocodeAddress, reverseGeocode } from "../utils/geocoding";
import { useApp } from "../context/AppContext";
import { FaHeart } from "react-icons/fa";
import usePolling from "../hooks/usePolling";
import useLiveLocation from "../hooks/useLiveLocation";

// How many place cards to show per page
const CARDS_PER_PAGE = 3;

// Static dummy data — not from an API
// Each object represents one travel destination
const DUMMY_PLACES = [
  {
    id: "1",
    name: "Azure Cliff Resort",
    category: "Boutique Hotel",
    rating: 4.9,
    reviews: 1248,
    address: "Oia, Santorini, Greece",
    price: "$450",
    priceUnit: "/ night",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
    lat: 36.4618,
    lng: 25.3753,
  },
  {
    id: "2",
    name: "Secret Cove Kayaking",
    category: "Experience",
    rating: 4.8,
    reviews: 856,
    address: "Navagio, Zakynthos, Greece",
    price: "$85",
    priceUnit: "/ person",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
    lat: 37.8595,
    lng: 20.6244,
  },
  {
    id: "3",
    name: "Villa L'Antica",
    category: "Heritage Stay",
    rating: 4.7,
    reviews: 623,
    address: "Positano, Italy",
    price: "$320",
    priceUnit: "/ night",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400",
    lat: 40.6281,
    lng: 14.485,
  },
  {
    id: "4",
    name: "The Glass Cabin",
    category: "Modern Design",
    rating: 5.0,
    reviews: 412,
    address: "Nordic Fjords, Norway",
    price: "$580",
    priceUnit: "/ night",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    lat: 60.472,
    lng: 8.4689,
  },
  {
    id: "5",
    name: "Maldives Blue Haven",
    category: "Beach Resort",
    rating: 4.9,
    reviews: 2341,
    address: "South Male Atoll, Maldives",
    price: "$450",
    priceUnit: "/ night",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400",
    lat: 3.2028,
    lng: 73.2207,
  },
  {
    id: "6",
    name: "Tokyo Skyline View",
    category: "City Hotel",
    rating: 4.6,
    reviews: 1876,
    address: "Shinjuku, Japan",
    price: "Free",
    priceUnit: "Sight",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    lat: 35.6762,
    lng: 139.6503,
  },
];

// Data for filter buttons inside the hero section
// id is used in logic, label is what shows on screen
const FILTERS = [
  { id: "all", label: "🌍 All" },
  { id: "mountains", label: "🏔️ Mountains" },
  { id: "beaches", label: "🏖️ Beaches" },
  { id: "forests", label: "🌲 Forests" },
  { id: "cities", label: "🏙️ Urban" },
  { id: "heritage", label: "🏛️ Heritage" },
];

const Home = () => {
  // searchLocation — tells the map where to fly after a search
  const [searchLocation, setSearchLocation] = useState(null);

  // locationInfo — data shown in the floating card at the bottom of the map
  // gets set from both search and map click
  const [locationInfo, setLocationInfo] = useState(null);

  // mapClickLoading — true while reverse geocoding is running after a map click
  const [mapClickLoading, setMapClickLoading] = useState(false);

  // cardsLoading — true during search, shows skeleton cards instead of real ones
  const [cardsLoading, setCardsLoading] = useState(false);

  // currentPage — tracks which pagination page is active
  const [currentPage, setCurrentPage] = useState(1);

  // lastUpdated — set by polling every 30 seconds, shows "Updated 12:34:56" on map
  const [lastUpdated, setLastUpdated] = useState(null);

  // activeFilter — which filter chip is currently selected
  const [activeFilter, setActiveFilter] = useState("all");

  // Pull global state and functions from Context
  // user — check if someone is logged in
  // handleSavePlace / handleRemovePlace — save or unsave a location
  // isPlaceSaved — check if a place is already in saved list
  // showToast — display a notification message
  // savedPlaces — full list of saved places (used for the header counter)
  const {
    user,
    handleSavePlace,
    handleRemovePlace,
    isPlaceSaved,
    showToast,
    savedPlaces,
  } = useApp();

  // navigate — programmatically redirect to a different route
  const navigate = useNavigate();

  // useLiveLocation hook — gets live GPS coordinates from the browser
  // liveLocation contains { lat, lng, accuracy, lastUpdated }
  const { liveLocation } = useLiveLocation();

  // usePolling hook — every 30 seconds update the lastUpdated timestamp
  // simulates a background data refresh on the map
  usePolling(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    console.log("Polling: Checking for updates...");
  }, 30000);

  // Calculate total pages — 6 cards / 3 per page = 2 total pages
  const totalPages = Math.ceil(DUMMY_PLACES.length / CARDS_PER_PAGE);

  // Slice the correct cards for the current page
  // Page 1 → slice(0, 3) → first 3 cards
  // Page 2 → slice(3, 6) → next 3 cards
  const currentCards = DUMMY_PLACES.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  // Runs when a pagination button is clicked
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Runs when a filter chip is clicked
  // activeFilter is also passed to MapComponent to change nearby places category
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    console.log("Filter:", filterId);
  };

  // Runs when user submits a search from the Navbar search bar
  // geocodeAddress converts "Lahore" → { lat, lng, city, country, address }
  const handleSearch = async (searchTerm) => {
    setCardsLoading(true); // show skeleton cards while loading

    try {
      const result = await geocodeAddress(searchTerm);

      if (result) {
        // Set searchLocation so the map flies to this place
        setSearchLocation({
          lat: result.lat,
          lng: result.lng,
          city: result.city,
          country: result.country,
          address: result.address,
        });
        // Set locationInfo so the floating card shows this place's details
        setLocationInfo({
          city: result.city,
          country: result.country,
          address: result.address,
          lat: result.lat,
          lng: result.lng,
        });

        setTimeout(() => {
          document
            .getElementById("map-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      } else {
        // API returned nothing — tell the user
        showToast(
          "No results found for your search. Please try a different location.",
          "error",
        );
      }
    } catch (error) {
      // Handle different error types with specific messages
      if (error.message === "Failed to fetch") {
        // No internet connection
        showToast(
          "No internet connection. Please check your network and try again.",
          "error",
        );
      } else if (error.message.includes("Too many requests")) {
        // Geoapify free tier rate limit hit
        showToast(
          "Too many requests. Please wait a moment before searching again.",
          "error",
        );
      } else {
        // Any other unexpected error
        showToast("Something went wrong. Please try again later.", "error");
      }
    }

    // Hide skeleton cards after 1.5 seconds
    setTimeout(() => setCardsLoading(false), 1500);
  };

  // Runs when user clicks anywhere on the map
  // reverseGeocode converts { lat, lng } → readable address
  const handleMapClick = async (location) => {
    setMapClickLoading(true); // turn on loading state

    try {
      const result = await reverseGeocode(location);
      if (result) {
        // Update floating card with the clicked location's address
        setLocationInfo(result);
      }
    } catch (error) {
      // Same error handling pattern as search
      if (error.message === "Failed to fetch") {
        showToast(
          "No internet connection. Please check your network.",
          "error",
        );
      } else if (error.message.includes("Too many requests")) {
        showToast(
          "Too many requests. Please wait a moment and try again.",
          "error",
        );
      } else {
        showToast("Unable to load address. Please try again.", "error");
      }
    }

    setMapClickLoading(false); // turn off loading state
  };

  // Runs when user clicks "Save This Location" on the floating card
  const handleSaveLocation = () => {
    // Not logged in — send to login page
    if (!user) {
      navigate("/login");
      return;
    }

    // No location selected yet — do nothing
    if (!locationInfo) return;

    // Build a place object from the clicked location
    // id uses Date.now() timestamp to guarantee uniqueness
    const locationPlace = {
      id: `loc_${Date.now()}`,
      name: locationInfo.city || "Saved Location",
      category: "Saved Location",
      rating: 0,
      reviews: 0,
      address: locationInfo.address,
      price: "",
      priceUnit: "",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
      lat: locationInfo.lat,
      lng: locationInfo.lng,
    };

    // Toggle — if already saved then unsave, if not saved then save
    const alreadySaved = isPlaceSaved(locationPlace.id);
    if (alreadySaved) {
      handleRemovePlace(locationPlace.id);
    } else {
      handleSavePlace(locationPlace);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar — fixed at the top, contains the search bar */}
      <Navbar onSearch={handleSearch} />

      <div className="pt-16">
        {/* Hero Section — large banner with background image */}
        <div
          className="relative w-full h-72 md:h-132 flex flex-col items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay — semi-transparent black layer so text is readable over the image */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 text-center px-4 w-full">
            {/* Main heading and subtext */}
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Discover Your Next Adventure
            </h1>
            <p className="text-gray-200 text-sm md:text-base mb-4">
              Search any destination on the map
            </p>

            {/* Live Location Indicator — only shows when GPS is active */}
            {liveLocation && (
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* Pulsing green dot — visual signal that location is live */}
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-xs text-green-300">
                  Live location active — Updated {liveLocation.lastUpdated}
                </p>
              </div>
            )}

            {/* Filter Chips — built from FILTERS array */}
            {/* overflow-x-auto allows horizontal scroll on small screens */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-hide px-4">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap
                    transition-all backdrop-blur-sm border
                    ${
                      activeFilter === filter.id
                        ? // Active — solid white background
                          "bg-white text-gray-800 border-white"
                        : // Inactive — transparent with white border
                          "bg-white/20 text-white border-white/30 hover:bg-white/30"
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section — takes up 60% of the screen height */}
        <div id="map-section" className="w-full h-screen relative">
          {/* Pass all required props to MapComponent */}
          <MapComponent
            searchLocation={searchLocation} // fly the map here after search
            onMapClick={handleMapClick} // function to run when map is clicked
            locationInfo={locationInfo} // info for markers and popups
            mapClickLoading={mapClickLoading} // loading state for reverse geocoding
            liveLocation={liveLocation} // GPS coordinates for live marker
            activeFilter={activeFilter} // category for nearby places fetch
          />

          {/* Polling Indicator — top right corner, shows last refresh time */}
          {/* Only renders after the first polling cycle runs */}
          {lastUpdated && (
            <div className="absolute top-4 right-4 z-1000 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-500">Updated {lastUpdated}</p>
            </div>
          )}

          {/* Floating Location Card — bottom left of the map */}
          {/* Only renders when locationInfo is set (after search or map click) */}
          {locationInfo && (
            <div className="absolute bottom-6 left-4 z-1000 bg-white rounded-2xl shadow-xl p-4 max-w-70 md:max-w-[320px]">
              <p className="text-sm font-bold text-gray-800">
                📍 {locationInfo.city}, {locationInfo.country}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {locationInfo.address}
              </p>
              {/* Show coordinates rounded to 4 decimal places */}
              <p className="text-xs text-gray-400 mt-1">
                {locationInfo.lat.toFixed(4)}, {locationInfo.lng.toFixed(4)}
              </p>
              {/* Save button — triggers handleSaveLocation */}
              <button
                onClick={handleSaveLocation}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-all"
              >
                <FaHeart className="text-white text-xs" />
                Save This Location
              </button>
            </div>
          )}
        </div>

        {/* Place Cards Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Recommended for You
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Based on your recent searches
              </p>
            </div>

            {/* Saved Places Counter — only shows when at least one place is saved */}
            {/* savedPlaces.length updates in real time from Context */}
            {savedPlaces.length > 0 && (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl">
                <FaHeart className="text-red-400 text-sm" />
                <span className="text-sm font-semibold text-red-500">
                  {savedPlaces.length} Saved
                </span>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {/* If loading — show 6 skeleton placeholders, otherwise show real cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardsLoading
              ? // Show 6 skeleton cards while search is loading
                Array(6)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : // Show the actual cards for the current page
                currentCards.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
          </div>

          {/* Pagination — page number buttons */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
