function PlaceCard({ place }) {
  // This component shows one travel place card
  // Data is coming from props

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">
      {/* Place Image */}
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-60 object-cover"
      />

      {/* Place Info */}
      <div className="p-5">
        {/* Place Name */}
        <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>

        {/* Country Name */}
        <p className="text-blue-600 font-semibold">{place.country}</p>

        {/* Short Description */}
        <p className="mt-3 text-gray-600">{place.description}</p>
      </div>
    </div>
  );
}

export default PlaceCard;
