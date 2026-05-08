function Footer() {
  return (
    // Footer container
    <footer className="bg-black text-white mt-20">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            TravelWorld
          </h2>

          <p className="text-gray-400">
            TravelWorld helps you explore beautiful destinations around the
            world with comfort and adventure.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Quick Links
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">Home</li>

            <li className="hover:text-white cursor-pointer transition">
              Destinations
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Gallery
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Contact Us
          </h2>

          <p className="text-gray-400 mb-2">Pakistan</p>

          <p className="text-gray-400 mb-2">travelworld@gmail.com</p>

          <p className="text-gray-400">+92 300 1234567</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500">
        © 2026 TravelWorld | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
