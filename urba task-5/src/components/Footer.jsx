import "./footer.css"; // footer styles

function Footer() {
    return (
         <footer className="footer">
 
      <div className="footer-top">
 
        {/* Brand */}
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <span className="footer-logo-text">CINE<span>LIST</span></span>
          </a>
          <p>Your personal movie universe. Track what you've watched, discover what's next, and never miss a great film again.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
 
        {/* Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="#">Trending Now</a></li>
            <li><a href="#">Top Rated</a></li>
            <li><a href="#">Coming Soon</a></li>
            <li><a href="#">Genres</a></li>
            <li><a href="#">Award Winners</a></li>
          </ul>
        </div>
 
        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <div className="footer-contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>123 Cinema Blvd, Los Angeles, CA</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-envelope"></i>
            <span>hello@cinelist.com</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-phone"></i>
            <span>+1 800 246 8357</span>
          </div>
        </div>
 
      </div>
 
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 CineList. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
 
    </footer>
    )
}

export default Footer; // exporting component for reuse