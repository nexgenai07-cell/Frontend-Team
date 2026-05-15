function Counter({ count }) {
  // Receives "count" as a prop from parent (App.jsx)
  // "count" represents number of watched movies

  return (
    // Displays the total number of watched movies
    <h2>Watched Movies: {count}</h2>
  );
}

export default Counter;