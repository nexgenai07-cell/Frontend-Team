import { Link } from "react-router-dom";

// React Icons
import {
  FaHome,
  FaUsers,
  FaInfoCircle,
  FaGraduationCap,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white border-gray-800 mx-3 mt-5 px-8 py-5 rounded-xl shadow-md flex justify-between items-center">
      {/* Left Side Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-700">
        <FaGraduationCap />
        <span>EduTrack</span>
      </div>

      {/* Middle Menu */}
      <div className="flex gap-10 text-gray-700 font-medium">
        <Link className="flex items-center gap-1 hover:text-blue-700" to="/">
          <FaHome /> Home
        </Link>

        <Link
          className="flex items-center gap-1 hover:text-blue-700"
          to="/students"
        >
          <FaUsers /> Students
        </Link>

        <Link
          className="flex items-center gap-1 hover:text-blue-700"
          to="/about"
        >
          <FaInfoCircle /> About
        </Link>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5 text-2xl text-gray-700">
        <FaSearch className="cursor-pointer hover:text-blue-700" />
        <FaUserCircle className="cursor-pointer hover:text-blue-700" />
      </div>
    </nav>
  );
}

export default Navbar;
