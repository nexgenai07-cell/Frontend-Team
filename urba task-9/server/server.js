const express = require("express")
const cors = require("cors")

const app = express()

// Allow frontend requests from another port (e.g. React on 5173)
app.use(cors())

// Flight search endpoint
app.get("/flights", async (req, res) => {
  try {
    // Read query parameters sent by frontend
    const { departure, destination, date } = req.query

    // Build SerpAPI Google Flights URL
    const url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${departure}&arrival_id=${destination}&outbound_date=${date}&type=2&api_key=c49a49515579b66776d686b47a99b7be068618033bbefc95f5f25a35227ad719`

    // Fetch flight data from SerpAPI
    const response = await fetch(url)
    const data = await response.json()

    // Send API response back to frontend
    res.json(data)

  } catch (err) {
    console.log("Error:", err.message)

    // Send error response if request fails
    res.status(500).json({ error: err.message })
  }
})

// Start backend server
const server = app.listen(5000, () =>
  console.log("Server running on port 5000")
)

// Keep connection alive for 60 seconds
server.keepAliveTimeout = 60000