import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <div className="grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;