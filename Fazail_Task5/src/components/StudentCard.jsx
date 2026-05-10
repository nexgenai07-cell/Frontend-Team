import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:scale-105 transition duration-300">
      <img
        src={student.image}
        alt={student.name}
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">
          {student.name}
        </h2>

        <p className="text-gray-600">
          Class: {student.class}
        </p>

        <p className="text-gray-600">
          Roll No: {student.roll}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;