import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";

function Students() {

  // State to store fetched student data
  const [students, setStudents] = useState([]);

  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // State to store any error message
  const [error, setError] = useState("");

  // Runs once when component mounts
  useEffect(() => {

    // Fetch data from API
    fetch("https://jsonplaceholder.typicode.com/users")

      .then((response) => {

        // Check if request was successful
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        // Convert response into JSON format
        return response.json();
      })

      .then((data) => {

        // Save fetched data into students state
        setStudents(data);

        // Stop loading
        setLoading(false);
      })

      .catch(() => {

        // Show error message if request fails
        setError("Failed to fetch data");

        // Stop loading
        setLoading(false);
      });

  }, []); // Empty dependency array => runs only once

  // Loading UI
  if (loading) {
    return <h1>Loading students...</h1>;
  }

  // Error UI
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>

      {/* Page heading */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Students
      </h1>

      {/* Grid layout for student cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Loop through students array */}
        {students.map((student) => (

          // Render StudentCard for each student
          <StudentCard
            key={student.id}      // Unique key for React
            student={student}     // Pass student object as prop
          />
        ))}

      </div>
    </div>
  );
}

export default Students;