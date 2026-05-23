

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold text-orange-500">
            Foodie
          </h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li className="hover:text-orange-500 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            Menu
          </li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            Popular
          </li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            About
          </li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Button */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition duration-300 shadow-lg">
          Order Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;