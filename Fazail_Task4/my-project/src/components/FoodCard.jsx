

const FoodCard = ({ image, name, price }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 w-72 mt-6">
      
      {/* Food Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover"
      />

      {/* Card Content */}
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">
          {name}
        </h2>

        <p className="text-orange-500 text-xl font-semibold mt-2">
          ${price}
        </p>

        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold transition">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;