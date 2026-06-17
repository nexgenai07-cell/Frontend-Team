import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white mt-16">

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* Logo / About */}
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            Student App
          </h2>

          <p className="text-gray-400 leading-7">
            A modern student management system built with
            React JS, React Router, and Tailwind CSS.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer transition duration-300">
              Home
            </li>

            <li className="hover:text-cyan-400 cursor-pointer transition duration-300">
              Students
            </li>

            <li className="hover:text-cyan-400 cursor-pointer transition duration-300">
              About
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
            Connect With Us
          </h3>

          <div className="flex gap-5 text-3xl">

            <FaFacebook className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-110" />

            <FaInstagram className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-110" />

            <FaLinkedin className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-110" />

            <FaGithub className="hover:text-cyan-400 cursor-pointer transition duration-300 hover:scale-110" />

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 text-center py-4 text-gray-500 text-sm">
        © 2026 Student App | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;