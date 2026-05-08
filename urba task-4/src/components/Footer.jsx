import "./footer.css"; // footer styles

function Footer() {
    return (
        <footer className="footer"> {/* main footer container */}
            <div className="footer-content"> {/* wrapper for footer content */}
                <h3>Movie Card App</h3> {/* app name */}
                <p>Discover your favorite movies with ratings and posters.</p> {/* short description */}
                <div className="links"> {/* navigation links section */}
                    <a href="#">Home</a>
                    <a href="#">Movies</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
                <p className="copy"> {/* copyright text */}
                    © 2026 Movie Card App. Built with React ⚛️
                </p>
            </div>
        </footer>
    )
}

export default Footer; // exporting component for reuse