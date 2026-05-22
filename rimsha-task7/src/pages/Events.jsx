// Import useEffect and useState hooks from React
// useState is used to store data and loading state
// useEffect is used to run code when page loads
import { useEffect, useState } from "react";

// Import EventCard component to show each event
import EventCard from "../components/EventCard";

// Events page component
function Events() {
  // State to store all events data coming from API
  const [events, setEvents] = useState([]);

  // State to check if data is still loading or not
  // true = loading, false = data loaded
  const [loading, setLoading] = useState(true);

  // useEffect runs only one time when page loads
  useEffect(() => {
    // Fetch data from API
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      // Convert response into JSON format
      .then((response) => response.json())

      // After data is ready
      .then((data) => {
        // Save API data into events state
        setEvents(data);

        // Stop loading because data has arrived
        setLoading(false);
      });
  }, []); // empty array means run only once

  return (
    // Main container with padding
    <div className="p-10">
      {/* If loading is true, show loading message */}
      {loading ? (
        <div className="text-center mt-20">
          {/* Loading text shown to user */}
          <h1 className="text-2xl font-bold text-emerald-400">
            Loading Events...
          </h1>

          {/* Small helper text */}
          <p className="text-gray-400 mt-2">
            Please wait while we fetch latest events
          </p>
        </div>
      ) : (
        // If loading is false, show events grid
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loop through all events */}
          {events.map((event) => (
            // Send each event to EventCard component
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

// Export Events page so it can be used in App.jsx
export default Events;
