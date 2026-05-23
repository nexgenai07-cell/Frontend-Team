// Importing footer icons
import {
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

// Footer component starts here
function Footer() {
  return (
    // Main footer container
    <footer className="bg-white rounded-xl shadow-lg mx-3 mt-20">
      {/* ================= TOP FOOTER CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div>
          {/* Logo */}
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-3 mb-4">
            <FaCalendarCheck />
            EventSphere
          </h2>

          {/* Description */}
          <p className="text-gray-500">
            EventSphere helps you discover and manage amazing events with
            comfort and convenience.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-5 text-xl text-emerald-500">
            <FaFacebook className="cursor-pointer hover:text-black transition" />
            <FaInstagram className="cursor-pointer hover:text-black transition" />
            <FaTwitter className="cursor-pointer hover:text-black transition" />
          </div>
        </div>

        {/* CENTER LINKS */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-zinc-800">Quick Links</h2>

          <ul className="space-y-3 text-gray-500">
            <li className="hover:text-black cursor-pointer flex items-center gap-2">
              <FaCalendarCheck />
              Home
            </li>

            <li className="hover:text-black cursor-pointer flex items-center gap-2">
              <FaCalendarCheck />
              Events
            </li>

            <li className="hover:text-black cursor-pointer flex items-center gap-2">
              <FaCalendarCheck />
              About Us
            </li>

            <li className="hover:text-black cursor-pointer flex items-center gap-2">
              <FaCalendarCheck />
              Contact
            </li>
          </ul>
        </div>

        {/* RIGHT CONTACT */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-zinc-800">Contact</h2>

          <p className="flex items-center gap-2 text-gray-500 mb-3">
            <FaMapMarkerAlt />
            Pakistan
          </p>

          <p className="flex items-center gap-2 text-gray-500 mb-3">
            <FaPhone />
            +92 300 1234567
          </p>

          <p className="flex items-center gap-2 text-gray-500">
            <FaEnvelope />
            eventsphere@gmail.com
          </p>
        </div>
      </div>

      {/* ================= BOTTOM COPYRIGHT ================= */}
      <div className="border py-5 px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          {/* Left side copyright */}
          <p>
            Copyright © 2026 EventSphere. All rights reserved. Web Design by
            EventSphere Team
          </p>

          {/* Right side links */}
          <div className="flex gap-8">
            <p className="cursor-pointer hover:text-black transition">
              Terms of Use
            </p>

            <p className="cursor-pointer hover:text-black transition">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Export footer
export default Footer;
