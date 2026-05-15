function Footer() {
  // Footer component shows simple info with current year

  return (
    <footer className="bg-indigo-900 text-white text-center py-6 mt-12">
      {/* Name  */}
      <p className="text-lg font-medium">TravelWithPakistan</p>

      {/* Current Year */}
      <p className="text-sm mt-2 text-gray-300">
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
