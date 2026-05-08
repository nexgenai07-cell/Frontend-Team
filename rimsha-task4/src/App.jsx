// Importing all components
import Navbar from "./components/Navbar";
import PlaceCard from "./components/PlaceCard";
import Footer from "./components/Footer";

function App() {
  return (
    // Main container of website
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        {/* Dark overlay */}
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center text-white px-5">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold">Explore The World</h1>

          {/* Short Description */}
          <p className="mt-5 text-lg md:text-2xl max-w-3xl">
            Discover amazing places, beautiful cultures, and unforgettable
            adventures around the globe.
          </p>

          {/* Button */}
          <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Start Journey
          </button>
        </div>
      </div>

      {/* Popular Places Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Popular Destinations
          </h2>

          <p className="text-gray-500 mt-3">
            Choose your next dream destination
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Paris Card */}
          <PlaceCard
            image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
            name="Paris"
            country="France"
          />

          {/* Tokyo Card */}
          <PlaceCard
            image="https://plus.unsplash.com/premium_photo-1776669133434-e24d9a169bcd?w=600&auto=format&fit=crop&q=60"
            name="Tokyo"
            country="Japan"
          />

          {/* Dubai Card */}
          <PlaceCard
            image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
            name="Dubai"
            country="UAE"
          />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
