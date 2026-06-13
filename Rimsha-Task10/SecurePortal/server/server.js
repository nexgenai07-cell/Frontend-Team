// server/server.js

// Express — Node.js web framework
const express = require("express");

// CORS — React frontend ko allow karne ke liye
const cors = require("cors");

// Axios — SerpAPI ko call karne ke liye
const axios = require("axios");

// Dotenv — .env file read karne ke liye
require("dotenv").config();

const app = express();

// CORS allow karo — React app 5173 pe hai
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// JSON parse karo
app.use(express.json());

// SerpAPI key .env se lo
const SERPAPI_KEY = process.env.SERPAPI_KEY;

// ==========================================
// SEARCH ENDPOINT
// ==========================================
// React app yahan call karegi
// GET /api/search?q=query

app.get("/api/search", async (req, res) => {
  // Query parameter lo
  const { q } = req.query;

  // Query empty — error do
  if (!q) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // SerpAPI ko call karo — server side se
    // Browser nahi — server call kar raha hai
    // CORS issue nahi hoga
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google",
        q: q,
        api_key: SERPAPI_KEY,
        num: 10,
      },
    });

    // Results React ko bhejo
    res.json(response.data.organic_results || []);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// ==========================================
// AUTOCOMPLETE ENDPOINT
// ==========================================
// GET /api/autocomplete?q=query

app.get("/api/autocomplete", async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.json([]);
  }

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_autocomplete",
        q: q,
        api_key: SERPAPI_KEY,
      },
    });

    // Suggestions array return karo
    const suggestions = response.data.suggestions?.map((s) => s.value) || [];
    res.json(suggestions);
  } catch (err) {
    res.json([]);
  }
});

// Server port 3001 pe chalao
// React 5173 pe hai — conflict nahi hoga
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
