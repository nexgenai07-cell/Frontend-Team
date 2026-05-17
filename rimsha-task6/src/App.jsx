import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Students from "./pages/Students";
import About from "./pages/About";

// Main App Component
function App() {
  return (
    <BrowserRouter>
      {/* Header (always visible) */}
      <Navbar />

      {/* Page Routes */}
      {/* Use Because Of React Router DOM */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Footer (always visible) */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
