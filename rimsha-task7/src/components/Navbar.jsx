// Import links
import { Link } from "react-router-dom";

// Import icon
import { FaCalendarCheck } from "react-icons/fa";

// Navbar
function Navbar() {
  return (
    <nav className="bg-zinc-950 border-b border-emerald-500 px-10 py-5 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-emerald-400 flex items-center gap-3">
        <FaCalendarCheck />
        EventSphere
      </h1>

      <div className="space-x-8 text-lg">
        <Link to="/">Home</Link>

        <Link to="/events">Events</Link>

        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
