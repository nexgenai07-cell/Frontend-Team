import { Link } from "react-router-dom";

// Importing icons From React Icons Library
import { FaHome, FaUsers, FaInfoCircle, FaGraduationCap } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Website logo / title */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <FaGraduationCap />
        EduTrack
      </div>

      {/* Navigation links */}
      <div className="flex gap-6">
        {/* Link to Home page */}
        <Link className="flex items-center gap-1 hover:text-yellow-300" to="/">
          <FaHome /> Home
        </Link>

        {/* Link to Students page */}
        <Link
          className="flex items-center gap-1 hover:text-yellow-300"
          to="/students"
        >
          <FaUsers /> Students
        </Link>

        {/* Link to About page */}
        <Link
          className="flex items-center gap-1 hover:text-yellow-300"
          to="/about"
        >
          <FaInfoCircle /> About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
