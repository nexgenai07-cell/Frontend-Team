import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <div className="text-2xl sm:text-3xl font-extrabold tracking-wide">
        <span className="text-lime-400">IRON</span>
        <span className="text-gray-300">TRACK</span>
      </div>

      {/* Nav Links */}
      <div className="bg-[#0f0f0f] p-2 rounded-xl flex flex-wrap justify-center items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? "bg-lime-900/40 text-lime-300"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/workouts"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? "bg-lime-900/40 text-lime-300"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          Workouts
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? "bg-lime-900/40 text-lime-300"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;