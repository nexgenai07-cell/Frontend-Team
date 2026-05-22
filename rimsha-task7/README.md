# 🎫 EventSphere - Event Management Platform

EventSphere is a modern and responsive Event Management Web Application built using React and Tailwind CSS.  
It allows users to explore events, view details, and register for participation in a simple and interactive interface.

---

## 🚀 Features

- Multi-page React application
- Modern and clean UI design
- Dynamic event listing from API
- Event cards with title, description, and ID
- Register / Unregister functionality
- Registration counter tracking
- Show / Hide event details feature
- Loading state while fetching data
- Reusable components (Navbar, Footer, EventCard)
- Fully responsive design for all devices
- Smooth navigation using React Router

---

## 🛠️ Tech Stack

- React JS
- React Router DOM
- Tailwind CSS
- React Icons
- JavaScript (ES6+)

---

## 📁 Project Structure

```

src/
│
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── EventCard.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Events.jsx
│ └── About.jsx
│
├── App.jsx
└── main.jsx

```

---

## 🌐 API Used

This project uses a free public API to fetch event data:

```

[https://jsonplaceholder.typicode.com/posts?\_limit=10](https://jsonplaceholder.typicode.com/posts?_limit=10)

```

Each post is treated as an event and includes:

- Event Title
- Event Description
- Event ID

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/eventsphere.git
```

### 2. Navigate to project folder

```bash
cd eventsphere
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install required packages

```bash
npm install react-router-dom react-icons
```

### 5. Run development server

```bash
npm run dev
```

---

## 📄 Pages Overview

### 🏠 Home Page

- Landing page of EventSphere
- Event platform introduction
- Feature highlights section
- Modern UI layout

### 🎫 Events Page

- Fetches event data from API
- Displays events in card layout
- Register / Unregister system
- Show / Hide event details
- Loading state during API call

### ℹ️ About Page

- Information about EventSphere platform
- Purpose and features explanation
- Simple and clean layout

---

## 🎨 UI Highlights

- Modern dark theme design
- Hover effects and smooth transitions
- Card-based event UI
- Fully mobile responsive design

---

## 📌 Project Purpose

This project is created for learning React fundamentals including:

- Component based architecture
- State management
- API integration
- Routing system
- UI design with Tailwind CSS

---
