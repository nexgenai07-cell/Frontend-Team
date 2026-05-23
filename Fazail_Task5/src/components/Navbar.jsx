

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white border-b border-slate-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              School Dashboard
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base font-medium">
          <li className="hover:bg-cyan-500 hover:text-black px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
            Home
          </li>

          <li className="hover:bg-cyan-500 hover:text-black px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
            Students
          </li>

          <li className="hover:bg-cyan-500 hover:text-black px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
            Attendance
          </li>

          <li className="hover:bg-cyan-500 hover:text-black px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
            Announcements
          </li>

          <li className="hover:bg-cyan-500 hover:text-black px-4 py-2 rounded-lg transition duration-300 cursor-pointer">
            Contact
          </li>
        </ul>

        <div>
          <button className=" px-3 py-2 rounded-md hover:bg-cyan-500 transition duration-300">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;