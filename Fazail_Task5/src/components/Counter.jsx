import { useState } from "react";

const Counter = () => {
  // State variable to store the number of present students
  // present = current value
  // setPresent = function used to update the value
  const [present, setPresent] = useState(0);

  return (
    // Main card container
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">
        Attendance Counter
      </h2>

      {/* Display current attendance count */}
      <p className="text-4xl font-bold text-blue-700 mb-6">
        {present}
      </p>

      {/* Buttons container */}
      <div className="flex justify-center gap-4">

        {/* Increment button */}
        <button
          // Increase attendance count by 1 when clicked
          onClick={() => setPresent(present + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Increment
        </button>

        {/* Decrement button */}
        <button
          onClick={() =>
            // Decrease count only if value is greater than 0
            // Prevents negative attendance values
            present > 0 && setPresent(present - 1)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Decrement
        </button>

      </div>
    </div>
  );
};

export default Counter;