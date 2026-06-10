import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGlobe, FaCompass } from "react-icons/fa";
import { MdHome, MdSearch } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 max-w-lg w-full"
      >
        {/* Animated globe icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-28 h-28 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto  shadow-2xl shadow-blue-200 mt-10"
        >
          <FaGlobe className="text-white text-5xl" />
        </motion.div>

        {/* Big 404 text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-indigo-200 mb-2 leading-none select-none"
        >
          404
        </motion.h1>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl shadow-blue-100 p-8 mb-6"
        >
          {/* Compass icon */}
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaCompass className="text-orange-400 text-2xl" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            You seem lost, Explorer!
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            The page you are looking for does not exist or may have been moved
            to a different destination.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Primary — go home */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-200 hover:scale-105 transition-all"
          >
            <MdHome className="text-lg" />
            Back to Home
          </button>

          {/* Secondary — go to search */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-600 px-8 py-3.5 rounded-2xl text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            <MdSearch className="text-lg" />
            Search Destinations
          </button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 mt-6"
        >
          Lost? Try searching for a destination above ✈️
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
