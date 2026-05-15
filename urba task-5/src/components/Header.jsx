import React from "react"; 
import "./header.css"; // styles for header

// Header component that renders the top navigation bar
let Header = function Header() {
    return (
        <>
        <div className="navbar-container">

            {/* App title */}
            <h1>Movie Card App</h1>

            {/* Navigation links section */}
            <div className="navbar-links">

                    {/* Navigation link: Home page */}
                    <a href="#">Home</a>

                    {/* Navigation link: Movies page */}
                    <a href="#">Movies</a>

                    {/* Navigation link: About page */}
                    <a href="#">About</a>

                    {/* Navigation link: Contact page */}
                    <a href="#">Contact</a>

            </div>
        </div>
        </>
    )
};

export default Header; // exporting component for reuse