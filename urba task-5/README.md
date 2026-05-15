# 🎬 Movie Card App

## PROJECT INFO
**Created By:** Urba Zahid  
**Date:** 15 May 2026  
**Task:** Day 5

---

## 📌 About the Project

Movie Card App is a simple React-based project that displays a list of movies in card format. Each movie shows details like poster, name, genre, and rating. The app also allows users to interact with movies using features like:

- Mark movies as watched
- Remove movies from watched list (toggle system)
- View total watched movies count
- Add movies to favorites

---
## 📦 Dependencies

- react  
- react-dom  
- vite  
---

## ⚙️ Features

### 🎥 Movie Display
- Movies are shown using reusable card components
- Each card includes:
  - Poster image
  - Movie name
  - Genre
  - Rating

### 👀 Watched System
- Click button to mark movie as watched
- Click again to remove from watched list
- Counter updates automatically

### ❤️ Favorite System
- Toggle favorite status for each movie
- Independent from watched feature

### 🔢 Counter
- Shows total number of watched movies in real time

---


## 📁 Project Structure

src/
├── components/
│ ├── Header.jsx
│ ├── MovieCard.jsx
│ ├── FavoriteButton.jsx
│ ├── Counter.jsx
│ └── Footer.jsx
│
├── App.jsx
├── App.css
└── index.js

---

## 🚀 How It Works

1. Movies are stored in an array
2. MovieCard maps through the array
3. Each movie renders a card
4. Clicking "Add to Watched" updates state
5. Counter reflects changes instantly
6. Favorite button toggles local state per card

---

## 🎯 Learning Goals

This project helps understand:

- React props
- useState hook
- Component reuse
- Conditional rendering
- Array methods (map, filter, find, some)
- Events

---

## 🏁 Conclusion

This project demonstrates how a small React app can manage dynamic UI using state and reusable components effectively.

---