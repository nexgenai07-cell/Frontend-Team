import {
  FaPlaneDeparture,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaMapMarkedAlt,
} from "react-icons/fa";

function Footer() {
  return (
    // Main Footer Container

    <footer className="bg-white mx-4 mt-12 mb-5 px-10 py-10 rounded-3xl shadow-md">
      {/* ================= Main Footer Content ================= */}
      {/* Footer divided into 3 columns using grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* ================= Left Section ================= */}
        {/* Logo + Description + Social Icons */}
        <div>
          {/* Logo Row */}
          <div className="flex items-center gap-3 mb-4">
            {/* Travel Icon */}
            <FaPlaneDeparture className="text-3xl text-blue-700" />

            {/* Website Name */}
            <h2 className="text-3xl font-bold text-gray-800">
              TravelWithPakistan
            </h2>
          </div>

          {/* Website Description */}
          <p className="text-gray-600 leading-7">
            Explore the beautiful tourist destinations of Pakistan and discover
            amazing travel experiences.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-5 mt-5 text-xl">
            {/* Instagram */}
            <FaInstagram className="cursor-pointer text-blue-700" />

            {/* LinkedIn */}
            <FaLinkedin className="cursor-pointer text-blue-700" />

            {/* Facebook */}
            <FaFacebook className="cursor-pointer text-blue-700" />
          </div>
        </div>

        {/* ================= Middle Section ================= */}
        {/* Quick Navigation Links */}
        <div className="flex flex-col gap-4 text-gray-700 font-medium">
          {/* Section Heading */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">Quick Links</h3>

          {/* Home Link */}
          <a href="#" className="flex items-center gap-2 hover:text-blue-700">
            <FaHome className="text-blue-700" />
            Home
          </a>

          {/* Places Link */}
          <a href="#" className="flex items-center gap-2 hover:text-blue-700">
            <FaMapMarkedAlt className="text-blue-700" />
            Places
          </a>

          {/* Contact Link */}
          <a href="#" className="flex items-center gap-2 hover:text-blue-700">
            <FaPhoneAlt className="text-blue-700" />
            Contact
          </a>
        </div>

        {/* ================= Right Section ================= */}
        {/* Contact Information */}
        <div>
          {/* Section Heading */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">Contact</h3>

          {/* Contact Details */}
          <div className="space-y-4 text-gray-700">
            {/* Address */}
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-700" />
              Northern Areas, Pakistan
            </p>

            {/* Phone Number */}
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-700" />
              +92 300 1234567
            </p>

            {/* Email Address */}
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-700" />
              travelwithpakistan@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* ================= Bottom Footer ================= */}
      {/* Copyright + Extra Links */}
      <div className="border-t mt-10 mx-10 pt-5 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
        {/* Copyright Text */}
        <p>
          © {new Date().getFullYear()} TravelWithPakistan. All Rights Reserved
        </p>

        {/* Extra Footer Links */}
        <div className="flex gap-6 mt-3 md:mt-0">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
