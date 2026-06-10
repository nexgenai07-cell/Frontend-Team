# ✈️ Flight Search Dashboard

A React-based flight comparison app built to practice API integration, filtering, sorting, debounced search, and browser storage.

---

## 👩‍💻 Project Info

- **Created By:** Urba Zahid
- **Date:** 10 June 2026
- **Project Type:** React Intermediate — Flight Search & Comparison Dashboard

---

## 🚀 Features

- Search flights by departure, destination, and date
- Airline search with debouncing
- Airport search suggestions
- Filter by airline and max price
- Sort by price or departure time
- Search history (last 10 searches)
- Recently viewed flights
- Session Storage for persistent filters and results
- Live flight data via SerpAPI (Google Flights)

---

## 🧩 Tech Stack

- React JS + JavaScript (ES6+)
- React Hooks — useState, useEffect, useRef
- Session Storage
- SerpAPI (Google Flights)
- Express.js (proxy server)
- CSS

---

## 📦 Setup

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## ▶️ Run Project

Open two terminals:

**Terminal 1 — Start the server**
```bash
cd server
nodemon server.js
```

**Terminal 2 — Start the frontend**
```bash
cd client
npm run dev
```

> Server runs on `http://localhost:5000`
> Frontend runs on `http://localhost:5173`

---


## 🔄 Search Flow

```
User enters departure + destination + date
              ↓
      Search button clicked
              ↓
  React sends request to Express server
              ↓
    Express calls SerpAPI
              ↓
    Flight data returned to React
              ↓
  Results displayed — filters & sort applied
              ↓
     Search saved to history
```

---

## 📂 Session Storage Keys

| Key | Value |
|-----|-------|
| `departure` | Departure city code |
| `destination` | Destination city code |
| `date` | Travel date |
| `selectedAirline` | Active airline filter |
| `maxPrice` | Max price filter |
| `sortBy` | Current sort selection |
| `history` | Last 10 searches |
| `viewed` | Recently viewed flights |

---

## 🎯 Concepts Practiced

- SerpAPI + Google Flights integration
- Express proxy server (to handle CORS)
- Debounced search
- Filtering and sorting
- Session Storage
- Search history management
- React state management with hooks