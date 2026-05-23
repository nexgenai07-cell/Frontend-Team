// Importing navigation links
import { Link } from "react-router-dom";

// Importing react icons
import { FaCalendarCheck, FaSearch, FaUserCircle } from "react-icons/fa";

// Navbar component starts here
function Navbar() {
  return (
    // Main navbar container
    <nav className="bg-white rounded-xl shadow-lg px-4 py-5 flex justify-between items-center mx-2 mt-4">
      {/* ================= LEFT SIDE LOGO ================= */}
      <h1 className="text-3xl font-bold text-emerald-500 flex items-center gap-3 cursor-pointer">
        <FaCalendarCheck />
        EventSphere
      </h1>

      {/* ================= CENTER MENU ================= */}
      <div className="flex gap-10 text-lg font-medium text-zinc-800">
        <Link to="/" className="hover:text-emerald-500 transition">
          Home
        </Link>

        <Link to="/events" className="hover:text-emerald-500 transition">
          Events
        </Link>

        <Link to="/about" className="hover:text-emerald-500 transition">
          About Us
        </Link>
      </div>

      {/* ================= RIGHT SIDE ICONS ================= */}
      <div className="flex gap-6 text-2xl text-zinc-700">
        {/* Search Icon */}
        <FaSearch className="cursor-pointer hover:text-emerald-500 transition" />

        {/* Profile Icon */}
        <FaUserCircle className="cursor-pointer hover:text-emerald-500 transition" />
      </div>
    </nav>
  );
}

// Exporting navbar
export default Navbar;
