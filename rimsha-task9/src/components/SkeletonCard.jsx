// SkeletonCard Component
// A placeholder card that is displayed in place of a real PlaceCard
// while the actual place data is still being fetched from the API.
// It mimics the exact layout and dimensions of PlaceCard so the page
// does not jump or shift when real content replaces the skeletons.
// The animate-pulse class from Tailwind creates a gentle pulsing shimmer
// effect on each placeholder block, giving the user a visual indication
// that content is loading rather than showing a blank or broken page.
const SkeletonCard = () => {
  return (
    // Outer card wrapper — matches the same shape, border, and shadow
    // as the real PlaceCard so the layout looks identical during loading.
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image placeholder
          Fixed height of h-48 (192px) matches the real card's image height exactly.
          bg-gray-200 gives it a light gray color that looks like an unloaded image.
          animate-pulse makes the entire block fade in and out repeatedly,
          creating the shimmer/skeleton loading effect. */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      <div className="p-4">
        {/* Category badge placeholder
            w-20 approximates the width of a short category label like "Beach".
            rounded-full matches the pill shape of the real category badge. */}
        <div className="w-20 h-5 bg-gray-200 animate-pulse rounded-full mb-3" />

        {/* Title placeholder
            w-3/4 fills 75% of the card width, simulating a medium-length place name.
            Slightly taller (h-5) than the address lines to match the bold title text size. */}
        <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded mb-2" />

        {/* Address line 1 placeholder
            Full width (w-full) simulates the first line of a longer address string. */}
        <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-1" />

        {/* Address line 2 placeholder
            w-2/3 (67% width) simulates the second shorter line of the address,
            making it look like a naturally wrapping text block. */}
        <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded mb-4" />

        {/* Bottom row placeholder — mirrors the price + button row in the real card.
            justify-between pushes the price block to the left and the button to the right. */}
        <div className="flex items-center justify-between mt-4">
          {/* Price placeholder
              w-16 simulates a short price string like "$120". */}
          <div className="w-16 h-6 bg-gray-200 animate-pulse rounded" />

          {/* View Details button placeholder
              w-24 and rounded-xl match the size and shape of the real button. */}
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
// Exporting so this component can be imported wherever PlaceCard is rendered,
// typically inside a loading state conditional in the places grid.
