// Import routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";

// Main app
function App() {
  return (
    <BrowserRouter>
      {/* App wrapper */}
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/events" element={<Events />} />

            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
