function Navbar() {
  //  navbar component

  return (
    <nav className="bg-linear-to-r from-blue-700 to-indigo-700 text-white px-8 py-5 flex justify-between items-center shadow-lg">
      {/* Website Title */}
      <h1 className="text-3xl font-bold">TravelWithPakistan</h1>

      {/* Navigation Links */}
      <div className="space-x-6 text-lg">
        <a href="#" className="hover:text-yellow-300 transition">
          Home
        </a>
        <a href="#" className="hover:text-yellow-300 transition">
          Places
        </a>
        <a href="#" className="hover:text-yellow-300 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
