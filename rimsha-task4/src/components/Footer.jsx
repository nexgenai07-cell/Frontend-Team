// Importing all required icons from react-icons
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaHome,
  FaGlobe,
  FaImages,
  FaAddressBook,
} from "react-icons/fa";

// Footer component
function Footer() {
  return (
    // Main footer container
    <footer className="bg-black text-white mt-20 rounded-t-3xl">
      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ================= ABOUT SECTION ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            TravelWorld
          </h2>

          <p className="text-gray-400">
            TravelWorld helps you explore beautiful destinations around the
            world with comfort and adventure.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-2xl text-yellow-400">
            <FaFacebook className="cursor-pointer hover:text-white transition" />
            <FaInstagram className="cursor-pointer hover:text-white transition" />
            <FaTwitter className="cursor-pointer hover:text-white transition" />
          </div>
        </div>

        {/* ================= QUICK LINKS SECTION ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer transition flex items-center gap-2">
              <FaHome /> Home
            </li>

            <li className="hover:text-white cursor-pointer transition flex items-center gap-2">
              <FaGlobe /> Destinations
            </li>

            <li className="hover:text-white cursor-pointer transition flex items-center gap-2">
              <FaImages /> Gallery
            </li>

            <li className="hover:text-white cursor-pointer transition flex items-center gap-2">
              <FaAddressBook /> Contact
            </li>
          </ul>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Contact Us
          </h2>

          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <FaMapMarkerAlt /> Pakistan
          </p>

          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <FaEnvelope /> travelworld@gmail.com
          </p>

          <p className="text-gray-400 flex items-center gap-2">
            <FaPhone /> +92 300 1234567
          </p>
        </div>
      </div>

      {/* ================= BOTTOM COPYRIGHT AREA ================= */}
      <div className="border-t border-gray-700 py-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          {/* Left side text */}
          <p className="text-center md:text-left">
            Copyright © 2026 TravelWorld. All rights reserved. Web Design by
            TravelWorld Team
          </p>

          {/* Right side links */}
          <div className="flex gap-8">
            <p className="cursor-pointer hover:text-white transition">
              Terms of Use
            </p>

            <p className="cursor-pointer hover:text-white transition">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
