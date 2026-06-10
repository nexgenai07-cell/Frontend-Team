import { useState, useEffect, useRef } from "react"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState(null)

  // Search inputs
  const [departure, setDeparture]     = useState(sessionStorage.getItem("departure") || "")
  const [destination, setDestination] = useState(sessionStorage.getItem("destination") || "")
  const [date, setDate]               = useState(sessionStorage.getItem("date") || "")

  // Debounced airline search
  const [airlineSearch, setAirlineSearch]       = useState("")
  const [debouncedAirline, setDebouncedAirline] = useState("")

  // Filters
  const [selectedAirline, setSelectedAirline] = useState(sessionStorage.getItem("selectedAirline") || "")
  const [maxPrice, setMaxPrice]               = useState(sessionStorage.getItem("maxPrice") || "")
  const [sortBy, setSortBy]                   = useState(sessionStorage.getItem("sortBy") || "")

  // Flights from API
  const [allFlights, setAllFlights] = useState([])
  const [results, setResults]       = useState([])

  // Loading / error
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  // History + recently viewed
  const [history, setHistory]             = useState(JSON.parse(sessionStorage.getItem("history")) || [])
  const [recentlyViewed, setRecentlyViewed] = useState(JSON.parse(sessionStorage.getItem("viewed")) || [])

  // Suggestions
  const [depSuggestions, setDepSuggestions]   = useState([])
  const [destSuggestions, setDestSuggestions] = useState([])
  const [showDepSug, setShowDepSug]           = useState(false)
  const [showDestSug, setShowDestSug]         = useState(false)

  const cities = ["LHE", "KHI", "ISB", "DXB", "LHR", "JFK", "DEL", "MUX"]

  const debounceRef = useRef(null)
  const depRef      = useRef()
  const destRef     = useRef()

  // --------------------------
  // Session Storage Save
  // --------------------------

  useEffect(() => { sessionStorage.setItem("departure", departure) }, [departure])
  useEffect(() => { sessionStorage.setItem("destination", destination) }, [destination])
  useEffect(() => { sessionStorage.setItem("date", date) }, [date])
  useEffect(() => { sessionStorage.setItem("selectedAirline", selectedAirline) }, [selectedAirline])
  useEffect(() => { sessionStorage.setItem("maxPrice", maxPrice) }, [maxPrice])
  useEffect(() => { sessionStorage.setItem("sortBy", sortBy) }, [sortBy])
  useEffect(() => { sessionStorage.setItem("history", JSON.stringify(history)) }, [history])
  useEffect(() => { sessionStorage.setItem("viewed", JSON.stringify(recentlyViewed)) }, [recentlyViewed])

  // --------------------------
  // Debounce — airline search
  // --------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAirline(airlineSearch)
    }, 500)
    return () => clearTimeout(timer)
  }, [airlineSearch])

  // --------------------------
  // Close suggestions on outside click
  // --------------------------

  useEffect(() => {
    function handleClick(e) {
      if (depRef.current  && !depRef.current.contains(e.target))  setShowDepSug(false)
      if (destRef.current && !destRef.current.contains(e.target)) setShowDestSug(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // --------------------------
  // Filter + Sort —When any filter/sort change 
  // --------------------------

  useEffect(() => {
    let filtered = [...allFlights]

    if (selectedAirline) {
      filtered = filtered.filter(f => f.flights[0].airline === selectedAirline)
    }

    if (debouncedAirline) {
      filtered = filtered.filter(f =>
        f.flights[0].airline.toLowerCase().includes(debouncedAirline.toLowerCase())
      )
    }

    if (maxPrice) {
      filtered = filtered.filter(f => f.price <= Number(maxPrice))
    }

    if (sortBy === "price") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortBy === "time") {
      filtered = [...filtered].sort((a, b) =>
        a.flights[0].departure_airport.time.localeCompare(b.flights[0].departure_airport.time)
      )
    }

    setResults(filtered)
  }, [allFlights, selectedAirline, debouncedAirline, maxPrice, sortBy])

  // --------------------------
  // API Call
  // --------------------------

  const handleSearch = async () => {
    if (!departure || !destination || !date) {
      setError("Enter Departure and destination first")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `http://localhost:5000/flights?departure=${departure}&destination=${destination}&date=${date}`
      )
      const data = await response.json()

      if (data.error) {
        setError("API Error: " + data.error)
        setLoading(false)
        return
      }

      const combined = [
        ...(data.best_flights   || []),
        ...(data.other_flights  || [])
      ]

      setAllFlights(combined)

      // Save to history
      const entry = `${departure} → ${destination} (${date})`
      setHistory(prev => {
        const alreadyExists = prev.includes(entry)
        if (alreadyExists) return prev
        return [entry, ...prev].slice(0, 10)
      })

    } catch (err) {
      setError("Server connection failed")
    }

    setLoading(false)
  }

  // --------------------------
  // Recently Viewed
  // --------------------------

  const handleViewFlight = (flight) => {
  setSelectedFlight(flight)  

  setRecentlyViewed(prev =>
    [flight, ...prev]
      .filter((item, index, arr) =>
        arr.findIndex(f => f.flights[0].flight_number === item.flights[0].flight_number) === index
      )
      .slice(0, 5)
  )
}

  // --------------------------
  // Suggestions
  // --------------------------

  function handleDepChange(val) {
    setDeparture(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDepSuggestions(cities.filter(c => c.toLowerCase().startsWith(val.toLowerCase()) && c !== val))
      setShowDepSug(true)
    }, 250)
  }

  function handleDestChange(val) {
    setDestination(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDestSuggestions(cities.filter(c => c.toLowerCase().startsWith(val.toLowerCase()) && c !== val))
      setShowDestSug(true)
    }, 250)
  }

  // --------------------------
  // Unique airlines for filter dropdown
  // --------------------------

  const uniqueAirlines = [...new Set(allFlights.map(f => f.flights[0].airline))]

  // --------------------------
  // Render
  // --------------------------

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">✈ Flight Search Dashboard</h1>

      {/* Search Form */}
      <div className="search-container">

        <div className="input-group" ref={depRef}>
          <input
            className="search-input"
            placeholder="Departure (e.g. LHE)"
            value={departure}
            onChange={(e) => handleDepChange(e.target.value)}
            onFocus={() => setShowDepSug(true)}
          />
          {showDepSug && depSuggestions.length > 0 && (
            <div className="suggestions">
              {depSuggestions.map(city => (
                <div key={city} className="suggestion-item"
                  onClick={() => { setDeparture(city); setShowDepSug(false) }}>
                  ✈ {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="input-group" ref={destRef}>
          <input
            className="search-input"
            placeholder="Destination (e.g. KHI)"
            value={destination}
            onChange={(e) => handleDestChange(e.target.value)}
            onFocus={() => setShowDestSug(true)}
          />
          {showDestSug && destSuggestions.length > 0 && (
            <div className="suggestions">
              {destSuggestions.map(city => (
                <div key={city} className="suggestion-item"
                  onClick={() => { setDestination(city); setShowDestSug(false) }}>
                  ✈ {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          className="search-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearch}>Search</button>

      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Airline Debounced Search */}
      <div className="airline-search">
        <input
          className="airline-search-input"
          placeholder="Search Airline (debounced)"
          value={airlineSearch}
          onChange={(e) => setAirlineSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters-container">

        <select
          className="filter-select"
          value={selectedAirline}
          onChange={(e) => setSelectedAirline(e.target.value)}
        >
          <option value="">All Airlines</option>
          {uniqueAirlines.map(airline => (
            <option key={airline} value={airline}>{airline}</option>
          ))}
        </select>

        <input
          className="price-filter"
          type="number"
          placeholder="Max Price ($)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="time">Time</option>
        </select>

      </div>

      {/* Results */}
      <div className="flights-container">

        {loading && <p className="loading">Loading...</p>}

        {!loading && allFlights.length === 0 && (
          <p className="no-results">Search to see flights here</p>
        )}

        {!loading && allFlights.length > 0 && results.length === 0 && (
          <p className="no-results">No flight matched— Change the filters</p>
        )}

        {results.map((item, index) => (
          <div key={index} className="flight-card">

            <div className="card-top">
              <img src={item.airline_logo} alt="logo" className="airline-logo" />
              <h3 className="airline-name">{item.flights[0].airline}</h3>
              <span className="flight-number">{item.flights[0].flight_number}</span>
            </div>

            <div className="card-middle">
              <div className="time-info">
                <p className="time">{item.flights[0].departure_airport.time.slice(11)}</p>
                <p className="airport">{item.flights[0].departure_airport.id}</p>
              </div>

              <div className="duration-info">
                <p className="duration">{item.flights[0].duration} mins</p>
                <p className="arrow">──✈──</p>
              </div>

              <div className="time-info">
                <p className="time">{item.flights[0].arrival_airport.time.slice(11)}</p>
                <p className="airport">{item.flights[0].arrival_airport.id}</p>
              </div>
            </div>

            <div className="card-bottom">
              <p className="price">${item.price}</p>
              <button className="view-btn" onClick={() => handleViewFlight(item)}>
                View Flight
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Recently Viewed */}
      <div className="viewed-container">
        <h2 className="viewed-title">Recently Viewed</h2>
        {recentlyViewed.length === 0 ? (
          <p>No flight viewed yet</p>
        ) : (
          recentlyViewed.map((item, index) => (
            <div key={index} className="viewed-card">
              <img src={item.airline_logo} alt="logo" width={30} />
              <span>{item.flights[0].airline}</span>
              <span>{item.flights[0].departure_airport.id} → {item.flights[0].arrival_airport.id}</span>
              <span>${item.price}</span>
            </div>
          ))
        )}
      </div>
    {selectedFlight && (
  <div className="modal-overlay" onClick={() => setSelectedFlight(null)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>

      <button className="modal-close" onClick={() => setSelectedFlight(null)}>✕</button>

      <div className="card-top">
        <img src={selectedFlight.airline_logo} alt="logo" className="airline-logo" />
        <h3 className="airline-name">{selectedFlight.flights[0].airline}</h3>
        <span className="flight-number">{selectedFlight.flights[0].flight_number}</span>
      </div>

      <div className="card-middle">
        <div className="time-info">
          <p className="time">{selectedFlight.flights[0].departure_airport.time.slice(11)}</p>
          <p className="airport">{selectedFlight.flights[0].departure_airport.id}</p>
          <p className="airport">{selectedFlight.flights[0].departure_airport.name}</p>
        </div>
        <div className="duration-info">
          <p className="duration">{selectedFlight.flights[0].duration} mins</p>
          <p className="arrow">──✈──</p>
        </div>
        <div className="time-info">
          <p className="time">{selectedFlight.flights[0].arrival_airport.time.slice(11)}</p>
          <p className="airport">{selectedFlight.flights[0].arrival_airport.id}</p>
          <p className="airport">{selectedFlight.flights[0].arrival_airport.name}</p>
        </div>
      </div>

      <p>Airplane: {selectedFlight.flights[0].airplane}</p>
      <p>Class: {selectedFlight.flights[0].travel_class}</p>
      <p className="price">${selectedFlight.price}</p>

    </div>
  </div>
)}
    </div>
  )
}

export default Dashboard