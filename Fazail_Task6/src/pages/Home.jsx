import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaDatabase,
  FaReact,
  FaCode,
  FaClipboardList,
  FaUserCheck,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

// Home Page Component
function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            Smart{" "}
            <span className="text-cyan-400">
              Student Management
            </span>{" "}
            System
          </h1>

          <p className="text-lg text-gray-300 leading-8 mb-8">
            Manage student records, attendance, performance,
            and academic information with a modern and
            responsive React application.
          </p>

          {/* Buttons */}
          <div className="flex gap-5">

            <Link
              to="/students"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition duration-300"
            >
              Explore Students
            </Link>

            <Link
              to="/about"
              className="border border-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-xl transition duration-300"
            >
              Learn More
            </Link>

          </div>
        </div>

        {/* Right Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl">

          <div className="flex justify-center mb-6">
            <div className="bg-cyan-500 p-5 rounded-full">
              <FaUserGraduate className="text-5xl text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">
            Student Dashboard
          </h2>

          <p className="text-gray-300 text-center leading-7">
            A centralized platform to manage student profiles,
            academic records, attendance, and communication.
          </p>

        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Student Management Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {/* Feature 1 */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:scale-105 transition duration-300">
            <FaClipboardList className="text-5xl text-cyan-400 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Student Records
            </h3>

            <p className="text-gray-400">
              Store and manage complete student information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:scale-105 transition duration-300">
            <FaUserCheck className="text-5xl text-cyan-400 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Attendance
            </h3>

            <p className="text-gray-400">
              Track daily attendance and monitor student presence.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:scale-105 transition duration-300">
            <FaChartLine className="text-5xl text-cyan-400 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Performance
            </h3>

            <p className="text-gray-400">
              Analyze grades, progress, and academic performance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:scale-105 transition duration-300">
            <FaBell className="text-5xl text-cyan-400 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-3">
              Notifications
            </h3>

            <p className="text-gray-400">
              Send important updates and announcements to students.
            </p>
          </div>

        </div>
      </div>

    
    </div>
  );
}

export default Home;