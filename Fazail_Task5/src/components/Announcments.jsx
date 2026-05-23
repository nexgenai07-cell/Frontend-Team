import { useState } from "react";

const Announcement = () => {
  // State variable to control whether the announcement is visible
  // show = current state value (true/false)
  // setShow = function used to update the state
  const [show, setShow] = useState(false);

  return (
    // Main card container
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">

      {/* Section heading */}
      <h2 className="text-2xl font-bold mb-4">
        Announcements
      </h2>

      {/* Buttons container */}
      <div className="flex justify-center gap-4 mb-4">

        {/* Show button */}
        <button
          // Set show state to true when clicked
          onClick={() => setShow(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Show Announcement
        </button>

        {/* Hide button */}
        <button
          // Set show state to false when clicked
          onClick={() => setShow(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Hide Announcement
        </button>

      </div>

      {/* Conditional Rendering */}
      {/* This announcement will only appear when show === true */}
      {show && (
        <div className="p-4 rounded-lg">
          Tomorrow is the annual sports day!
        </div>
      )}

    </div>
  );
};

export default Announcement;