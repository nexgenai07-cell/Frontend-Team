// Import state
import { useState } from "react";

// Card component
function EventCard({ event }) {
  // Register state
  const [registered, setRegistered] = useState(false);

  // Counter state
  const [count, setCount] = useState(0);

  // Toggle details
  const [show, setShow] = useState(false);

  // Register function
  const handleRegister = () => {
    if (registered) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }

    setRegistered(!registered);
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-500">
      <h2 className="text-xl font-bold text-emerald-400">{event.title}</h2>

      <p className="text-orange-400 mt-2">Event ID: {event.id}</p>

      {show && <p className="mt-4 text-gray-300">{event.body}</p>}

      <div className="flex gap-3 mt-5">
        <button
          onClick={handleRegister}
          className="bg-emerald-500 px-4 py-2 rounded-lg text-black font-semibold"
        >
          {registered ? "Cancel" : "Register"}
        </button>

        <button
          onClick={() => setShow(!show)}
          className="bg-orange-500 px-4 py-2 rounded-lg text-black font-semibold"
        >
          {show ? "Hide" : "Details"}
        </button>
      </div>

      <p className="mt-4 text-gray-300">Registrations: {count}</p>
    </div>
  );
}

export default EventCard;
