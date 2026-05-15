import { useState } from "react";

function Explore() {
  // useState controls show/hide of details
  // show = current state (true/false)
  // setShow = function to update state

  const [show, setShow] = useState(false);

  return (
    <div className="text-center mt-12">
      {/* Show Details Button */}
      <button
        onClick={() => setShow(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg m-2 hover:bg-blue-700 transition"
      >
        Show Details
      </button>

      {/* Hide Details Button */}
      <button
        onClick={() => setShow(false)}
        className="bg-gray-700 text-white px-5 py-2 rounded-lg m-2 hover:bg-gray-800 transition"
      >
        Hide Details
      </button>

      {/* Conditional Rendering */}
      {show && (
        <p className="mt-6 text-xl text-gray-700 font-medium">
          Explore amazing destinations around the world with comfort, adventure,
          and unforgettable experiences.
        </p>
      )}
    </div>
  );
}

export default Explore;
