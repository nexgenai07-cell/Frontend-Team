import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import History from "./pages/History"
import './App.css'

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">
        <span className="nav-logo">✈ Flight Dashboard</span>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/history">History</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App