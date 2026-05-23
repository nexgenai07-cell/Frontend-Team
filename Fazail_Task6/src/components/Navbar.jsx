import { Link } from "react-router-dom";


// Navbar Component
function Navbar() {
  return (
    // Main Navbar Container
    <nav className="bg-linear-to-r from-slate-900 via-gray-900 to-black shadow-2xl text-white px-8 py-4 border-b border-gray-700">

      {/* Flex Container */}
      <div className="flex justify-between items-center">

        {/* Logo / Title */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer text-cyan-400">
            Student App
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">

          {/* Home Link */}
          <Link
            to="/"
            className="hover:text-cyan-400 transition duration-300 hover:scale-110"
          >
            Home
          </Link>

          {/* Students Link */}
          <Link
            to="/students"
            className="hover:text-cyan-400 transition duration-300 hover:scale-110"
          >
            Students
          </Link>

          {/* About Link */}
          <Link
            to="/about"
            className="hover:text-cyan-400 transition duration-300 hover:scale-110"
          >
            About
          </Link>
        </div>

       <div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Login
        </button>
       </div>

      </div>
    </nav>
  );
}

export default Navbar;