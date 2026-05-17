import { FaUser, FaEnvelope, FaCity, FaBuilding } from "react-icons/fa";

/*
  Displays student information in a modern card UI
*/
function StudentCard({ student }) {
  return (
    <div className="bg-linear-to-b from-white to-blue-50 shadow-lg rounded-2xl p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      {/* Name */}
      <h2 className="text-xl font-bold flex items-center gap-2 text-blue-800 mb-4">
        <FaUser /> {student.name}
      </h2>

      {/* Email */}
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <FaEnvelope className="text-blue-600" />
        <span>{student.email}</span>
      </div>

      {/* City */}
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <FaCity className="text-green-600" />
        <span>{student.address.city}</span>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 text-gray-700">
        <FaBuilding className="text-purple-600" />
        <span>{student.company.name}</span>
      </div>
    </div>
  );
}

export default StudentCard;
