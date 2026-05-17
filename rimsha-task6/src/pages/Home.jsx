import { FaGraduationCap, FaUsers, FaDatabase } from "react-icons/fa";

function Home() {
  return (
    <div className="p-10">
      {/* HERO SECTION */}
      <div className="text-center bg-linear-to-r from-blue-50 to-blue-100 p-12 rounded-2xl shadow">
        {/* Main icon (education cap) */}
        <FaGraduationCap className="text-6xl text-blue-700 mx-auto mb-4" />

        {/* Main heading */}
        <h1 className="text-4xl font-bold mb-4">
          EduTrack Student Management System
        </h1>

        {/* Description text */}
        <p className="text-gray-700 max-w-3xl mx-auto">
          EduTrack is a modern digital platform designed to simplify student
          record management. It provides a structured way to access student
          profiles, personal details, and organizational information in a clean
          and efficient interface.
        </p>
      </div>

      {/* FEATURE CARDS SECTION */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {/* Card 1 */}
        <div className="bg-white shadow p-6 rounded-xl text-center">
          {/* Icon */}
          <FaUsers className="text-3xl mx-auto text-blue-600 mb-3" />

          {/* Title */}
          <h3 className="font-bold text-lg">Smart Records</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2">
            Easily explore structured student profiles in one place.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow p-6 rounded-xl text-center">
          {/* Icon */}
          <FaDatabase className="text-3xl mx-auto text-green-600 mb-3" />

          {/* Title */}
          <h3 className="font-bold text-lg">Centralized Data</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2">
            All information is organized for quick access and clarity.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow p-6 rounded-xl text-center">
          {/* Icon */}
          <FaGraduationCap className="text-3xl mx-auto text-purple-600 mb-3" />

          {/* Title */}
          <h3 className="font-bold text-lg">Modern Experience</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2">
            Clean and responsive interface for smooth user experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
