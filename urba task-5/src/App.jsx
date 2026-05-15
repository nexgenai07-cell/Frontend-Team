import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import Counter from './components/counter';
import { useState } from 'react';

// Global styles for the entire app layout
import './App.css';

// Styles specific to MovieCard component
import "./components/moviecard.css";

// Static list of movies shown in the app
let movies = [
    {
      id: 1,
      poster:"/images/TheBatman.webp",
      name:"Batman",
      Genre:"Action",
      Rating:9.0
    },
    {
      id: 2,
      poster:"/images/Avengers.webp",
      name:"Avengers",
      Genre:"Action",
      Rating:8.5
    },
    {
      id: 3,
      poster:"/images/Spider-Man.png",
      name:"Spiderman",
      Genre:"Action",
      Rating:8.0
    },
    {
      id: 4,
      poster:"/images/harrypotter.png",
      name:"HarryPotter",
      Genre:"fantasy",
      Rating:8.1
    },
    {
      id: 5,
      poster:"/images/openheimer.png",
      name:"Openheimer",
      Genre:"historical drama",
      Rating:9.0
    }
];

function App() {

  // State to store list of watched movies
  const [watchedMovies, setWatchedMovies] = useState([]);

  // Function to add/remove movies from watched list (toggle behavior)
  function toggleWatch(movie) {

    // Check if movie already exists in watched list
    const exists = watchedMovies.find(
      m => m.id === movie.id
    );

    if (exists) {

      // Remove movie from watched list if it already exists
      setWatchedMovies(
        watchedMovies.filter(
          m => m.id !== movie.id
        )
      );

    } else {

      // Add movie to watched list if it does not exist
      setWatchedMovies([
        ...watchedMovies,
        movie
      ]);

    }
  }

  return (
    <>
      {/* Header section */}
      <Header />

      {/* Movie cards section */}
      <MovieCard 
        movies={movies} 
        onWatch={toggleWatch}  
        watchedMovies={watchedMovies}
      />

      {/* Counter showing total watched movies */}
      <Counter count={watchedMovies.length} />

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default App;