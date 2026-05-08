import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-16 border-t">
      
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          {/* Logo & About */}
          <div>
            <h1 className="text-3xl font-extrabold text-orange-500">
              Foodie
            </h1>

            <p className="text-gray-600 mt-3 max-w-sm">
              Fresh and delicious meals delivered straight to your
              doorstep. Enjoy the best food experience with us 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Menu
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                About
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Contact
            </h2>

    

            <p className="text-gray-600 mt-2">
               +92 300 1234567
            </p>

            <p className="text-gray-600 mt-2">
               food@example.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-5 text-center text-gray-500">
          © 2026 Foodie. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;