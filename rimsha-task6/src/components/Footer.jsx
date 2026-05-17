import { FaCode } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-5 mt-10">
      {/* Icon + text */}
      <div className="flex justify-center items-center gap-2">
        <FaCode />
        <p>EduTrack © 2026 — Student Management System</p>
      </div>
    </footer>
  );
}

export default Footer;
