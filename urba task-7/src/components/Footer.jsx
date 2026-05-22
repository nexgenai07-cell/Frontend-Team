import "./Footer.css"; // footer styles
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer"> {/* main footer container */}
            <div className="footer-content"> {/* wrapper for footer content */}
                <h3>Book Library App</h3> {/* app name */}
                <p>Discover your favorite movies with ratings and posters.</p> {/* short description */}
                <div className="links"> {/* navigation links section */}
                    <Link to="/">Home</Link>
                    <Link to="/Books">Books</Link>
                    <Link to="/Contact">Contact</Link>
                </div>
                <p className="copy"> {/* copyright text */}
                    © 2026 Movie Card App. Built with React ⚛️
                </p>
            </div>
        </footer>
    )
}

export default Footer; // exporting component for reuse