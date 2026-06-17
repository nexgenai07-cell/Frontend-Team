function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-lime-400">IRON</span>
              <span className="text-white">TRACK</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Track workouts, monitor progress, and achieve your fitness
              goals with a clean and powerful gym management experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-lime-400 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/workouts"
                  className="text-gray-400 hover:text-lime-400 transition"
                >
                  Workouts
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-lime-400 transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Email: support@irontrack.com</li>
              <li>Phone: +92 3239288221</li>
              <li>Gujranwala, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} IronTrack. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition"
            >
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;