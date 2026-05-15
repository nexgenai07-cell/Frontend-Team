import { useState } from 'react';

function FavoriteButton({ movie }) {

  // Local state to track whether this movie is marked as favorite or not
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to toggle favorite state between true and false
  function toggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  return (
    // Button to add or remove movie from favorites
    <button className="btn-favorite" onClick={toggleFavorite}>
      {isFavorite ? "Remove Favorite ❤️" : "Add to Favorite 🤍"}
    </button>
  );
}

export default FavoriteButton;