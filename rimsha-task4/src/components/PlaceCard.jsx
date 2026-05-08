function PlaceCard(props) {
  return (
    // Main card container
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      {/* Image Section */}
      <img
        src={props.image}
        alt={props.name}
        className="w-full h-64 object-cover"
      />

      {/* Card Content */}
      <div className="p-5">
        {/* Country Name */}
        <p className="text-sm text-yellow-600 font-semibold uppercase">
          {props.country}
        </p>

        {/* Place Name */}
        <h2 className="text-2xl font-bold text-gray-800 mt-2">{props.name}</h2>

        {/* Description */}
        <p className="text-gray-500 mt-3">
          Discover the beauty, culture, and amazing experience waiting for you
          in {props.name}.
        </p>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-5">
          {/* Explore Button */}
          <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
            Explore More
          </button>

          {/* Rating */}
          <p className="text-yellow-500 font-semibold">Rating: 4.9</p>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
