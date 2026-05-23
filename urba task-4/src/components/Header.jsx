import React from "react"; 
import "./header.css"; // styles for header

let Header = function Header() {
    return (
        <>
          <nav className="navbar">
 
      {/* Logo */}
      <a href="#" className="navbar-logo">
        <span className="logo-text">CINE<span>LIST</span></span>
      </a>
 
      {/* Nav Links */}
      <ul className="navbar-links">
        <li><a href="#" className="active">Home</a></li>
        <li><a href="#">Trending</a></li>
        <li><a href="#">Watchlist</a></li>
        <li><a href="#">Top Rated</a></li>
        <li><a href="#">Genres</a></li>
      </ul>
 
      {/* Actions */}
      <div className="navbar-actions">
        <button className="nav-icon-btn" aria-label="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="nav-icon-btn" aria-label="Notifications">
          <i className="fa-regular fa-bell"></i>
        </button>
        <div className="nav-avatar">J</div>
      </div>
 
    </nav>
        </>
    )
};

export default Header; // exporting component for reuse