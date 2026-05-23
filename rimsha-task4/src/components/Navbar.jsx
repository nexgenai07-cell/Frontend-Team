import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    // Navbar container
    <nav className="bg-mist-800 text-white shadow-md">
      {/* Navbar content */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Website Logo */}
        <div>
          <h1 className="text-3xl font-bold">TravelWorld</h1>
          <p className="text-sm text-gray-300">Explore The Beauty Of Nature</p>
        </div>

        {/* Navigation Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-yellow-400 cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition">
            Destinations
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition">
            Gallery
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition">
            About
          </li>

          <li className="hover:text-yellow-400 cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Profile + Button */}
        <div className="flex items-center gap-2">
          {/* Button */}
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
            Book Now
          </button>
          {/* Profile Icon */}
          <FaUserCircle className="text-4xl cursor-pointer hover:text-yellow-400 transition" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
