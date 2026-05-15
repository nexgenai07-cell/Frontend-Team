import "./moviecard.css"
import FavoriteButton from './favorite';

// MovieCard component renders a list of movie cards
function MovieCard({ movies, onWatch, watchedMovies }) {

  // Loop through each movie and create a card UI
  let cards = movies.map((item, index) => {

    // Check if current movie is already in watchedMovies array
    const isWatched = watchedMovies.some(
      m => m.id === item.id
    );

    return (
      <div className="cards" key={item.id}>

        {/* Movie poster image */}
        <img src={item.poster} alt={item.name} />

        <div>

          {/* Movie name */}
          <h2>{item.name}</h2>

          {/* Movie genre */}
          <p>{item.Genre}</p>

          {/* Movie rating */}
          <p>{item.Rating}</p>

          {/* Button to toggle watched state */}
          <button className="btn-watched" onClick={() => onWatch(item)}>
            {isWatched ? "Remove from Watched" : "Add to Watched"}
          </button>

          {/* Favorite toggle button for this movie */}
          <FavoriteButton movie={item} />

        </div>
      </div>
    );
  });

  return (
    // Container holding all movie cards
    <div className="card-container">
      {cards}
    </div>
  );
}

export default MovieCard;