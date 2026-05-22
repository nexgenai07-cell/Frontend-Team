import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (
        <div className="home">

            {/* HERO SECTION (main intro area) */}
            <div className="hero">

                {/* app title */}
                <h1>📚 Digital Library</h1>

                {/* short description */}
                <p>
                    Explore, search, and manage your favorite books in one place
                </p>

                {/* navigation to books page */}
                <Link to="/books">
                    <button>
                        Explore Books 🚀
                    </button>
                </Link>

            </div>

            {/* FEATURES SECTION (app highlights) */}
            <div className="features">

                {/* feature 1 */}
                <div className="card">
                    <h3>🔍 Smart Search</h3>
                    <p>Find books instantly using live search</p>
                </div>

                {/* feature 2 */}
                <div className="card">
                    <h3>❤️ Favorites</h3>
                    <p>Save your favorite books in one click</p>
                </div>

                {/* feature 3 */}
                <div className="card">
                    <h3>📖 Easy Browse</h3>
                    <p>Clean and simple book listing experience</p>
                </div>

            </div>

        </div>
    );
}

export default Home;