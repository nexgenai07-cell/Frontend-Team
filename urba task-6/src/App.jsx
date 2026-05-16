import { useState } from 'react'
import './App.css'

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Pages
import Students from "./pages/Students"
import Home from "./pages/Home"
import About from "./pages/About"

// React Router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  // dummy state (not used yet)
  const [count, setCount] = useState(0)
  
  return(
    <>
      {/* Router wrapper for entire app */}
      <BrowserRouter>

        {/* Navbar always visible */}
        <Navbar/>

        {/* Route definitions */}
        <Routes>

          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* About page route */}
          <Route path="/about" element={<About />} />

          {/* Students page route */}
          <Route path="/students" element={<Students/>} />

        </Routes>

        {/* Footer always visible */}
        <Footer/>

      </BrowserRouter>
    </>
  )
}

export default App