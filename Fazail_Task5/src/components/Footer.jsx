import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white text-center py-4 mt-10">
      <p>
        Created by Fazail © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;