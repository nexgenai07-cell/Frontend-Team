import {
  FaUserGraduate,
  FaEnvelope,
  FaCity,
  FaBuilding,
} from "react-icons/fa";

// Student Card Component
function StudentCard({ student }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-cyan-500/30 transition duration-300 border border-slate-700">

      {/* Top Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-cyan-500 p-4 rounded-full shadow-lg">
          <FaUserGraduate className="text-3xl text-white" />
        </div>
      </div>

      {/* Student Name */}
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
        {student.name}
      </h2>

      {/* Email */}
      <div className="flex items-center gap-3 mb-4 bg-slate-700 p-3 rounded-lg">
        <FaEnvelope className="text-cyan-400 text-lg" />

        <p className="text-gray-200 text-sm">
          {student.email}
        </p>
      </div>

      {/* City */}
      <div className="flex items-center gap-3 mb-4 bg-slate-700 p-3 rounded-lg">
        <FaCity className="text-cyan-400 text-lg" />

        <p className="text-gray-200 text-sm">
          {student.address.city}
        </p>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 bg-slate-700 p-3 rounded-lg">
        <FaBuilding className="text-cyan-400 text-lg" />

        <p className="text-gray-200 text-sm">
          {student.company.name}
        </p>
      </div>
    </div>
  );
}

export default StudentCard;