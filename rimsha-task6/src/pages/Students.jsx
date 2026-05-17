import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";

/*Here 
  - Fetches student data from API
  - Shows loading while data is being fetched
  - Shows error if request fails
*/
function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetching data from API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })

      .then((data) => {
        setStudents(data); // Save data in state
        setLoading(false); // Stop loading
      })

      .catch(() => {
        setError("Unable to load student data"); // Show error message
        setLoading(false);
      });
  }, []);

  // Loading UI
  if (loading) {
    return <h2 className="text-center mt-10">Loading student records...</h2>;
  }

  // Error UI
  if (error) {
    return <h2 className="text-center mt-10 text-red-600">{error}</h2>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {/* Rendering students dynamically */}
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default Students;
