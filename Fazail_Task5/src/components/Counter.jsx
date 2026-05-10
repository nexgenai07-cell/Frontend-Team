import React, { useState } from "react";

const Counter = () => {
  const [present, setPresent] = useState(0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">
        Attendance Counter
      </h2>

      <p className="text-4xl font-bold text-blue-700 mb-6">
        {present}
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPresent(present + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Increment
        </button>

        <button
          onClick={() =>
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