const StudentCard = ({ student }) => {
  return (

    // Main card container
    // White background, rounded corners, shadow,
    // and hover animation effect
    <div className="bg-white rounded-2xl shadow-md p-4 hover:scale-105 transition duration-300">

      {/* Student profile image */}
      <img
        src={student.image}      // Image URL from student object
        alt={student.name}       // Alternative text for accessibility
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />

      {/* Student information section */}
      <div className="text-center mt-4">

        {/* Student name */}
        <h2 className="text-xl font-semibold">
          {student.name}
        </h2>

        {/* Student class */}
        <p className="text-gray-600">
          Class: {student.class}
        </p>

        {/* Student roll number */}
        <p className="text-gray-600">
          Roll No: {student.roll}
        </p>

      </div>
    </div>
  );
};

export default StudentCard;