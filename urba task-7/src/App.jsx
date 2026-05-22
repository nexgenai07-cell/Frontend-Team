import { useState } from 'react'
import './App.css'

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import BooksCard from "./components/BooksCard"

// Pages
import Home from "./pages/Home"
import Books from "./pages/Books"
import Contact from "./pages/Contact"

// React Router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

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
          <Route path="/Books" element={<Books />} />
          <Route path="/Contact" element={<Contact />} />

        </Routes>

        {/* Footer always visible */}
        <Footer/>

      </BrowserRouter>
    </>
  )
}

export default App