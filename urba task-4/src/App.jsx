import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';

// Global styles for the app layout
import './App.css';

// Styles specific to MovieCard component
import "./components/moviecard.css";

// Importing local images from assets folder
import batmanImg from './assets/TheBatman.webp';
import SpidermanImg from './assets/Spider-Man.png';
import Avengers from './assets/Avengers.webp';

function App() {

  return (
    <>
      {/* Header section of the page */}
      <Header />

      {/* Container holding all movie cards */}
      <div className="movie-container">

        {/* Movie Card 1 - Batman */}
        <MovieCard
          poster={batmanImg}
          name="Batman"
          rating="8.5"
        />

        {/* Movie Card 2 - Spider-Man */}
        <MovieCard
          poster={SpidermanImg}
          name="Spider-Man"
          rating="9.0"
        />

        {/* Movie Card 3 - Avengers */}
        <MovieCard
          poster={Avengers}
          name="Avengers"
          rating="8.8"
        />

      </div>

      {/* Footer section of the page */}
      <Footer />
    </>
  );
}

export default App;