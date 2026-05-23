import "./Footer.css";
import { Link } from "react-router-dom";

// Footer component for Student Portal
function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">

                {/* Brand section */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <span className="footer-logo-text">STUDENT<span>PORTAL</span></span>
                    </Link>
                    <p>Manage your academic journey. Track courses, grades, and stay updated with everything on campus.</p>

                    {/* Social icons */}
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>

                {/* Navigation links */}
                <div className="footer-col">
                    <h4>Navigate</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Students">Student</Link></li>
                        <li><Link to="/About">About</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div className="footer-col">
                    <h4>Contact</h4>
                    <div className="footer-contact-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>123 Campus Road, City, Country</span>
                    </div>
                    <div className="footer-contact-item">
                        <i className="fa-solid fa-envelope"></i>
                        <span>support@studentportal.com</span>
                    </div>
                    <div className="footer-contact-item">
                        <i className="fa-solid fa-phone"></i>
                        <span>+1 800 123 4567</span>
                    </div>
                </div>

            </div>

            {/* Bottom copyright bar */}
            <div className="footer-bottom">
                <p>© 2026 Digital Library App. Built with React ⚛️</p>
                <div className="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;