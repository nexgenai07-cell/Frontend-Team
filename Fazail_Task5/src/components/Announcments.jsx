import  { useState } from "react";

const Announcement = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">
        Announcements
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShow(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Show Announcement
        </button>

        <button
          onClick={() => setShow(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Hide Announcement
        </button>
      </div>

      {show && (
        <div className="  p-4 rounded-lg">
         Tomorrow is the annual sports day!
        </div>
      )}
    </div>
  );
};

export default Announcement;