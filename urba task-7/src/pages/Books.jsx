import React, { useState, useEffect } from "react";
import "./Books.css";
import BooksCard from "../components/BooksCard";

function Books() {

    // all books fetched from API
    const [Books, setBooks] = useState([]);

    // favorite books list
    const [favorite, setfavorite] = useState([]);

    // search input value
    const [search, setsearch] = useState("");

    // add/remove favorite toggle
    function updatefavorite(object) {
        setfavorite(prev =>
            prev.some(item => item.id === object.id)
                ? prev.filter(item => item.id !== object.id) // remove
                : [...prev, object] // add
        );
    }

    // loading state
    const [loading, setloading] = useState(true);

    // error state
    const [error, seterror] = useState(null);

    // fetch data from API
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => {
                setBooks(data);
                setloading(false);
            })
            .catch(err => {
                seterror(err.message);
                setloading(false);
            });
    }, []);

    // loading UI
    if (loading) return <h2>Loading...</h2>;

    // error UI
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <>
            {/* search input */}
            <input
                type="text"
                placeholder="Search book"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="search-input"
            />

            {/* books list */}
            <div className="Book-Container">
                {Books
                    .filter(item =>
                        item.name.toLowerCase().startsWith(search.toLowerCase())
                    )
                    .map(item => (
                        <BooksCard
                            key={item.id}
                            object={item}
                            updatefavorite={updatefavorite}
                            favorite={favorite}
                        />
                    ))
                }
            </div>

            {/* favorite counter */}
            <div className="counter">
                <h2>Favorite Counter = {favorite.length}</h2>
            </div>
        </>
    );
}

export default Books;