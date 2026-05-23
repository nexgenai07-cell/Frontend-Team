import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

// Navbar component for Student Portal
let Navbar = function Header() {
    return (
        <nav className="navbar">

            {/* Logo - app name as text */}
            <Link to="/" className="navbar-logo">
                <span className="logo-text">STUDENT<span>PORTAL</span></span>
            </Link>

            {/* Navigation links */}
            <ul className="navbar-links">
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
            </ul>

            {/* Action icons */}
            <div className="navbar-actions">
                {/* Search button */}
                <button className="nav-icon-btn" aria-label="Search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                {/* Notification button */}
                <button className="nav-icon-btn" aria-label="Notifications">
                    <i className="fa-regular fa-bell"></i>
                </button>
                {/* User avatar */}
                <div className="nav-avatar">S</div>
            </div>

        </nav>
    );
};

export default Navbar;