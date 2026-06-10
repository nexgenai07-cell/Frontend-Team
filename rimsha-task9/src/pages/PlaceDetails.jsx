import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaWifi,
  FaSwimmingPool,
} from "react-icons/fa";
import {
  MdLocationOn,
  MdPhone,
  MdLanguage,
  MdArrowBack,
  MdDirections,
} from "react-icons/md";

// Leaflet imports — interactive map ke liye
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom blue marker
const placeMarkerIcon = L.divIcon({
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
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    lat: 36.4618,
    lng: 25.3753,
    phone: "+30 22860 71234",
    website: "azurecliffresort.com",
    status: "Open Now",
    description:
      "Experience the pinnacle of luxury at Azure Cliff Resort. Perfectly situated with panoramic views of the Aegean Sea, this award-winning destination blends contemporary architecture with traditional Greek hospitality.",
    amenities: [
      "Free WiFi",
      "Infinity Pool",
      "Fine Dining",
      "Spa",
      "Beach Access",
      "Airport Transfer",
    ],
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
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    lat: 37.8595,
    lng: 20.6244,
    phone: "+30 26950 31234",
    website: "secretcovekayaking.com",
    status: "Open Now",
    description:
      "Discover hidden coves and crystal-clear waters with our expert-guided kayaking tours.",
    amenities: [
      "Guide Included",
      "Equipment Provided",
      "Safety Gear",
      "Photos Included",
    ],
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
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    lat: 40.6281,
    lng: 14.485,
    phone: "+39 089 812345",
    website: "villantica.it",
    status: "Open Now",
    description:
      "A stunning 18th century villa nestled in the heart of Positano.",
    amenities: [
      "Private Terrace",
      "Sea View",
      "Free WiFi",
      "Breakfast Included",
      "Parking",
    ],
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
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    lat: 60.472,
    lng: 8.4689,
    phone: "+47 22 123456",
    website: "theglasscabin.no",
    status: "Open Now",
    description: "Sleep under the stars in our stunning glass cabin.",
    amenities: [
      "Glass Ceiling",
      "Fjord View",
      "Northern Lights",
      "Heated Floor",
      "Private Hot Tub",
    ],
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
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    lat: 3.2028,
    lng: 73.2207,
    phone: "+960 123 4567",
    website: "maldivesbluehaven.com",
    status: "Open Now",
    description:
      "Overwater bungalows surrounded by the turquoise waters of the Indian Ocean.",
    amenities: [
      "Overwater Bungalow",
      "Private Pool",
      "Snorkeling",
      "Sunset Cruise",
      "Spa",
    ],
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
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    lat: 35.6762,
    lng: 139.6503,
    phone: "+81 3 1234 5678",
    website: "tokyoskyline.jp",
    status: "Open Now",
    description:
      "Experience the magnificent Tokyo skyline from the best vantage points.",
    amenities: [
      "Free Entry",
      "Observation Deck",
      "Gift Shop",
      "Cafe",
      "Audio Guide",
    ],
  },
];

const getAmenityIcon = (amenity) => {
  if (amenity.toLowerCase().includes("wifi")) return <FaWifi />;
  if (amenity.toLowerCase().includes("pool")) return <FaSwimmingPool />;
  return null;
};

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isPlaceSaved,
    handleSavePlace,
    handleRemovePlace,
    user,
    savedPlaces,
  } = useApp();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let found = DUMMY_PLACES.find((p) => p.id === id);

      if (!found) {
        found = savedPlaces.find((p) => p.id === id);
        if (found) {
          found = {
            ...found,
            phone: found.phone || "Not available",
            website: found.website || "Not available",
            status: found.status || "Saved Location",
            description:
              found.description ||
              `This location was saved from the map. Located in ${found.name}, ${found.address}.`,
            amenities: found.amenities || ["Saved Location", "Map Pin"],
            rating: found.rating || 0,
            reviews: found.reviews || 0,
          };
        }
      }

      setPlace(found || null);
      setLoading(false);
    }, 800);
  }, [id, savedPlaces]);

  const saved = place ? isPlaceSaved(place.id) : false;

  const handleSaveToggle = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (saved) {
      handleRemovePlace(place.id);
    } else {
      handleSavePlace(place);
    }
  };

  // Loading skeleton
  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="w-full h-72 bg-gray-200 animate-pulse rounded-2xl mb-6" />
              <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded mb-3" />
              <div className="w-1/2 h-5 bg-gray-200 animate-pulse rounded mb-6" />
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="w-full h-96 bg-gray-200 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    );

  // Place nahi mila
  if (!place)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">😕</p>
          <p className="text-gray-600 mb-4">Place not found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all mb-6 text-sm font-medium"
        >
          <MdArrowBack className="text-xl" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <div className="w-full h-72 rounded-2xl overflow-hidden mb-6">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400";
                }}
              />
            </div>

            {/* Status + Category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {place.status}
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs">{place.category}</span>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {place.name}
            </h1>

            {/* Rating */}
            {place.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <FaStar className="text-yellow-400" />
                <span className="font-bold text-gray-800">{place.rating}</span>
                <span className="text-gray-400 text-sm">
                  ({place.reviews} Reviews)
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all">
                <MdDirections className="text-lg" />
                Get Directions
              </button>
              <button
                onClick={handleSaveToggle}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                  saved
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-red-400"
                }`}
              >
                {saved ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400" />
                )}
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <MdLocationOn className="text-blue-600 text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Address</p>
                  <p className="text-sm text-gray-700">{place.address}</p>
                </div>
              </div>

              {place.lat && place.lng && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdLocationOn className="text-green-600 text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Coordinates</p>
                    <p className="text-sm text-gray-700">
                      {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <MdPhone className="text-blue-600 text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="text-sm text-blue-600">{place.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <MdLanguage className="text-blue-600 text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Website</p>
                  <p className="text-sm text-blue-600">{place.website}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Amenities */}
            {place.amenities && place.amenities.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {place.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"
                    >
                      <span className="text-blue-600 text-sm">
                        {getAmenityIcon(amenity) || "✓"}
                      </span>
                      <span className="text-xs text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right — Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="h-125 lg:h-full min-h-100 rounded-2xl overflow-hidden shadow-md sticky top-24"
          >
            {place && place.lat && place.lng && (
              <MapContainer
                // Place ki exact location par center karo
                center={[place.lat, place.lng]}
                zoom={5}
                style={{ width: "100%", height: "100%" }}
                zoomControl={false}
              >
                {/* OpenStreetMap Tiles */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Place Marker */}
                <Marker
                  position={[place.lat, place.lng]}
                  icon={placeMarkerIcon}
                >
                  <Popup>
                    <div style={{ minWidth: "160px", padding: "4px" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "#1e293b",
                          marginBottom: "4px",
                        }}
                      >
                        📍 {place.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "#64748b" }}>
                        {place.address}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
