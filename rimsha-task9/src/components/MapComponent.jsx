/**
 * MapComponent.jsx
 *
 * This is the core interactive map component for the travel app.
 * It renders a Leaflet map with four types of markers:
 *   - Blue marker  : The location the user searched for via the search bar
 *   - Red marker   : The location the user clicked directly on the map
 *   - Green markers: Locations the user has saved to their saved places list
 *   - Orange markers: Nearby places fetched from an external API around the searched location
 *
 * Props received:
 *   - searchLocation  : Object { lat, lng, city, country, address } — set when user searches a place
 *   - onMapClick      : Callback function triggered when the user clicks on the map
 *   - locationInfo    : Object with address details for the clicked location (reverse geocoded)
 *   - mapClickLoading : Boolean — true while the clicked location's address is being fetched
 *   - activeFilter    : String — the currently selected category filter from the Home page (e.g. "beaches", "mountains")
 */

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { MdMyLocation } from "react-icons/md";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchNearbyPlaces } from "../utils/placesApi";

// ─────────────────────────────────────────────────────────────
// CUSTOM MARKER ICONS
// Each marker is a custom HTML-based divIcon using an inline SVG-like
// CSS shape (rotated square = teardrop/pin shape). The inner white dot
// acts as the visual center of the pin.
// ─────────────────────────────────────────────────────────────

/**
 * Blue Marker Icon — used for the location the user searched.
 * iconAnchor: positions the bottom-tip of the pin exactly on the coordinate.
 * popupAnchor: positions the popup above the pin head.
 */
const searchMarkerIcon = L.divIcon({
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #1d4ed8;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(29,78,216,0.4);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  className: "",
});

/**
 * Red Marker Icon — used for the location the user clicked on the map.
 * Visually distinct from the blue search marker so the user can tell them apart.
 */
const clickedMarkerIcon = L.divIcon({
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #ef4444;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(239,68,68,0.4);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  className: "",
});

/**
 * Green Marker Icon — used for places the user has saved to their list.
 * Green color indicates a "bookmarked" or "favourited" location.
 */
const savedMarkerIcon = L.divIcon({
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #16a34a;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(22,163,74,0.4);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  className: "",
});

/**
 * Orange Marker Icon — used for nearby places fetched from the API.
 * Slightly smaller (28px) than the main markers so they don't visually
 * overpower the primary searched/clicked markers.
 */
const nearbyMarkerIcon = L.divIcon({
  html: `
    <div style="
      width: 28px;
      height: 28px;
      background: #f97316;
      border: 2px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 8px rgba(249,115,22,0.4);
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
  className: "",
});

// ─────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// These are small Leaflet utility components that must be rendered
// inside <MapContainer> because they use Leaflet's React context hooks.
// ─────────────────────────────────────────────────────────────

/**
 * MapClickHandler
 *
 * Listens for click events on the map using Leaflet's useMapEvents hook.
 * When the user clicks anywhere on the map, it extracts the latitude and
 * longitude from the event and passes them up to the parent via onMapClick.
 *
 * This component renders nothing visible — it only registers the event listener.
 */
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (onMapClick) onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

/**
 * MapViewUpdater
 *
 * Watches the `center` prop and smoothly flies the map to that location
 * whenever it changes. Uses Leaflet's flyTo() for an animated transition.
 *
 * This is needed because the map's initial center is set once on mount —
 * after that, you need to imperatively move the map when a new search result arrives.
 *
 * Zoom level is fixed at 12 (city-level view) on every search.
 */
const MapViewUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 12);
    }
  }, [center]);
  return null;
};

// ─────────────────────────────────────────────────────────────
// UTILITY FUNCTION
// ─────────────────────────────────────────────────────────────

/**
 * getCategoryEmoji
 *
 * Returns an appropriate emoji for a nearby place based on its category string.
 * The category comes from the Geoapify Places API response and is a dot-separated
 * path like "accommodation.hotel" or "catering.restaurant".
 *
 * This emoji is shown at the start of the place name inside the popup.
 *
 * @param {string} category - The category string from the API response
 * @returns {string} - An emoji character
 */
const getCategoryEmoji = (category) => {
  if (category.includes("accommodation") || category.includes("hotel"))
    return "🏨";
  if (category.includes("restaurant") || category.includes("food")) return "🍽️";
  if (category.includes("tourism") || category.includes("attraction"))
    return "🏛️";
  if (category.includes("shop")) return "🛍️";
  if (category.includes("sport")) return "⚽";
  return "📍";
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

const MapComponent = ({
  searchLocation,
  onMapClick,
  locationInfo,
  mapClickLoading,
  // activeFilter is passed from Home.jsx — controls which category of nearby places to fetch
  activeFilter,
}) => {
  // Stores the lat/lng of the last point the user clicked on the map
  const [clickedLocation, setClickedLocation] = useState(null);

  // Holds a reference to the Leaflet map instance so we can call map.flyTo(), zoomIn(), zoomOut() imperatively
  const [map, setMap] = useState(null);

  // Array of nearby place objects returned by fetchNearbyPlaces()
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  // True while the nearby places API call is in progress — used to show/hide the loading indicator
  const [nearbyLoading, setNearbyLoading] = useState(false);

  // Pull the saved places list from global app context
  const { savedPlaces } = useApp();

  // Ref to the blue (searched) marker so we can call openPopup() on it programmatically
  const searchMarkerRef = useRef(null);

  // Ref to the red (clicked) marker so we can call openPopup() on it once address data arrives
  const clickedMarkerRef = useRef(null);

  /**
   * Effect: Auto-open the red marker's popup when locationInfo is received.
   *
   * When the user clicks the map, we place a red marker immediately. However, the
   * address (locationInfo) takes a moment to arrive via reverse geocoding. Once it
   * does, we open the popup automatically so the user sees the address without
   * having to click the marker again.
   */
  useEffect(() => {
    if (locationInfo && clickedMarkerRef.current) {
      clickedMarkerRef.current.openPopup();
    }
  }, [locationInfo]);

  /**
   * Effect: React to a new searchLocation.
   *
   * When the parent passes a new searchLocation (user searched a city):
   *   1. Auto-open the blue marker's popup so the searched location is highlighted.
   *   2. Fetch nearby places around that location using the current activeFilter.
   */
  useEffect(() => {
    if (searchLocation && searchMarkerRef.current) {
      searchMarkerRef.current.openPopup();
    }

    if (searchLocation) {
      fetchNearby(searchLocation);
    }
  }, [searchLocation]);

  /**
   * Effect: Re-fetch nearby places when the active filter changes.
   *
   * The user can switch category filters (beaches, mountains, cities, etc.) from
   * the Home page. When they do, we re-fetch nearby places for the same searchLocation
   * but with the updated category so the orange markers update accordingly.
   *
   * We only do this if searchLocation exists — no point fetching without a base location.
   */
  useEffect(() => {
    if (searchLocation) {
      fetchNearby(searchLocation);
    }
  }, [activeFilter]);

  /**
   * fetchNearby
   *
   * Fetches nearby places from the external API around a given location.
   * Maps the activeFilter string to a Geoapify category string before calling
   * fetchNearbyPlaces().
   *
   * Category mapping:
   *   - "beaches"   → "tourism.attraction"
   *   - "mountains" → "tourism.attraction"
   *   - "cities"    → "tourism.attraction"
   *   - "heritage"  → "tourism.attraction"
   *   - "forests"   → "natural"
   *   - default     → "accommodation"
   *
   * Sets nearbyLoading to true while fetching and clears the old markers first
   * so stale data from the previous search doesn't linger on the map.
   *
   * @param {{ lat: number, lng: number }} location - The center point to search around
   */
  const fetchNearby = async (location) => {
    setNearbyLoading(true);
    setNearbyPlaces([]); // Clear old nearby markers immediately
    const categoryMap = {
      all: "catering.restaurant",
      beaches: "tourism.attraction",
      mountains: "natural",
      forests: "natural",
      cities: "tourism.attraction",
      heritage: "tourism.attraction",
    };

    const category = categoryMap[activeFilter] || "catering.restaurant";
    const places = await fetchNearbyPlaces({
      lat: location.lat,
      lng: location.lng,
      category,
    });

    setNearbyPlaces(places);
    setNearbyLoading(false);
    console.log("Nearby places fetched:", places.length);
  };

  /**
   * handleMapClick
   *
   * Called by MapClickHandler when the user clicks anywhere on the map.
   * Stores the clicked coordinates in local state (so we can render the red marker)
   * and also forwards the event up to the parent via the onMapClick prop
   * (the parent uses it to trigger reverse geocoding).
   *
   * @param {{ lat: number, lng: number }} location
   */
  const handleMapClick = (location) => {
    setClickedLocation(location);
    if (onMapClick) onMapClick(location);
  };

  /**
   * handleMyLocation
   *
   * Uses the browser's Geolocation API to get the user's current physical location.
   * On success: flies the map to that position, places a red clicked marker there,
   * and triggers reverse geocoding via onMapClick (same as a regular map click).
   * On failure: logs the error (could show a toast notification here in the future).
   */
  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (map) map.flyTo([pos.lat, pos.lng], 14); // Zoom in closer (level 14) for current location
        setClickedLocation(pos);
        if (onMapClick) onMapClick(pos);
      },
      (error) => {
        console.error("Location error:", error);
      },
    );
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-full">
      {/* ── Loading indicator ────────────────────────────────────
          Shown in the top-left corner while the nearby places API
          call is in progress. Positioned above the map using z-index. */}
      {nearbyLoading && (
        <div className="absolute top-4 left-4 z-1000 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-600">Loading nearby places...</p>
        </div>
      )}

      {/* ── Nearby places count badge ────────────────────────────
          Shown after loading completes if at least one nearby place was found.
          Replaces the loading indicator in the same top-left position. */}
      {!nearbyLoading && nearbyPlaces.length > 0 && (
        <div className="absolute top-4 left-4 z-1000 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          <p className="text-xs text-gray-600">
            {nearbyPlaces.length} nearby places found
          </p>
        </div>
      )}

      {/* ── Leaflet Map Container ────────────────────────────────
          The root Leaflet map element. Initial center is [20, 0] (center of the
          world map) at zoom level 3 so the whole world is visible on first load.
          zoomControl={false} hides the default +/- buttons (we render custom ones below). */}
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ width: "100%", height: "100%" }}
        ref={(instance) => {
          if (instance) setMap(instance);
        }}
        zoomControl={false}
      >
        {/* OpenStreetMap tile layer — free, no API key required */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Registers the map click event listener (must be inside MapContainer) */}
        <MapClickHandler onMapClick={handleMapClick} />

        {/* Smoothly flies the map to the searched location whenever searchLocation changes */}
        {searchLocation && <MapViewUpdater center={searchLocation} />}

        {/* ══════════════════════════════════════════════════════
            BLUE MARKER — Searched Location
            Rendered when the user searches for a place. Shows city name,
            full address, and coordinates in the popup.
            ref={searchMarkerRef} allows us to programmatically open
            its popup via searchMarkerRef.current.openPopup().
        ══════════════════════════════════════════════════════ */}
        {searchLocation && (
          <Marker
            position={[searchLocation.lat, searchLocation.lng]}
            icon={searchMarkerIcon}
            ref={searchMarkerRef}
          >
            <Popup>
              <div style={{ minWidth: "200px", padding: "4px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1e293b",
                    marginBottom: "6px",
                  }}
                >
                  📍 {searchLocation.city || "Searched Location"}
                  {searchLocation.country ? `, ${searchLocation.country}` : ""}
                </p>
                {searchLocation.address && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      marginBottom: "6px",
                      lineHeight: "1.5",
                    }}
                  >
                    {searchLocation.address}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginBottom: "6px",
                  }}
                >
                  {searchLocation.lat?.toFixed(4)},{" "}
                  {searchLocation.lng?.toFixed(4)}
                </p>
                <div
                  style={{ borderTop: "1px solid #f1f5f9", paddingTop: "6px" }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#1d4ed8",
                      fontWeight: "600",
                    }}
                  >
                    🔵 Searched Location
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* ══════════════════════════════════════════════════════
            ORANGE MARKERS — Nearby Places
            Rendered for each place returned by fetchNearbyPlaces().
            Only rendered if the place has valid lat/lng coordinates
            (some API results may have missing location data).
            Each popup shows the place name, address, rating, phone,
            and website when available.
        ══════════════════════════════════════════════════════ */}
        {nearbyPlaces.map(
          (place) =>
            place.lat &&
            place.lng && (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={nearbyMarkerIcon}
              >
                <Popup>
                  <div style={{ minWidth: "200px", padding: "4px" }}>
                    {/* Place name with a category emoji prefix */}
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#1e293b",
                        marginBottom: "4px",
                      }}
                    >
                      {getCategoryEmoji(place.category)} {place.name}
                    </p>
                    {/* Street address — only shown if available */}
                    {place.address && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "4px",
                          lineHeight: "1.5",
                        }}
                      >
                        {place.address}
                      </p>
                    )}
                    {/* Star rating — only shown if available */}
                    {place.rating && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#f59e0b",
                          marginBottom: "4px",
                        }}
                      >
                        ⭐ {place.rating}
                      </p>
                    )}
                    {/* Phone number — only shown if available */}
                    {place.phone && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "4px",
                        }}
                      >
                        📞 {place.phone}
                      </p>
                    )}
                    {/* Website URL — only shown if available */}
                    {place.website && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#1d4ed8",
                          marginBottom: "4px",
                        }}
                      >
                        🌐 {place.website}
                      </p>
                    )}
                    <div
                      style={{
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "6px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#f97316",
                          fontWeight: "600",
                        }}
                      >
                        🟠 Nearby Place
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ),
        )}

        {/* ══════════════════════════════════════════════════════
            GREEN MARKERS — Saved Places
            Rendered for every place the user has bookmarked/saved.
            Pulled from global AppContext (savedPlaces array).
            Only rendered if lat/lng are present on the saved place object.
        ══════════════════════════════════════════════════════ */}
        {savedPlaces.map(
          (place) =>
            place.lat &&
            place.lng && (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={savedMarkerIcon}
              >
                <Popup>
                  <div style={{ minWidth: "200px", padding: "4px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#1e293b",
                        marginBottom: "6px",
                      }}
                    >
                      📍 {place.name}
                    </p>
                    {place.address && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "6px",
                          lineHeight: "1.5",
                        }}
                      >
                        {place.address}
                      </p>
                    )}
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                    </p>
                    <div
                      style={{
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "6px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#16a34a",
                          fontWeight: "600",
                        }}
                      >
                        ❤️ Saved Place
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ),
        )}

        {/* ══════════════════════════════════════════════════════
            RED MARKER — Clicked Location
            Rendered at the exact point the user clicked on the map.
            The popup has three visual states:
              1. Loading state  : shown while reverse geocoding is in progress (mapClickLoading=true)
              2. Info state     : shown once locationInfo arrives with the address
              3. Fallback state : shows just raw coordinates if locationInfo never arrives
            ref={clickedMarkerRef} allows the popup to be opened automatically
            once locationInfo is received (see useEffect above).
        ══════════════════════════════════════════════════════ */}
        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={clickedMarkerIcon}
            ref={clickedMarkerRef}
          >
            <Popup>
              <div style={{ minWidth: "200px", padding: "4px" }}>
                {mapClickLoading ? (
                  /* State 1: Address is still being fetched — show a spinner */
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #1d4ed8",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      Loading address...
                    </p>
                  </div>
                ) : locationInfo ? (
                  /* State 2: Address data has arrived — show full location details */
                  <>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#1e293b",
                        marginBottom: "6px",
                      }}
                    >
                      📍 {locationInfo.city}, {locationInfo.country}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        marginBottom: "6px",
                        lineHeight: "1.5",
                      }}
                    >
                      {locationInfo.address}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      {locationInfo.lat.toFixed(4)},{" "}
                      {locationInfo.lng.toFixed(4)}
                    </p>
                    <div
                      style={{
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "6px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#ef4444",
                          fontWeight: "600",
                        }}
                      >
                        🔴 Clicked Location
                      </p>
                    </div>
                  </>
                ) : (
                  /* State 3: No address data — show raw lat/lng as a fallback */
                  <p style={{ fontSize: "13px", color: "#64748b" }}>
                    {clickedLocation.lat.toFixed(4)},{" "}
                    {clickedLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* CSS animation for the loading spinner inside the red marker popup */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Custom Zoom Controls ─────────────────────────────────
          Positioned in the bottom-right of the map (above the location button).
          Calls map.zoomIn() and map.zoomOut() on the stored Leaflet map instance. */}
      <div className="absolute bottom-24 right-4 z-1000 flex flex-col gap-2">
        <button
          onClick={() => map?.zoomIn()}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-xl border border-gray-100"
        >
          +
        </button>
        <button
          onClick={() => map?.zoomOut()}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-xl border border-gray-100"
        >
          −
        </button>
      </div>

      {/* ── My Location Button ───────────────────────────────────
          Fixed in the bottom-right corner. Triggers the browser's
          Geolocation API to find and fly to the user's current position.
          Uses the MdMyLocation icon from react-icons. */}
      <button
        onClick={handleMyLocation}
        className="absolute bottom-6 right-4 z-1000 w-10 h-10 bg-blue-600 rounded-xl shadow-md flex items-center justify-center text-white hover:bg-blue-700 transition-all"
      >
        <MdMyLocation className="text-xl" />
      </button>
    </div>
  );
};

export default MapComponent;
