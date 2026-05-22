import React from "react";
import "./BooksCard.css";

function BooksCard({ object, updatefavorite, favorite }) {

    // check if current book is already in favorites
    const isFav = favorite.some(item => item.id === object.id);

    return (

        <div className="book-card">

            {/* book title */}
            <div className="book-top">
                <h2>{object.name}</h2>
            </div>

            {/* book details */}
            <div className="book-info">

                {/* publisher name */}
                <p>
                    <span>Publisher:</span> {object.company.name}
                </p>

                {/* city info */}
                <p>
                    <span>Library City:</span> {object.address.city}
                </p>

            </div>

            {/* favorite toggle button */}
            <button
                className="fav-btn"
                onClick={() => updatefavorite(object)}
            >
                {isFav ? "❤️ Remove" : "🤍 Favorite"}
            </button>

        </div>

    );
}

export default BooksCard;