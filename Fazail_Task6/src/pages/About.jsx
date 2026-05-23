import {
  FaUserGraduate,
  FaDatabase,
  
  FaClipboardCheck,
  FaChartBar,
} from "react-icons/fa";

// About Page Component
function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-14">

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-cyan-500 p-5 rounded-full shadow-lg">
                <FaUserGraduate className="text-4xl text-white" />
              </div>

              <h1 className="text-5xl font-extrabold text-cyan-400">
                About Student Management System
              </h1>
            </div>

            <p className="text-gray-300 text-lg leading-9">
              The Student Management System is a modern web application
              developed to simplify the management of student information,
              attendance records, academic performance, and communication.
              It provides a centralized platform where administrators and
              teachers can efficiently organize and monitor student data.
            </p>

            <p className="text-gray-400 text-lg leading-9 mt-6">
              This system improves productivity by automating student-related
              tasks and presenting information dynamically using React JS
              and API integration.
            </p>

          </div>

          {/* Right Side Card */}
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl">

            <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
              Core Features
            </h2>

            <div className="space-y-6">

              {/* Feature */}
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <FaDatabase className="text-3xl text-cyan-400" />

                <div>
                  <h3 className="text-xl font-bold">
                    Student Records
                  </h3>

                  <p className="text-gray-400">
                    Manage student information digitally.
                  </p>
                </div>
              </div>

              {/* Feature */}
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <FaClipboardCheck className="text-3xl text-cyan-400" />

                <div>
                  <h3 className="text-xl font-bold">
                    Attendance Tracking
                  </h3>

                  <p className="text-gray-400">
                    Monitor daily student attendance.
                  </p>
                </div>
              </div>

              {/* Feature */}
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <FaChartBar className="text-3xl text-cyan-400" />

                <div>
                  <h3 className="text-xl font-bold">
                    Performance Analysis
                  </h3>

                  <p className="text-gray-400">
                    Analyze academic progress and grades.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      
      </div>
    </div>
  );
}

export default About;