import {
  FaPlaneDeparture,
  FaHome,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    // Main Navbar Container
    // White background + rounded shape + shadow
    <nav className="bg-white mx-3 mt-5 px-8 py-5 rounded-full shadow-md flex justify-between items-center">
      {/* ================= Left Side ================= */}
      {/* Website Logo + Website Name */}
      <div className="flex items-center gap-3 text-2xl font-bold text-blue-700">
        {/* Travel Icon */}
        <FaPlaneDeparture />

        {/* Website Title */}
        <h1>TravelWithPakistan</h1>
      </div>

      {/* ================= Middle Section ================= */}
      {/* Navigation Menu Links */}
      <div className="flex gap-10 text-gray-700 font-medium text-lg">
        {/* Home Link */}
        <a
          href="#"
          className="flex items-center gap-2 hover:text-blue-700 transition"
        >
          <FaHome />
          Home
        </a>

        {/* Places Link */}
        <a
          href="#"
          className="flex items-center gap-2 hover:text-blue-700 transition"
        >
          <FaMapMarkedAlt />
          Places
        </a>

        {/* Contact Link */}
        <a
          href="#"
          className="flex items-center gap-2 hover:text-blue-700 transition"
        >
          <FaPhoneAlt />
          Contact
        </a>
      </div>

      {/* ================= Right Side ================= */}
      {/* Search + Profile Icons */}
      <div className="flex items-center gap-5 text-2xl text-gray-700">
        {/* Search Icon */}
        <FaSearch className="cursor-pointer hover:text-blue-700" />

        {/* User Profile Icon */}
        <FaUserCircle className="cursor-pointer hover:text-blue-700" />
      </div>
    </nav>
  );
}

export default Navbar;
