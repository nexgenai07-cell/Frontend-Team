import { useState } from "react";

function Counter() {
  // useState is used to store likes value
  // likes = current value
  // setLikes = function to update value

  const [likes, setLikes] = useState(0);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto mt-10">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-5 text-gray-800">Likes: {likes}</h2>

      {/* Increase Button */}
      <button
        onClick={() => setLikes(likes + 1)}
        className="bg-green-500 text-white px-5 py-2 rounded-lg m-2 hover:bg-green-600 transition"
      >
        Increase
      </button>

      {/* Decrease Button */}
      <button
        onClick={() => setLikes(likes - 1)}
        className="bg-red-500 text-white px-5 py-2 rounded-lg m-2 hover:bg-red-600 transition"
      >
        Decrease
      </button>
    </div>
  );
}

export default Counter;
