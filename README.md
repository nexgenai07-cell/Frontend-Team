# 📦 Dependencies for task4

Install all dependencies using:

```bash
npm install
```

### Main Dependencies

```bash
npm install react react-dom
npm install tailwindcss @tailwindcss/vite
```

---

# ⚡ Tailwind CSS Setup

## 1. Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## 2. Configure Vite

Open `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 3. Add Tailwind CSS

Open `src/index.css`

```css
@import "tailwindcss";
```

---

# ▶ Run Project

```bash
npm run dev
```
