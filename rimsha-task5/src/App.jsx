import Navbar from "./components/Navbar";
import PlaceCard from "./components/PlaceCard";
import Counter from "./components/Counter";
import Explore from "./components/Explore";
import Footer from "./components/Footer";

function App() {
  // Array of travel places
  // USING map() to render cards dynamically

  const places = [
    {
      name: "Paris",
      country: "France",
      description: "Beautiful city with Eiffel Tower and beautiful lights.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      name: "Dubai",
      country: "UAE",
      description: "Luxury city with skyscrapers and modern lifestyle.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
      name: "Tokyo",
      country: "Japan",
      description: "Advanced technology and rich culture combined.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    },
    {
      name: "Istanbul",
      country: "Turkey",
      description: "Beautiful historic city between two continents.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
    },
    {
      name: "Bali",
      country: "Indonesia",
      description: "Tropical island with peaceful beaches and nature.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
  ];

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Places Section */}
      <div className="grid md:grid-cols-3 gap-8 p-10">
        {places.map((place, index) => (
          <PlaceCard key={index} place={place} />
        ))}
      </div>

      {/* Counter Section */}
      <Counter />

      {/* Explore Section */}
      <Explore />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
