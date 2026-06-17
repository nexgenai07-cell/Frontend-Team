import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Students from "./pages/Students";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <div className="grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;