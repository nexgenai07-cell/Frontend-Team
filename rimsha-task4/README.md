# Travel Card App

A modern and responsive Travel Card App built using React JS and Tailwind CSS.  
This project was created for practicing React fundamentals including components, props, JSX, import/export, and reusable UI design.

# Features

- Responsive Navbar
- Beautiful Hero Section
- Reusable Travel Cards
- Footer Section
- Dynamic Props
- Modern UI Design
- Tailwind CSS Styling
- Responsive Layout
- Clean Component Structure

---

# Technologies Used

- React JS
- Vite
- Tailwind CSS
- JavaScript
- JSX

---

# Folder Structure

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── PlaceCard.jsx
│   └── Footer.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation & Setup

## Step 1 — Create React Project

```bash
npm create vite@latest
```

---

## Step 2 — Project Name

```bash
rimsha-task4
```

---

## Step 3 — Select Framework

```bash
React
```

---

## Step 4 — Select Variant

```bash
JavaScript
```

---

## Step 5 — Move to Project Folder

```bash
cd rimsha-task4
```

---

---

# Install Tailwind CSS

## Install Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## Configure Vite

Update `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## Add Tailwind Import

In `src/index.css`

```css
@import "tailwindcss";
```

---

# ▶ Run Project

```bash
npm run dev
```

---

# Open in Browser

```bash
http://localhost:5173
```

---

# Components

## Navbar.jsx

Contains:

- Logo
- Navigation Links
- CTA Button

---

## PlaceCard.jsx

Reusable card component using props.

### Props Used:

- image
- name
- country

---

## Footer.jsx

Contains:

- About Section
- Quick Links
- Contact Information

# Learning Outcomes

After completing this project, I learned:

- React project setup
- Creating reusable components
- JSX syntax
- Passing props
- Import & Export
- Tailwind CSS integration
- Responsive UI Design
- Component-based architecture

---

# UI Sections

The application contains:

- Modern Navbar
- Hero Banner Section
- 3 Travel Destination Cards
- Responsive Footer
- Interactive Buttons & Hover Effects

---

# Purpose

This project was built for learning and practicing React fundamentals with modern UI development using Tailwind CSS.
