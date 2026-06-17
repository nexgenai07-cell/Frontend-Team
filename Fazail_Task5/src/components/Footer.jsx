const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-cyan-500">
              School Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xs">
              Manage students, teachers, attendance, and academic
              performance efficiently with our dashboard system.
            </p>

          
          </div>

          {/* Quick Links */}
          <div className="md:mx-auto">
            <h3 className="text-cyan-500 font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-cyan-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/students" className="hover:text-cyan-400">
                  Students
                </a>
              </li>
              <li>
                <a href="/teachers" className="hover:text-cyan-400">
                  Teachers
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-cyan-400">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:ml-auto">
            <h3 className="text-cyan-500 font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400 text-sm">
              <p>Pakistan</p>
              <p> +92 300 1234567</p>
              <p> schooldashboard@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Fazail. All Rights Reserved.
          </p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-cyan-400">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-400">
              Privacy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;