import { FaInfoCircle, FaBullseye, FaLightbulb } from "react-icons/fa";

function About() {
  return (
    <div className="p-10 text-center">
      {/* Icon */}
      <FaInfoCircle className="text-5xl mx-auto text-blue-700 mb-4" />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">About EduTrack System</h1>

      {/* Main description */}
      <p className="text-gray-700 max-w-2xl mx-auto">
        EduTrack is a modern student management system designed to store,
        organize, and display student information in a structured and efficient
        way. It provides quick access to complete student profiles including
        personal, academic, and organizational details.
      </p>

      {/* Extra section 1 */}
      <div className="mt-10 bg-blue-50 p-6 rounded-xl max-w-3xl mx-auto shadow">
        <div className="flex items-center justify-center gap-2 text-blue-700 font-bold">
          <FaBullseye />
          Our Purpose
        </div>

        <p className="text-gray-700 mt-3">
          The main goal of EduTrack is to simplify student data management and
          provide a clean interface where information can be accessed quickly
          without any complexity.
        </p>
      </div>

      {/* Extra section 2 */}
      <div className="mt-6 bg-white p-6 rounded-xl max-w-3xl mx-auto shadow border">
        <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
          <FaLightbulb />
          Vision
        </div>

        <p className="text-gray-600 mt-3">
          To build a scalable and user-friendly system that can be used in
          real-world educational environments for better student data handling
          and digital transformation.
        </p>
      </div>
    </div>
  );
}

export default About;
