// import react icons

import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white mx-5 border mt-12 mb-5 px-10 py-10  rounded-xl shadow-lg">
      {/* Main Footer Content */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">EduTrack</h2>

          <p className="text-gray-600 leading-7">
            Student Management System for managing students, records, courses
            and educational activities easily.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-5 text-xl">
            <FaInstagram className="cursor-pointer text-blue-700" />
            <FaLinkedin className="cursor-pointer text-blue-700" />
            <FaFacebook className="cursor-pointer text-blue-700" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-4 text-gray-700 font-medium">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Quick Links</h3>

          <a href="/" className="flex items-center gap-2 hover:text-blue-700">
            <FaHome className="text-blue-700" />
            Home
          </a>

          <a
            href="/students"
            className="flex items-center gap-2 hover:text-blue-700"
          >
            <FaUsers className="text-blue-700" />
            Students
          </a>

          <a
            href="/about"
            className="flex items-center gap-2 hover:text-blue-700"
          >
            <FaInfoCircle className="text-blue-700" />
            About
          </a>

          <a
            href="/contact"
            className="flex items-center gap-2 hover:text-blue-700"
          >
            <FaPhone className="text-blue-700" />
            Contact
          </a>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Contact</h3>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-700" />
              Sialkot, Pakistan
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-700" />
              +92 300 1234567
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-700" />
              edutrack@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t mt-10 pt-5 mx-6 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
        <p>© 2026 EduTrack. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
