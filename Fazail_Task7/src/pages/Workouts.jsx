// Import React hooks
import { useEffect, useState } from "react";

// Workouts component
function Workouts() {

  // State to store workout data from API
  const [workouts, setWorkouts] = useState([]);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // State for error message
  const [error, setError] = useState("");

  // State for search input value
  const [searchWorkout, setSearchWorkout] = useState("");

  // State to track which workout details are visible
  const [detailId, setDetailId] = useState(null);

  // Function to mark workout as completed/uncompleted
  const Completed = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed } // Toggle completed status
          : workout // Keep other workouts unchanged
      )
    );
  };

  // Count total completed workouts
  const completedCount = workouts.filter(
    (workout) => workout.completed
  ).length;

  // Function to show or hide workout details
  const showDetails = (id) => {
    if (detailId === id) {
      setDetailId(null); // Hide details if already open
    } else {
      setDetailId(id); // Show selected workout details
    }
  };

  // Fetch workout data when component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => {

        // Check if request was successful
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        // Convert response to JSON
        return response.json();
      })
      .then((data) => {

        // Display data in browser console
        console.log(data);

        // Save fetched data in state
        setWorkouts(data);

        // Stop loading state
        setLoading(false);
      })
      .catch(() => {

        // Set error message if fetch fails
        setError("Failed to fetch workouts");

        // Stop loading state
        setLoading(false);
      });
  }, []); // Empty dependency array = run once on mount

  // Filter workouts according to search input
  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchWorkout.toLowerCase())
  );

  // Loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-center text-xl sm:text-2xl text-lime-400">
          Loading workouts...
        </h1>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-center text-xl sm:text-2xl text-red-500">
          {error}
        </h1>
      </div>
    );
  }

  // Main UI
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center text-white">
        Workout <span className="text-lime-400">Library</span>
      </h1>

      {/* Search bar section */}
      <div className="flex justify-center mb-8">

        {/* Search input */}
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchWorkout}
          onChange={(e) => setSearchWorkout(e.target.value)} // Update search state
          className="
            w-full
            max-w-md
            sm:max-w-lg
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
            placeholder:text-gray-500
            outline-none
            focus:border-lime-400
            transition
          "
        />
      </div>

      {/* Completed workout counter */}
      <h2 className="text-xl font-semibold text-white p-3 rounded-b-md m-3 ">
        Completed Workouts:
        <span className="text-lime-400"> {completedCount}</span>
      </h2>

      {/* Workout cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start">

        {/* Loop through filtered workouts */}
        {filteredWorkouts.map((workout) => (

          // Single workout card
          <div
            key={workout.id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              overflow-hidden
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {/* Workout image */}
            <img
              src={workout.thumbnailUrl}
              alt={workout.title}
              className="w-full h-48 sm:h-56 object-cover text-white"
            />

            {/* Card content */}
            <div className="p-5 flex flex-col">

              {/* Workout title */}
              <h2 className="text-xl text-white font-semibold line-clamp-2 min-h-15">
                {workout.title}
              </h2>

              {/* Workout ID */}
              <p className="text-gray-400 mt-2">
                Workout #{workout.id}
              </p>

              {/* Complete button */}
              <button
                onClick={() => Completed(workout.id)} // Toggle completion
                className={`
                  mt-4 px-4 py-2 rounded-lg font-semibold
                  ${
                    workout.completed
                      ? "bg-green-600 text-white"
                      : "bg-lime-500 text-black"
                  }
                `}
              >
                {workout.completed
                  ? "Completed"
                  : "Mark Complete"}
              </button>

              {/* Show/Hide details button */}
              <button
                onClick={() => showDetails(workout.id)}
                className="
                  w-full
                  mt-5
                  bg-lime-500
                  hover:bg-lime-400
                  text-black
                  font-semibold
                  py-2.5
                  rounded-lg
                  transition
                "
              >
                {detailId === workout.id
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {/* Workout details section */}
              {detailId === workout.id && (
                <div className="mt-4 p-3 bg-zinc-800 rounded-lg text-gray-300">

                  {/* Placeholder workout details */}
                  <p>Workout details go here...</p>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message when no workouts match search */}
      {filteredWorkouts.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No workouts found.
        </p>
      )}
    </div>
  );
}

// Export component
export default Workouts;