import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    // Main navigation bar
    // Uses flexbox and becomes responsive on small screens
    <nav className="bg-black px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

      {/* ================= Logo Section ================= */}
      <div className="text-2xl sm:text-3xl font-extrabold tracking-wide">

        {/* First part of logo */}
        <span className="text-lime-400">IRON</span>

        {/* Second part of logo */}
        <span className="text-gray-300">TRACK</span>

      </div>

      {/* ================= Navigation Links ================= */}
      <div className="bg-[#0f0f0f] p-2 rounded-xl flex flex-wrap justify-center items-center gap-2 sm:gap-4 w-full sm:w-auto">

        {/* Home Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? "bg-lime-900/40 text-lime-300" // Active page style
                : "text-gray-400 hover:text-white" // Inactive page style
            }`
          }
        >
          Home
        </NavLink>

        {/* Workouts Link */}
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

        {/* About Link */}
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

      {/* ================= Button Section ================= */}
      <div>

        {/* Sign Up Button */}
        <button className="bg-lime-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-lime-500 transition-colors duration-300">
          Sign Up
        </button>

      </div>
    </nav>
  );
};

export default Navbar;