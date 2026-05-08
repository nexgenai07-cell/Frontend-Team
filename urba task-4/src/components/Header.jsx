import React from "react"; 
import "./header.css"; // styles for header

let Header = function Header() {
    return (
        <>
            <div className="header"> {/* header container */}
                <h1>Movie Card App</h1> {/* title text */}
            </div>
        </>
    )
};

export default Header; // exporting component for reuse