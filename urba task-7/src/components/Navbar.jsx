import React from "react"; 
import "./Navbar.css";
import { Link } from "react-router-dom";

// Navbar component
let Navbar = function Header() {
    return (
        <>
        <div className="navbar-container">

            {/* App title */}
            <h1>Book Library App</h1>

            {/* Navigation links */}
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/Books">Books</Link>
                <Link to="/Contact">Contact</Link>
            </div>

        </div>
        </>
    )
};

export default Navbar;