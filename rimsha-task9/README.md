# 🌍 Travel Search Platform

A full-featured, Travel Search Platform built with React. Explore destinations, search places with real-time autocomplete, save favorites, and interact with a live map — all without a paid API key.

---

## 🚀 Tech Stack

| Category         | Technology                 |
| ---------------- | -------------------------- |
| Framework        | React + Vite               |
| Styling          | Tailwind CSS               |
| Map              | Leaflet.js + react-leaflet |
| Geocoding        | Geoapify API               |
| Animation        | Framer Motion              |
| Icons            | React Icons                |
| Routing          | React Router DOM           |
| State Management | Context API                |
| Persistence      | LocalStorage               |

### Why These Choices?

**Leaflet.js instead of Google Maps** — Google Maps requires a credit card for billing even though it offers a $200 free credit. Leaflet.js is 100% free, uses OpenStreetMap tiles, and integrates cleanly with React.

**Geoapify instead of Nominatim** — Nominatim (OpenStreetMap's free geocoding service) throws CORS errors when called directly from the browser, and hits rate limits quickly. Geoapify allows CORS, gives 3,000 free requests/day, requires no credit card, and provides four APIs under a single key: Geocoding, Reverse Geocoding, Autocomplete, and Places.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed top navigation bar
│   ├── SearchBar.jsx       # Autocomplete search with history
│   ├── MapComponent.jsx    # Leaflet map with marker management
│   ├── PlaceCard.jsx       # Reusable destination card
│   ├── SkeletonCard.jsx    # Loading placeholder card
│   ├── FilterChips.jsx     # Category filter buttons
│   ├── Toast.jsx           # Slide-in notifications
│   ├── ProtectedRoute.jsx  # Authentication guard
│   ├── Pagination.jsx      # Page navigation controls
│   ├── ScrollToTop.jsx     # Scroll-to-top button
│   └── PageTransition.jsx  # Framer Motion page wrapper
├── pages/
│   ├── Home.jsx            # Main discovery page
│   ├── Login.jsx           # Authentication page
│   ├── Favorites.jsx       # Saved places (protected)
│   ├── PlaceDetails.jsx    # Full detail view
│   └── NotFound.jsx        # 404 page
├── context/
│   └── AppContext.jsx      # Global state: user, savedPlaces, toast
├── hooks/
│   ├── useDebounce.js      # Delays search input by 400ms
│   ├── usePolling.js       # Auto-refreshes map every 30 seconds
│   └── useLiveLocation.js  # Tracks browser GPS
└── utils/
    ├── localStorage.js     # Storage read/write helpers
    ├── geocoding.js        # Geoapify geocoding & reverse geocoding
    ├── apiCache.js         # 10-minute response cache
    └── placesApi.js        # Nearby places fetching
```

---

## 📄 Pages

### `/login` — Login Page

Users enter an email and password to log in. The login button is disabled while fields are empty. On submit, a 1.5-second loading state simulates an API call, then a `userData` object is created and stored in Context and LocalStorage. A welcome toast appears and the user is redirected to the home page.

A **"Continue as Guest"** option is available, which sets `isGuest: true` and follows the same flow.

---

### `/` — Home Page

The main page. On load, the Navbar renders, GPS tracking begins via `useLiveLocation`, and background polling starts via `usePolling` (every 30 seconds).

**Search Flow:**

1. User types in the search bar
2. `useDebounce` waits 400ms before firing
3. Geoapify Autocomplete API is called
4. A dropdown shows city names, addresses, and countries
5. On selection, the search term is saved to LocalStorage (`recentSearches`, max 5, no duplicates)
6. `geocodeAddress()` converts the text to coordinates
7. The map flies to those coordinates and places a **blue marker** with a popup showing city, country, address, and coordinates
8. `fetchNearbyPlaces()` runs and places **orange markers** for nearby points of interest
9. Place cards update (with skeleton loaders during fetch)

**Map Click Flow:**

1. User clicks anywhere on the map
2. A **red marker** appears at that point
3. `reverseGeocode()` converts the coordinates to a readable address
4. The marker popup and a floating bottom card both show city, country, address, and coordinates
5. A "Save This Location" button appears on the floating card

**Save Location Flow:**

1. User clicks "Save This Location"
2. If not logged in → redirected to `/login`
3. A `locationPlace` object is created with a unique ID
4. UI updates optimistically before LocalStorage is written
5. The marker turns **green**
6. A toast confirms the save, and the saved count in the header updates

**Filter Flow:**
Clicking a category chip (Mountains, Beaches, etc.) updates `activeFilter`, which triggers a new `fetchNearby()` call with the selected category. Orange markers on the map refresh accordingly.

**Pagination:**
Place cards are displayed 3 per page. Clicking a page number slices `DUMMY_PLACES` to show the correct set without changing scroll position.

---

### `/place/:id` — Place Details Page

Clicking "View Details" on any card navigates here. The page first looks up the ID in `DUMMY_PLACES`, then falls back to `savedPlaces` (for map-clicked locations).

Layout is split-screen:

**Left side:** Place image, open/closed status, category badge, name, rating, action buttons (Get Directions, Save/Unsave), address, coordinates, phone, website, description, and amenities grid.

**Right side:** An interactive Leaflet map centered on the place's exact coordinates, with a blue teardrop marker. The map is sticky and stays visible while the left side scrolls.

---

### `/favorites` — Favorites Page _(Protected)_

Accessible only when logged in. `ProtectedRoute` checks the auth context and redirects to `/login` if the user is null.

Saved places are loaded from Context (originally from LocalStorage). Filter tabs at the top allow filtering by category. Removing a place plays a fade-out animation via Framer Motion's `AnimatePresence` and shows a removal toast. If no places are saved, an empty state with a prompt to explore is shown.

---

### `/*` — 404 Page

Any unmatched route renders the Not Found page with a globe icon, "404", "Lost in the World?", and a "Back to Home" button.

---

## 🗺️ Map Marker Legend

| Color     | Meaning              |
| --------- | -------------------- |
| 🔵 Blue   | Searched location    |
| 🔴 Red    | Map-clicked location |
| 🟢 Green  | Saved location       |
| 🟠 Orange | Nearby places        |

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Add your Geoapify API key to a `.env` file:

```
VITE_GEOAPIFY_API_KEY=your_key_here
```

Get a free key (no credit card required) at [geoapify.com](https://www.geoapify.com).

---

## 📦 Dependencies

```bash
npm install react-router-dom react-leaflet leaflet framer-motion react-icons
```

---
