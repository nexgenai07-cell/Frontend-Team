// useNavigate — used to programmatically redirect the user to different pages.
// We use it here to navigate to the Place Details page when a card is clicked,
// and also to redirect to the Login page if an unauthenticated user tries to save a place.
import { useNavigate } from "react-router-dom";

// useApp — custom context hook that gives access to global app state and actions.
// We pull out save/unsave functions and the current logged-in user from here.
import { useApp } from "../context/AppContext";

// motion from framer-motion — lets us add animations to HTML elements.
// We use it on the card wrapper to animate it upward on hover.
import { motion } from "framer-motion";

// React Icons
// FaHeart     — filled red heart, shown when the place IS saved
// FaRegHeart  — outlined heart, shown when the place is NOT saved
// FaStar      — yellow star icon used in the rating row
// MdLocationOn — map pin icon used next to the address
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// PlaceCard Component
// Renders a single place as a card with an image, category badge, heart button,
// name, rating, address, price, and a "View Details" button.
// Clicking anywhere on the card navigates to that place's detail page.
//
// Props:
//   place — a single place object containing id, image, name, category,
//            rating, reviews, address, price, priceUnit fields
const PlaceCard = ({ place }) => {
  const navigate = useNavigate();
  // Destructuring what we need from global app context:
  // isPlaceSaved    — function that checks if a given place id is in the saved list
  // handleSavePlace — function that adds a place to the saved list
  // handleRemovePlace — function that removes a place from the saved list
  // user            — the currently logged-in user object (null if not logged in)
  const { isPlaceSaved, handleSavePlace, handleRemovePlace, user } = useApp();

  // Check if this specific place is already saved by the user.
  // Returns true or false — used to decide which heart icon to show.
  const saved = isPlaceSaved(place.id);

  // handleSaveToggle
  // Called when the user clicks the heart button on the card.
  // Handles three cases:
  //   1. e.stopPropagation() — prevents the click from bubbling up to the card's
  //      onClick handler, which would otherwise also trigger a navigation to the detail page
  //   2. If user is not logged in → redirect to /login
  //   3. If user is logged in and place is saved → unsave it
  //   4. If user is logged in and place is not saved → save it
  const handleSaveToggle = (e) => {
    e.stopPropagation();
    // Stops the click event from reaching the parent motion.div's onClick.
    // Without this, clicking the heart button would ALSO navigate to the detail page.

    if (!user) {
      // User is not authenticated — send them to the login page first.
      navigate("/login");
      return;
      // return here so the save/remove logic below does not run
    }

    if (saved) {
      // Place is currently saved — remove it from the saved list
      handleRemovePlace(place.id);
    } else {
      // Place is not saved — add the full place object to the saved list
      handleSavePlace(place);
    }
  };

  return (
    // motion.div — the animated card wrapper.
    // whileHover: y: -4 lifts the card 4px upward when the user hovers over it.
    // transition duration: 0.2s makes the lift feel quick and snappy.
    // onClick navigates to the individual place detail page using the place id.
    // overflow-hidden ensures the image doesn't bleed outside the rounded corners.
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/place/${place.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
    >
      {/* ── Image Section ────────────────────────────────────────
          Fixed height (h-48 = 192px) container for the place image.
          overflow-hidden clips the image when it scales up on hover.
          position relative allows the badge and heart button to be
          absolutely positioned on top of the image. */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          // object-cover fills the container without stretching or squishing the image.
          // hover:scale-105 gives a subtle zoom-in effect when the card is hovered.
          // transition-transform makes that zoom smooth over 300ms.
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // If the image URL is broken or fails to load, replace it with a
            // reliable Unsplash fallback image so the card never shows a broken image icon.
            e.target.src =
              "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400";
          }}
        />

        {/* Category Badge
            Absolutely positioned at the bottom-left of the image.
            Shows the place category (e.g. "Beach", "Mountain") as a blue pill label. */}
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {place.category}
        </div>

        {/* Heart / Save Button
            Absolutely positioned at the top-right of the image.
            This is an Optimistic UI pattern — the heart icon toggles instantly
            on click without waiting for any API response, making the UI feel fast.
            hover:scale-110 gives a slight grow effect when hovered.
            e.stopPropagation() inside handleSaveToggle prevents card navigation on click. */}
        <button
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          {saved ? (
            // Place is saved — show filled red heart
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            // Place is not saved — show outlined gray heart
            <FaRegHeart className="text-gray-400 text-sm" />
          )}
        </button>
      </div>

      {/* ── Content Section ──────────────────────────────────────
          All text-based info about the place sits below the image. */}
      <div className="p-4">
        {/* Place Name
            truncate cuts off the name with "..." if it is too long for one line,
            preventing layout overflow on cards with longer place names. */}
        <h3 className="font-bold text-gray-800 text-base mb-1 truncate">
          {place.name}
        </h3>

        {/* Rating Row
            Shows a yellow star icon, the numeric rating, and the review count in brackets. */}
        <div className="flex items-center gap-1 mb-2">
          <FaStar className="text-yellow-400 text-xs" />
          {/* Numeric rating value e.g. 4.8 */}
          <span className="text-xs font-semibold text-gray-700">
            {place.rating}
          </span>
          {/* Review count in lighter gray e.g. (312 reviews) */}
          <span className="text-xs text-gray-400">
            ({place.reviews} reviews)
          </span>
        </div>

        {/* Address Row
            shrink-0 on the icon prevents it from shrinking if the address text is long.
            mt-0.5 aligns the icon slightly lower so it lines up with the first line of text.
            truncate on the paragraph clips long addresses to one line. */}
        <div className="flex items-start gap-1 mb-3">
          <MdLocationOn className="text-blue-600 text-sm shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 truncate">{place.address}</p>
        </div>

        {/* Bottom Row — Price and View Details Button
            justify-between pushes the price to the left and the button to the right. */}
        <div className="flex items-center justify-between mt-2">
          {/* Price Block
              Displays the price value (e.g. "$120") in bold and the unit
              (e.g. "/night") in smaller gray text next to it. */}
          <div>
            <span className="text-base font-bold text-gray-800">
              {place.price}
            </span>
            <span className="text-xs text-gray-400 ml-1">
              {place.priceUnit}
            </span>
          </div>

          {/* View Details Button
              e.stopPropagation() is needed here too — this button is inside the
              card's clickable motion.div. Without stopping propagation, the click
              would fire twice: once from the button and once from the card wrapper,
              both navigating to the same page (harmless but redundant and bad practice). */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/place/${place.id}`);
            }}
            className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
// Exporting so this component can be imported wherever a place card needs to be rendered,
// such as in the Home page grid, search results, or saved places list.
