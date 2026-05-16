import React from "react";
import "./Home.css";

// About page component
function About() {
  return (
    <div className="page-container">

      {/* Page title */}
      <h1>About Page</h1>
       
      {/* Basic project info */}
      <p><b>Project:</b> Student Portal App</p>
      <p><b>Intern Name:</b> Urba Zahid</p>
      <p><b>Technologies:</b> React, useEffect, API, React Router</p>

      {/* Description section */}
      <b>Description:</b> 

      {/* Project explanation */}
      <p>
        This is a simple React-based Student Portal App built for learning
        core frontend concepts like routing, API integration, and state
        management.
      </p>

      <p>
        The application fetches student data from a public API and displays it
        in a structured table format with loading and error handling support.
      </p>

      <p>
        It demonstrates how React components work together using
        <b> React Router DOM</b>, <b>useEffect</b>, and dynamic rendering
        with <b>map()</b>.
      </p>

      <p>
        This project helps in understanding real-world app structure where
        different pages communicate through navigation and shared data flow.
      </p>

    </div>
  );
}

export default About;