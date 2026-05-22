import React from "react";
import "./Contact.css";

function Contact() {

    return (
        <div className="contact-page">

            {/* page header section */}
            <div className="contact-hero">
                <h1>📞 Let’s Connect</h1>
                <p>We’re here to help you explore the digital library experience</p>
            </div>

            {/* main layout wrapper */}
            <div className="contact-wrapper">

                {/* contact form section */}
                <form className="contact-form">

                    <h2>Send Message</h2>

                    {/* name input */}
                    <input
                        name="name"
                        placeholder="Your Name"
                    />

                    {/* email input */}
                    <input
                        name="email"
                        placeholder="Your Email"
                    />

                    {/* message input */}
                    <textarea
                        name="message"
                        placeholder="Your Message"
                    />

                    {/* submit button */}
                    <button type="submit">Send 🚀</button>

                </form>

                {/* contact info section */}
                <div className="contact-card">

                    <h3>📍 Contact Info</h3>

                    <p>Email: support@libraryapp.com</p>
                    <p>Phone: +92 300 1234567</p>
                    <p>Response: within 24 hours</p>

                    {/* extra tip box */}
                    <div className="mini-box">
                        💡 Tip: Try searching books before contacting us!
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Contact;