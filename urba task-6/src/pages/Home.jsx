import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Home page component
function Home() {
  return (
    <div className="home-container">

      {/* Main heading */}
      <h1>🎓 Student Portal</h1>

      {/* Subtitle / description */}
      <p className="subtitle">
        Manage and view student records with API-powered dynamic data.
      </p>

      {/* Cards section */}
      <div className="card-container">

        {/* Students navigation card */}
        <div className="home-card">
          <h3>📊 Students</h3>
          <p>View all student records fetched from API in a table format.</p>

          {/* Link to Students page */}
          <Link to="/students" className="btn">
            Go to Students
          </Link>
        </div>

        {/* About navigation card */}
        <div className="home-card">
          <h3>ℹ️ About Project</h3>
          <p>Learn about technologies used and project structure.</p>

          {/* Link to About page */}
          <Link to="/about" className="btn">
            About Page
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;