import { useEffect, useState } from "react";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchWorkout, setSearchWorkout] = useState("");
 const [detailId, setDetailId] = useState(null);

const Completed = (id) => {
  setWorkouts(
    workouts.map((workout) =>
      workout.id === id
        ? { ...workout, completed: !workout.completed }
        : workout
    )
  );
};

const completedCount = workouts.filter(
  (workout) => workout.completed
).length;
  

const showDetails = (id) => {
  if (detailId === id) {
    setDetailId(null); // hide details
  } else {
    setDetailId(id); // show details
  }
};

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch workouts");
        setLoading(false);
      });
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchWorkout.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-center text-xl sm:text-2xl text-lime-400">
          Loading workouts...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h1 className="text-center text-xl sm:text-2xl text-red-500">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center text-white">
        Workout <span className="text-lime-400">Library</span>
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchWorkout}
          onChange={(e) => setSearchWorkout(e.target.value)}
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
      <h2 className="text-xl font-semibold text-white p-3 rounded-b-md m-3 ">
  Completed Workouts: <span className="text-lime-400">{completedCount}</span>
</h2>

      {/* Workout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start">
        {filteredWorkouts.map((workout) => (
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
            <img
              src={workout.thumbnailUrl}
              alt={workout.title}
              className="w-full h-48 sm:h-56 object-cover text-white"
            />

            <div className="p-5 flex flex-col">
              <h2 className="text-xl text-white font-semibold line-clamp-2 min-h-15">
                {workout.title}
              </h2>

              <p className="text-gray-400 mt-2">
                Workout #{workout.id}
              </p>
                <button
  onClick={() => Completed(workout.id)}
  className={`
    mt-4 px-4 py-2 rounded-lg font-semibold
    ${
      workout.completed
        ? "bg-green-600 text-white"
        : "bg-lime-500 text-black"
    }
  `}
>
  {workout.completed ? "Completed" : "Mark Complete"}
</button>
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
                {detailId === workout.id ? "Hide Details" : "View Details"}
              </button>
             {detailId === workout.id && (
  <div className="mt-4 p-3 bg-zinc-800 rounded-lg text-gray-300">
    <p>Workout details go here...</p>
  </div>
)}
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No workouts found.
        </p>
      )}
    </div>
  );
}

export default Workouts;