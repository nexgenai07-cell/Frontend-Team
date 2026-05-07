// ===============================
// 🎬 MOVIE DATA (STATE)
// ===============================
// This array holds all movies in our app.
// Each movie has a unique id, name, genre, and watched status.

let movies = [
  { id: Date.now(), name: "Inception", genre: "Sci-Fi", watched: false },
  { id: Date.now() + 1, name: "Titanic", genre: "Romance", watched: true }
];


// ===============================
// ➕ ADD MOVIE FROM INPUT
// ===============================
// This function reads values from input fields
// and sends them to addMovie()

function addMovieFromInput() {
  let name = document.getElementById("movieName").value;
  let genre = document.getElementById("movieGenre").value;

  // Prevent empty entries
  if (!name || !genre) return;

  // Add movie to array
  addMovie(name, genre);

  // Clear inputs after adding
  document.getElementById("movieName").value = "";
  document.getElementById("movieGenre").value = "";
}


// ===============================
// ➕ ADD MOVIE TO ARRAY
// ===============================
// Creates a new movie object and pushes it into movies array

function addMovie(name, genre) {
  movies.push({
    id: Date.now(),     // unique identifier for each movie
    name,
    genre,
    watched: false      // default state
  });

  // Re-render UI after update
  renderMovies();
}


// ===============================
// 🎨 RENDER MOVIES (DISPLAY UI)
// ===============================
// This function displays movies on the screen
// It also supports filtering (all / watched / unwatched)

function renderMovies(filter = "all") {
  let container = document.getElementById("movieList");

  // Clear previous UI before re-rendering
  container.innerHTML = "";

  // Filter logic
  let filteredMovies = movies.filter(movie => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true; // "all"
  });

  // Display each movie card
  filteredMovies.forEach(movie => {
    container.innerHTML += `
      <div class="card">
        <h3>${movie.name}</h3>
        <p>${movie.genre}</p>

        <!-- Toggle watched/unwatched -->
        <button onclick="toggleWatched(${movie.id})">
          ${movie.watched ? "Mark Unwatched" : "Mark Watched"}
        </button>

        <!-- Remove movie -->
        <button onclick="removeMovie(${movie.id})">
          Remove
        </button>
      </div>
    `;
  });
}


// ===============================
// 🗑️ REMOVE MOVIE
// ===============================
// Removes movie based on unique id

function removeMovie(id) {
  movies = movies.filter(movie => movie.id !== id);

  // Re-render after deletion
  renderMovies();
}


// ===============================
// 👀 TOGGLE WATCHED STATUS
// ===============================
// Switches watched: true ⇄ false

function toggleWatched(id) {
  let movie = movies.find(m => m.id === id);

  if (movie) {
    movie.watched = !movie.watched;
  }

  // Update UI
  renderMovies();
}


// ===============================
// 🔍 FILTER BUTTON FUNCTIONS
// ===============================
// These simply call renderMovies with different filters

function showAll() {
  renderMovies("all");
}

function showWatched() {
  renderMovies("watched");
}

function showUnwatched() {
  renderMovies("unwatched");
}